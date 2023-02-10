const FS = require('fs');
const PATH = require('path');
const got = require('got');
const _ = require('lodash');

(async () => {
    initDir()
    // 模拟数据
    // const docData = require('./assets/swagger2')
    // 请求swagger的地址， 获取其中的数据 （swagger页面 打开F12 找到类似请求）
    // const { body } = await got.get('http://192.168.168.234:8080/v2/api-docs');
    const { body } = await got.default.get('http://192.168.168.220:9090/v2/api-docs?group=1.x', {
        headers: {
            'Authorization': 'Basic dGVzdDp0ZXN0'
        }
    });
    const docData = JSON.parse(body)

    const { paths, tags = [], definitions } = docData;

    const apiPath = PATH.join(__dirname, '/dist/api');
    const paramPath = PATH.join(__dirname, '/dist/param');
    tags.forEach(tag => {
        const apiFileHead = `// ${tag.name}\nimport request from \"@/utils/request\";\n`;
        const description = tag.description || tag.name
        const fileName = description.replace(/\s|Api|Controller/g, '') + '.js';

        FS.appendFileSync(PATH.join(apiPath, fileName), apiFileHead, (err) => {
            if (err) throw err
        })

        Object.keys(paths).forEach(path => {
            Object.keys(paths[path]).forEach(method => {
                const itemInfo = paths[path][method]
                const [itemTag] = itemInfo.tags
                if (itemTag === tag.name) {
                    // api代码生成
                    const tempCode = toApiCode({
                        url: path,
                        method,
                        itemInfo
                    })
                    FS.appendFileSync(PATH.join(apiPath, fileName), tempCode, (err) => {
                        if (err) throw err
                    })
                    // 字段代码生成
                    if (method !== 'delete') {
                        const paramCode = toFieldsCode(itemInfo, definitions);
                        FS.appendFileSync(PATH.join(paramPath, fileName), paramCode, (err) => {
                            if (err) throw err
                        })
                    }
                }
            })
        })
        console.log(`${fileName}生成成功`)
    })
})();

// 文件夹初始化
function initDir() {
    FS.rmdirSync(PATH.join(__dirname, 'dist/api'), {
        recursive: true
    })
    FS.mkdirSync(PATH.join(__dirname, 'dist/api'), {
        recursive: true
    })
    FS.rmdirSync(PATH.join(__dirname, 'dist/param'), {
        recursive: true
    })
    FS.mkdirSync(PATH.join(__dirname, 'dist/param'), {
        recursive: true
    })
}


/**
 * 转换为api请求代码
 * @param {object} data 
 * @param {string} data.url 请求路径 (swagger数据 paths字段中的key)
 * @param {string} data.method 请求方法 (swagger数据 paths字段中的value中的key)
 * @param {object} data.itemInfo swagger数据 paths字段中的value中的value
 * @param {string} data.itemInfo.summary 说明文字
 * @param {string} data.itemInfo.operationId 用作方法名取值
 * @returns {string}
 */
function toApiCode(data) {
    const { url: tmpUrl, method, itemInfo } = data
    const { summary, operationId } = itemInfo
    const functionName = operationIdProcessing(operationId)

    const params = ['data']
    let paramsKey = 'data'
    // url引号类型
    let mark = "\""
    if (method.toLocaleLowerCase() === 'get') paramsKey = 'params'

    // url 中类似 {id} 匹配规则 
    const urlParamsReg = /{[^\/]+}/g
    // 如果url中有参数 则使用模板字符串
    if (urlParamsReg.test(tmpUrl)) mark = "`"
    // 匹配URL中的花括号并加上 `$` 符号， 方便使用模板字符串语法
    const url = tmpUrl.replace(urlParamsReg, (w) => {
        // 去除前后花括号
        const tw = w.replace(/[{|}]/g, '')
        params.push(tw)
        return `$${w}`
    })

    return (`
// ${summary}
export function ${functionName}(${params.join(', ')}) {
    return request({
        url: ${mark}${url}${mark},
        method: "${method}",
        ${paramsKey}: data
    })
}
`)
}

/**
 * 转换为字段代码
 * @param {object} itemInfo
 * @param {array} itemInfo.parameters
 * @param {object} itemInfo.responses
 * @returns 
 */
function toFieldsCode(itemInfo, definitions) {
    const { operationId, parameters = [], responses } = itemInfo
    let deepCode = ''
    const operationName = operationIdProcessing(operationId)

    // 请求参数
    const parametersFields = parameters.filter(param => param.in !== 'path').reduce((prev, param) => {
        prev[param.name] = param
        return prev
    }, {})
    deepCode += deepGetCode(parametersFields, operationName, definitions)

    // 返回参数
    deepCode += deepGetCode(responses[200], operationName + '_res', definitions)   // responses[200]
    
    return deepCode
}
/**
 * 递归提取参数
 * @param {object} fields 
 * @param {string} name 
 * @param {object} definitions 
 * @param {array} refs 
 * @returns 
 */
function deepGetCode(fields, name, definitions, refs = []) {
    var code = ''
    const fieldObj = Object.keys(fields).reduce((prev, key) => {
        const field = fields[key]
        console.log(field)
        const $ref = field.$ref || (field.items && field.items.$ref) || (field.schema && field.schema.$ref)
        console.log($ref)
        if($ref) {
            if (refs.findIndex(ref => ref === $ref) === -1) {
                refs.push($ref)
                const definitionName = $ref.replace(/^#\/definitions\//, '')
                const definitionItem = definitions[definitionName]
                const { properties } = definitionItem
                code += deepGetCode(properties, `${name}_${key}`, definitions, refs)
            }
        }
        prev[key] = field
        return prev
    }, {})

    code += fieldCode(name, fieldObj)
    return code
}

/**
 * 转换为字段代码
 * @param {string} operationId 字段名字
 * @param {*} paramsObj 字段内容
 * @returns 
 */
function fieldCode(operationId, paramsObj) {
    // 字段处理
    const fields = Object.keys(_.omit(paramsObj, ['schema', 'c', 'm', 'd'])).reduce((prev, key) => {
        const field = paramsObj[key]
        if (typeof field === 'string') return prev

        field.label = field.description
        if (field.enum) {
            field.type = 'select'
            field.options = field.enum.map(e => ({[e]:e}))
        }

        prev[key] = _.omit(field, ['description', 'in', 'enum', 'name', 'schema', 'items'])
        return prev
    }, {})
    // const fields = paramsObj

    if (JSON.stringify(fields) !== '{}') {
        return `export const ${operationIdProcessing(operationId)} = ${JSON.stringify(fields, null, "\t")}\n`
    }
    return ""
}

/**
 * operationId(变量名)字段处理 
 * @param {string} operationId 
 * @returns 
 */
function operationIdProcessing(operationId) {
    const keyword = operationId.replace(/Using(GET|DELETE|POST|PUT)(_?\d+)?$/, '')
    const words = ['delete']
    if (words.findIndex(word => word === keyword) !== -1) return keyword + 'Info'
    return keyword
}
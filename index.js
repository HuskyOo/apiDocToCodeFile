const FS = require('fs');
const PATH = require('path');
const got = require('got');
const _ = require('lodash');

(async () => {
    initDir()
    // 模拟数据
    const docData = require('./assets/swagger1')
    // 请求swagger的地址， 获取其中的数据 （swagger页面 打开F12 找到类似请求）
    // const { body } = await got.get('http://192.168.5.107:8080/v2/api-docs');
    // const docData = JSON.parse(body)

    const { paths, tags = [], definitions } = docData;

    const apiPath = PATH.join(__dirname, '/dist/api');
    const paramPath = PATH.join(__dirname, '/dist/param');
    tags.forEach(tag => {
        const apiFileHead = `// ${tag.name}\nimport request from \"@/utils/request\";\n`;
        const fileName = tag.description.replace(/\s|Api|Controller/g, '') + '.js';

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
    const paramsObj = parameters.reduce((prev, param) => {
        if (param.schema && param.schema.$ref) { // 递归处理字段
            const definitionName = param.schema.$ref.replace(/^#\/definitions\//, '');
            deepCode += deepGetCode(`${operationIdProcessing(operationId)}_${param.name}`, definitionName, definitions)
        } else if (param.in !== 'path') {// 忽略掉path的参数， 因为API的生成已处理过了path的参数
            prev[param.name] = param
        }
        return prev
    }, {})
    if (responses[200] && responses[200].schema && responses[200].schema.$ref) {
        const definitionName = responses[200].schema.$ref.replace(/^#\/definitions\//, '');
        deepCode += deepGetCode(`${operationIdProcessing(operationId)}_response`, definitionName, definitions)
    }
    
    return fieldCode(operationId, paramsObj) + deepCode
}

function deepGetCode(name, definitionName, definitions, refs = []) {
    const definitionItem = definitions[definitionName]
    const { properties } = definitionItem
    let appendCode = ''
    const paramsObj = Object.keys(properties).reduce((prev, key) => {
        const field = properties[key]
        if (field.items && field.items.$ref) {
            if (refs.findIndex(ref => ref === field.items.$ref) === -1) {
                refs.push(field.items.$ref)
                appendCode += deepGetCode(`${name}_${key}`, field.items.$ref.replace(/^#\/definitions\//, ''), definitions, refs)
            } else {
                prev[key] = field
            }
        } else {
            prev[key] = field
        }
        return prev
    }, {})
    const code = fieldCode(name, paramsObj) + appendCode
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
    const fields = Object.keys(paramsObj).reduce((prev, key) => {
        const field = paramsObj[key]
        field.label = field.description
        if (field.enum) {
            field.type = 'select'
            field.options = field.enum.map(e => ({[e]:e}))
        }

        prev[key] = _.omit(field, ['description', 'in', 'enum', 'name']) 
        return prev
    }, {})
    if (JSON.stringify(paramsObj) !== '{}') {
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
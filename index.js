const FS = require('fs');
const PATH = require('path');
const got = require('got');
(async () => {
    initDir()
    // 模拟数据
    const docData = require('./assets/swagger')
    // 请求swagger的地址， 获取其中的数据 （swagger页面 打开F12 找到类似请求）
    // const { body } = await got.get('http://192.168.5.107:8080/v2/api-docs');
    // const docData = JSON.parse(body)

    const { paths, tags = [] } = docData;

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
                    const tempCode = templateCode({
                        url: path,
                        method,
                        itemInfo
                    })
                    FS.appendFileSync(PATH.join(apiPath, fileName), tempCode, (err) => {
                        if (err) throw err
                    })
                    // 字段代码生成
                    const { parameters = [], responses } = itemInfo
                    if (method === 'get') {
                        const paramsObj = parameters.reduce((prev, param) => {
                            // 忽略掉path的参数， 因为API的生成已处理过了path的参数
                            if (param.in !== 'path') prev[param.name] = param
                            return prev
                        }, {})
                        const paramCode = `const ${itemInfo.operationId} = ${JSON.stringify(paramsObj, null, "\t")}\n`
                        if (JSON.stringify(paramsObj) !== "{}") {
                            FS.appendFileSync(PATH.join(paramPath, fileName), paramCode, (err) => {
                                if (err) throw err
                            })
                        }
                    }
                }
            })
        })
        console.log(`${fileName}生成成功`)
    })
})();

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
 * 把数据转换为字符串
 * @param {object} data 
 * @param {string} data.url 请求路径 (swagger数据 paths字段中的key)
 * @param {string} data.method 请求方法 (swagger数据 paths字段中的value中的key)
 * @param {object} data.itemInfo swagger数据 paths字段中的value中的value
 * @param {string} data.itemInfo.summary 说明文字
 * @param {string} data.itemInfo.operationId 用作方法名取值
 * @returns {string}
 */
function templateCode(data) {
    const { url: tmpUrl, method, itemInfo } = data
    const { summary, operationId: functionName } = itemInfo

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
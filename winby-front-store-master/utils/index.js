const { Base64 } = require('js-base64')
const { resolve } = require('path')
const { readFileSync } = require('fs-extra')

const enCode = value => {
    const v = ((((value * 998161) * 793927) * 562841) * 288413) / 472793
    return Base64.encode(`${v}`)
}

const deCode = value => {
    const v = Base64.decode(value)
    return Math.round(((((v * 472793) / 288413) / 562841) / 793927) / 998161)
}

const linkBelongsTo = (modelOne, modelTwo, target, foreign) => {
    return modelOne.belongsTo(modelTwo, {
        targetKey: target,
        foreignKey: foreign
    })
}

const linkHasMany = (modelOne, modelTwo, target, foreign) => {
    return modelOne.hasMany(modelTwo, {
        sourceKey: target,
        foreignKey: foreign
    })
}
const numberFormat = value => {
    if (value) {
        if (parseInt(value)) return new Intl.NumberFormat('de-DE').format(parseFloat(value))
        else return 0
    } else {
        if (isNaN(value)) return ''
        else return 0
    }
}
// const numberFormat = value => value ? (parseInt(value) ? new Intl.NumberFormat('de-DE').format(parseFloat(`${ value }`.replace(/\./g, ''))) : '') : (value === 0 ? 0 : '')

const indexExport = async (req, res, url) => {
    const filePath = resolve(__dirname, '../public', 'index.html')
    let fileString = await readFileSync(filePath, 'utf8')
    fileString = fileString.replace('<title>Winby</title>', '<title>Winby</title>')
    fileString = fileString.replace('<meta property="og:title" content="Winby"/>', '<meta property="og:title" content="Winby"/>')
    fileString = fileString.replace('<meta name="description" content="El Centro Comercial Virtual más Grande de Latinoamérica."/>', '<meta name="description" content="El Centro Comercial Virtual más Grande de Latinoamérica."/>')
    fileString = fileString.replace('<meta property="og:description" content="El Centro Comercial Virtual más Grande de Latinoamérica."/>', '<meta property="og:description" content="El Centro Comercial Virtual más Grande de Latinoamérica."/>')
    fileString = fileString.replace(/%M_IMAGE%/g, `${url}/logo512.png`)
    fileString = fileString.replace(/%M_URL%/g, `${url}${req.originalUrl}`)
    res.send(fileString)
}

module.exports = {
    enCode,
    deCode,
    linkBelongsTo,
    linkHasMany,
    numberFormat,
    indexExport,
    url: 'https://winby.co',
    urlBack: 'https://bk.winby.co'
}
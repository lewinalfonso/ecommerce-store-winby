const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const ImgHomeModel = sequelize.define('imghomes', {
    ih_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    ih_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    ih_url: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    ih_type: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ih_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ih_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    ih_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = ImgHomeModel
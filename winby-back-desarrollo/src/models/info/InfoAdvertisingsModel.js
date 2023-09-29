const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const InfoAdvertisingsModel = sequelize.define('infoadvertisings', {
    ia_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    ia_day: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    ia_text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ia_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ia_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    ia_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = InfoAdvertisingsModel
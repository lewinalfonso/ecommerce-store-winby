const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const InfoAdvertisingsModel = require('./InfoAdvertisingsModel')
const { enCode, validationID } = require('../../utils')

const InfoAdvertisingUrlsModel = sequelize.define('infoadvertisingurls', {
    iauId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    ia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InfoAdvertisingsModel,
            key: 'ia_id'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('ia_id', validationID(x, false)) }
    },
    iauUrl: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    iauType: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    iauPoints: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    iauState: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    iauDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    iauDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = InfoAdvertisingUrlsModel
const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const MunicipalitiesModel = require('../info/MunicipalitiesModel')
const TransportersModel = require('./TransportersModel')

const TransportRoutesModel = sequelize.define('transportersroutes', {
    trId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    tId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: TransportersModel,
            key: 'tId'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    trOriId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: MunicipalitiesModel,
            key: 'm_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    trDestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: MunicipalitiesModel,
            key: 'm_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    trType: {
        type: Sequelize.INTEGER(20),
        allowNull: false
        /**
         * tipos admitidos:
         * 1 = nacional
         * 2 = local
         */
    },
    trFee: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    trState: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    trDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    trDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = TransportRoutesModel
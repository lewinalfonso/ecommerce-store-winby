const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const ProvidersModel = require('./ProvidersModel')

const ProviderDocumentsModel = sequelize.define('providerdocuments', {
    pd_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    p_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ProvidersModel,
            key: 'p_id'
        }
    },
    pd_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    pd_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    pd_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    pd_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = ProviderDocumentsModel
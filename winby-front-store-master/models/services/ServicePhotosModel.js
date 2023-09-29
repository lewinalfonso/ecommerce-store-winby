const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const ServicesModel = require('./ServicesModel')

const ServicePhotosModel = sequelize.define('servicephotos', {
    sp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    s_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ServicesModel,
            key: 's_id'
        }
    },
    sp_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    sp_cover: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    sp_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    sp_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    sp_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = ServicePhotosModel
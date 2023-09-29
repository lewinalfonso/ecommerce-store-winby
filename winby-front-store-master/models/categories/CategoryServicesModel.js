const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const CategoryServicesModel = sequelize.define('categoryservices', {
    cs_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    cs_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cs_priority: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    cs_horPho: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cs_verPho: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cs_icon: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cs_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    cs_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    cs_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = CategoryServicesModel
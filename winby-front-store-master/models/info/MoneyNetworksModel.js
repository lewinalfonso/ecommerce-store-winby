const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const MoneyNetworksModel = sequelize.define('moneynetowrks', {
    mn_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    mn_min: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_max: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_leader: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_manager: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_director: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_dirDir: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_dirWor: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mn_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    mn_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    mn_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = MoneyNetworksModel
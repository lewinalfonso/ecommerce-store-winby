const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const MoneyNetworkDatesModel = sequelize.define('moneynetowrkdates', {
    mnd_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    mnd_datIni: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    mnd_datEnd: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    mnd_point: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnd_money: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnd_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnd_min: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnd_max: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnd_leader: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnd_manager: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnd_director: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnd_dirDir: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnd_dirWor: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnd_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    mnd_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    mnd_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = MoneyNetworkDatesModel
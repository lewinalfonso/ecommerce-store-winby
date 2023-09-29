const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const UsersModel = require('../users/UsersModel')
const MoneyNetworkDatesModel = require('./MoneyNetworkDatesModel')

const MoneyNetworkUsersModel = sequelize.define('moneynetworkusers', {
    mnu_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    mnd_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: MoneyNetworkDatesModel,
            key: 'mnd_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    u_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: UsersModel,
            key: 'u_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    mnu_dirSell: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    mnu_dirSellFran: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    mnu_dirSellFranTo: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    mnu_g25: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    mnu_point: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_totPoi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_min: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_minR: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_max: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_maxR: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_leader: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_leaderR: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_manager: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_director: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_dirDir: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_dirWor: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnu_retire: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    mnu_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    mnu_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    mnu_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = MoneyNetworkUsersModel
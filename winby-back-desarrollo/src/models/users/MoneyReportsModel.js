const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('./UsersModel')
const { enCode } = require('../../utils')
const UserBankEntitiesModel = require('./UserBankEntitiesModel')
const InvoicesModel = require('../invoice/InvoicesModel')
const sequelize = connect()

const MoneyReportsModel = sequelize.define('moneyreports', {
    mr_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        }
    },
    ube_id: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: UserBankEntitiesModel,
            key: 'ube_id'
        }
    },
    mr_money: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    mr_type: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    i_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoicesModel,
            key: 'i_id'
        }
    },
    mr_franchise: {
        type: Sequelize.TINYINT,
        defaultValue: 0
    },
    mr_isDirSellFran: {
        type: Sequelize.TINYINT,
        defaultValue: 0
    },
    mr_retire: {
        type: Sequelize.FLOAT
    },
    mr_confirm: {
        type: Sequelize.FLOAT
    },
    uIdConfirm: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: UsersModel,
            key: 'u_id'
        }
    },
    mr_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    mr_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    mr_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
},{
    timestamps: false,
})

module.exports = MoneyReportsModel
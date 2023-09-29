const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('../users/UsersModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const AdminMoneyReportsModel = sequelize.define('adminmoneyreports', {
    amr_id: {
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
    amr_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    amr_type: {
        type: Sequelize.TINYINT
    },
    amr_total: {
        type: Sequelize.FLOAT
    },
    amr_utility: {
        type: Sequelize.FLOAT
    },
    amr_gain: {
        type: Sequelize.FLOAT
    },
    amr_retire: {
        type: Sequelize.FLOAT
    },
    amr_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    amr_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    amr_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = AdminMoneyReportsModel
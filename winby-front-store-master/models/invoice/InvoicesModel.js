const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const UsersModel = require('../users/UsersModel')

const InvoicesModel = sequelize.define('invoices', {
    i_id: {
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
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    i_consecutive: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    i_vendor: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    i_datSta: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    i_datEnd: {
        type: Sequelize.DATEONLY
    },
    i_datExp: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    i_sub: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    i_delivery: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    i_total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    i_epayco: {
        type: Sequelize.STRING(50)
    },
    i_invoice: {
        type: Sequelize.STRING(50)
    },
    i_wallet: {
        type: Sequelize.TINYINT,
    },
    i_datCom: {
        type: Sequelize.DATEONLY
    },
    i_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    i_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    i_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = InvoicesModel
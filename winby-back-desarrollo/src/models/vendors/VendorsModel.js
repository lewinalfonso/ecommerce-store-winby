const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const UsersModel = require('../users/UsersModel')

const VendorsModel = sequelize.define('vendors', {
    v_id: {
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
    v_alias: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    tp_id: {
        type: Sequelize.INTEGER
    },
    v_ideNum: {
        type: Sequelize.STRING(20)
    },
    v_nit: {
        type: Sequelize.STRING(20)
    },
    v_dv: {
        type: Sequelize.STRING(10)
    },
    v_business: {
        type: Sequelize.STRING(100)
    },
    v_name: {
        type: Sequelize.STRING(50)
    },
    v_last: {
        type: Sequelize.STRING(50)
    },
    v_logo: {
        type: Sequelize.STRING(50)
    },
    v_banner: {
        type: Sequelize.STRING(50)
    },
    v_skuPrefix: {
        type: Sequelize.STRING(3),
        allowNull: false,
        unique: true
    },
    v_type: {
        type: Sequelize.SMALLINT,
        defaultValue: 1
    },
    v_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    v_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    v_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = VendorsModel
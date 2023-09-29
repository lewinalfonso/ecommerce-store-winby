const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const TypeIdentitysModel = require('../info/TypeIdentitysModel')
const VendorsModel = require('./VendorsModel')

const VendorLegalsModel = sequelize.define('vendorlegals', {
    vl_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    v_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: VendorsModel,
            key: 'v_id'
        }
    },
    ti_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: TypeIdentitysModel,
            key: 'ti_id'
        }
    },
    vl_ideNum: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    vl_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    vl_profession: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    vl_email: {
        type: Sequelize.STRING(100)
    },
    vl_phone: {
        type: Sequelize.STRING(20)
    },
    vl_landline: {
        type: Sequelize.STRING(20)
    },
    vl_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    vl_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    vl_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = VendorLegalsModel
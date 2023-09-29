const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode, validationID } = require('../../utils')
const VendorsModel = require('../vendors/VendorsModel')
const InvoicesModel = require('./InvoicesModel')
const DepartmentsModel = require('../info/DepartmentsModel')
const MunicipalitiesModel = require('../info/MunicipalitiesModel')
const CountriesModel = require('../info/CountriesModel')
const VendorsLocalsModel = require('../vendors/VendorsLocalsModel')

const InvoiceVendorsModel = sequelize.define('invoicevendors', {
    iv_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    i_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoicesModel,
            key: 'i_id'
        },
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
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    vl_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: VendorsLocalsModel,
            key: 'vl_id'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('vl_id', validationID(x, false)) }
    },
    iv_delivery: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tdc_type: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    c_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: CountriesModel,
            key: 'c_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    d_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: DepartmentsModel,
            key: 'd_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    m_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: MunicipalitiesModel,
            key: 'm_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    iv_location: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    iv_lat: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    iv_lon: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    iv_domFre: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    iv_cosKM: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    iv_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    iv_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    iv_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = InvoiceVendorsModel
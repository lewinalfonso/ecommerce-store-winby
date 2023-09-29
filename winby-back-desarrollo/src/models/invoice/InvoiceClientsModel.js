const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const InvoicesModel = require('./InvoicesModel')
const DepartmentsModel = require('../info/DepartmentsModel')
const MunicipalitiesModel = require('../info/MunicipalitiesModel')
const CountriesModel = require('../info/CountriesModel')

const InvoiceClientsModel = sequelize.define('invoiceclients', {
    ic_id: {
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
    ic_ideNum: {
        type: Sequelize.STRING(11)
    },
    ic_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    ic_last: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    ic_phone: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    ic_email: {
        type: Sequelize.STRING(50),
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
    ic_location: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    ic_lat: {
        type: Sequelize.STRING(50)
    },
    ic_lon: {
        type: Sequelize.STRING(50)
    },
    ic_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ic_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    ic_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = InvoiceClientsModel
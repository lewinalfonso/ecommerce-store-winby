const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode, validationID } = require('../../utils')
const InvoiceProductsModel = require('../invoice/InvoiceProductsModel')
const InvoiceServicesModel = require('../invoice/InvoiceServicesModel')
const UsersModel = require('../users/UsersModel')
const DepartmentsModel = require('../info/DepartmentsModel')
const CountriesModel = require('../info/CountriesModel')

const MoneyNetworkReportsModel = sequelize.define('moneynetowrkreports', {
    mnr_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    ip_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoiceProductsModel,
            key: 'ip_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    is_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoiceServicesModel,
            key: 'is_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    mnr_min: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnr_max: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnr_leader: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnr_manager: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    u_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: UsersModel,
            key: 'u_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null },
        set (x) { this.setDataValue('u_id', validationID(x, false)) }
    },
    mnr_director: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    d_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: DepartmentsModel,
            key: 'd_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null },
        set (x) { this.setDataValue('d_id', validationID(x, false)) }
    },
    mnr_dirDir: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    c_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: CountriesModel,
            key: 'c_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null },
        set (x) { this.setDataValue('c_id', validationID(x, false)) }
    },
    mnr_dirWor: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mnr_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    mnr_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    mnr_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = MoneyNetworkReportsModel
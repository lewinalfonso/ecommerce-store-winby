const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const VendorsModel = require('./VendorsModel')
const CountriesModel = require('../info/CountriesModel')
const DepartmentsModel = require('../info/DepartmentsModel')
const MunicipalitiesModel = require('../info/MunicipalitiesModel')
const TypeDeliveryCostsModel = require('../info/TypeDeliveryCostsModel')

const VendorsLocalsModel = sequelize.define('vendorlocals', {
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
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    vl_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    vl_phoMob: {
        type: Sequelize.STRING(30)
    },
    vl_landline: {
        type: Sequelize.STRING(30)
    },
    vl_email: {
        type: Sequelize.STRING(100)
    },
    vl_contact: {
        type: Sequelize.STRING(100),
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
    vl_address: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    vl_lat: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    vl_lon: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    tdc_idLoc: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: TypeDeliveryCostsModel,
            key: 'tdc_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    tdc_idNat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: TypeDeliveryCostsModel,
            key: 'tdc_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    vl_domFre: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    vl_cosKM: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    vl_domLoc: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    vl_domNat: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    timestamps: false
})

module.exports = VendorsLocalsModel
const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const CountriesModel = require('../info/CountriesModel')
const DepartmentsModel = require('../info/DepartmentsModel')
const MunicipalitiesModel = require('../info/MunicipalitiesModel')
const TypeAddressModel = require('../info/TypeAddressModel')
const VendorsModel = require('./VendorsModel')

const VendorAddressesModel = sequelize.define('vendoraddresses', {
    va_id: {
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
    c_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: CountriesModel,
            key: 'c_id'
        }
    },
    d_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: DepartmentsModel,
            key: 'd_id'
        }
    },
    m_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: MunicipalitiesModel,
            key: 'm_id'
        }
    },
    ta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: TypeAddressModel,
            key: 'ta_id'
        }
    },
    va_numDir: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    va_num: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    va_numHou: {
        type: Sequelize.STRING(50)
    },
    va_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    va_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    va_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = VendorAddressesModel
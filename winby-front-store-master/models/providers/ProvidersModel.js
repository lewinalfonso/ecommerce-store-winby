const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const GendersModel = require('../info/GendersModel')
const CountriesModel = require('../info/CountriesModel')
const DepartmentsModel = require('../info/DepartmentsModel')
const TypeIdentitysModel = require('../info/TypeIdentitysModel')
const MunicipalitiesModel = require('../info/MunicipalitiesModel')
const VendorsModel = require('../vendors/VendorsModel')

const ProvidersModel = sequelize.define('providers', {
    p_id: {
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
    p_ideNum: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    p_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    p_last: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    p_email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    p_phone: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    p_profession: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    g_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: GendersModel,
            key: 'g_id'
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
    p_photo: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    p_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    p_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    p_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = ProvidersModel
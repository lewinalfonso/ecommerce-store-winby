const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('./UsersModel')
const CountriesModel = require('../info/CountriesModel')
const DepartmentsModel = require('../info/DepartmentsModel')
const MunicipalitiesModel = require('../info/MunicipalitiesModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const UserProfilesModel = sequelize.define('userprofiles', {
    up_id: {
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
    up_ideNum: {
        type: Sequelize.STRING(100)
    },
    up_name: {
        type: Sequelize.STRING(100)
    },
    up_last: {
        type: Sequelize.STRING(100)
    },
    up_code: {
        contraint: true,
        type: Sequelize.STRING(100)
    },
    c_id: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: CountriesModel,
            key: 'c_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    d_id: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: DepartmentsModel,
            key: 'd_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    m_id: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: MunicipalitiesModel,
            key: 'm_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    up_typMod: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    u_idTyp: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: UsersModel,
            key: 'u_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    up_confirm: {
        type: Sequelize.SMALLINT
    },
    up_franchise: {
        type: Sequelize.SMALLINT
    },
    up_wstock: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 0
    },
    up_location: {
        type: Sequelize.STRING(100)
    },
    up_lat: {
        type: Sequelize.STRING(30)
    },
    up_lon: {
        type: Sequelize.STRING(30)
    },
    up_ideDoc: {
        type: Sequelize.STRING(50)
    },
    up_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    up_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    up_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
},{
    timestamps: false,
})

module.exports = UserProfilesModel
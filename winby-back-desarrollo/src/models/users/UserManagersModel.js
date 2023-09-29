const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('./UsersModel')
const TypeManagersModel = require('../info/TypeManagersModel')
const CountriesModel = require('../info/CountriesModel')
const DepartmentsModel = require('../info/DepartmentsModel')
const { enCode, validations, validationID, validationMM } = require('../../utils')
const sequelize = connect()

const UserManagersModel = sequelize.define('userManagers', {
    umId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    uId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: UsersModel,
            key: 'u_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null },
        set (x) { this.setDataValue('uId', validationID(x)) }
    },
    tmId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: TypeManagersModel,
            key: 'tmId'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null },
        set (x) { this.setDataValue('tmId', validationID(x)) }
    },
    dId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: DepartmentsModel,
            key: 'd_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null },
        set (x) { this.setDataValue('dId', validationID(x, false)) }
    },
    cId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: CountriesModel,
            key: 'c_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null },
        set (x) { this.setDataValue('cId', validationID(x, false)) }
    },
    umState: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isValidate (value) {
                validations(value, false, true, 1, 2, false, true)
                validationMM(value, 0, 99)
            }
        }
    },
    umDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    umDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
},{
    timestamps: false,
})

module.exports = UserManagersModel
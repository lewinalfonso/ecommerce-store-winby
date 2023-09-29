const Sequelize = require('sequelize')
const connect = require('../database')
const { enCode, validations, validationMM } = require('../../utils')
const sequelize = connect()

const TypeManagersModel = sequelize.define('typeManagers', {
    tmId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    tmName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            isValidate (value) {
                validations(value, true, true, 3, 50, true)
            }
        }
    },
    tmState: {
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
    tmDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    tmDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
},{
    timestamps: false,
})

module.exports = TypeManagersModel
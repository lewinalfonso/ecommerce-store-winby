const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('./UsersModel')
const { enCode, validations, validationID, validationMM } = require('../../utils')
const sequelize = connect()

const UserSponsorVendorsModel = sequelize.define('userSponsorVendors', {
    usvId: {
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
    usvCode: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            isValidate (value) {
                validations(value, true, true, 3, 100)
            }
        }
    },
    usvState: {
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
    usvDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    usvDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
},{
    timestamps: false,
})

module.exports = UserSponsorVendorsModel
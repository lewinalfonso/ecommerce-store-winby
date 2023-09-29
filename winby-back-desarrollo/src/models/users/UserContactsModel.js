const Sequelize = require('sequelize')
const connect = require('../database')
const { enCode } = require('../../utils')
const sequelize = connect()

const UserContactsModel = sequelize.define('usercontacts', {
    uc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    uc_code: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    uc_message: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    uc_phone: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    uc_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    uc_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    uc_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = UserContactsModel
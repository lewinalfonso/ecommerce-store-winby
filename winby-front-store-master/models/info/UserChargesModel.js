const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const {enCode} = require('../../utils')

const UserChargesModel = sequelize.define('usercharges', {
    uc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) {return enCode(this.getDataValue(x))}
    },
    uc_name: {
        type: Sequelize.STRING(100),
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
},{
    timestamps: false,
})

module.exports = UserChargesModel
const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const CountriesModel = sequelize.define('countries', {
    c_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    c_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    c_calCod: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    c_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    c_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    c_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
},
{
    timestamps: false
})

module.exports = CountriesModel
const Sequelize = require('sequelize')
const connect = require('../database')
const CountriesModel = require('./CountriesModel')
const sequelize = connect()
const { enCode } = require('../../utils')

const DepartmentsModel = sequelize.define('departments', {
    d_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get(x) {return enCode(this.getDataValue(x))}
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
    d_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    d_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    d_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    d_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
},{
    timestamps: false
})

module.exports = DepartmentsModel
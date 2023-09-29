const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const TypeDeliveryCostsModel = sequelize.define('typedeliverycosts', {
    tdc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    tdc_type: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    tdc_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    tdc_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    tdc_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    tdc_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = TypeDeliveryCostsModel
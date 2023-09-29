const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const TypeAttributesModel = sequelize.define('typeattributes', {
    ta_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    ta_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    ta_type: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    ta_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ta_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    ta_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = TypeAttributesModel
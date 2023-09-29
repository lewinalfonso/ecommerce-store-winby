const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const MenusModel = sequelize.define('menus', {
    m_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    m_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    m_path: {
        type: Sequelize.STRING(100)
    },
    m_priority: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    m_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    m_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    m_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = MenusModel
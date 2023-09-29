const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const MenusModel = require('./MenusModel')

const SubMenusModel = sequelize.define('submenus', {
    sm_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    m_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: MenusModel,
            key: 'm_id'
        }
    },
    sm_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    sm_path: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    sm_priority: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sm_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    sm_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    sm_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = SubMenusModel
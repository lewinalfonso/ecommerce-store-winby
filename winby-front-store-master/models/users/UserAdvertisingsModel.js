const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('./UsersModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const UserAdvertisings = sequelize.define('useradvertisings', {
    ua_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    u_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: UsersModel,
            key: 'u_id'
        }
    },
    ua_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    ua_image: {
        type: Sequelize.TINYINT
    },
    ua_video: {
        type: Sequelize.TINYINT
    },
    ua_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ua_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    ua_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
},{
    timestamps: false
})

module.exports = UserAdvertisings
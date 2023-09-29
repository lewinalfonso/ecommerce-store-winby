const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('./UsersModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const UserSponsorsModel = sequelize.define('usersponsors', {
    us_id: {
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
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    us_code: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    us_type: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    us_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    us_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    us_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
},{
    timestamps: false,
})

module.exports = UserSponsorsModel
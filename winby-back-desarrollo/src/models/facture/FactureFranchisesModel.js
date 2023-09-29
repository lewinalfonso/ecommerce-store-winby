const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('../users/UsersModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const FactureFranchisesModel = sequelize.define('facturefranchises', {
    ff_id: {
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
    ff_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ff_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    ff_epayco: {
        type: Sequelize.STRING(50)
    },
    ff_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ff_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    ff_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = FactureFranchisesModel
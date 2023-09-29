const Sequelize = require('sequelize'),
    connect = require('../database'),
    UsersModel = require('./UsersModel'),
    TypeBanksModel = require('../info/TypeBanksModel'),
    AccountTypesModel = require('../info/AccountTypesModel'),
    TypeCryptocurrenciesModel = require('../info/TypeCryptocurrenciesModel'),
    sequelize = connect(),
    { enCode } = require('../../utils')

const UserBankEntitiesModel = sequelize.define('userbankentities', {
    ube_id: {
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
    tb_id: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: TypeBanksModel,
            key: 'tb_id'
        }
    },
    at_id: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: AccountTypesModel,
            key: 'at_id'
        }
    },
    tc_id: {
        type: Sequelize.INTEGER,
        onUpdate: null,
        onDelete: null,
        references: {
            model: TypeCryptocurrenciesModel,
            key: 'tc_id'
        }
    },
    ube_alias: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    ube_accNum: {
        type: Sequelize.STRING(20),
    },
    ube_hash: {
        type: Sequelize.STRING(20),
    },
    ube_cerBank: {
        type: Sequelize.STRING(50),
    },
    ube_type: {
        type: Sequelize.TINYINT(1),
        allowNull: false
    },
    ube_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ube_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    ube_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = UserBankEntitiesModel
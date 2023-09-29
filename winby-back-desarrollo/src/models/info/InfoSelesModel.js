const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const InfoSelesModel = sequelize.define('infoseles', {
    is_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    is_por: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_porAdvFra: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_porSelFra: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_porSelFraTot: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_porPoiFra: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_porWinFra: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_porSelFraTwo: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_porSelFraThree: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_porSelFraFour: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_minNet: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_maxNet: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_leader: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_manager: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_director: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_dirDir: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_dirWor: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_winby: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_netPoi: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    is_netDir: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    is_netReqMin: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    is_netReqMax: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    is_netReqLea: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    is_netReqMem: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    is_taxGat: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    is_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    is_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = InfoSelesModel
'use strict'
const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()

const VendorsModel = require('../vendors/VendorsModel')

const { enCode, validationID } = require('../../utils')

const DebtsReceivableModel = sequelize.define('debtsReceivables', {
    dr_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    v_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: VendorsModel,
            key: 'v_id'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('v_id', validationID(x, false)) }
    },
    dr_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    dr_type: {
        type: Sequelize.SMALLINT,
        allowNull: false
        /**
         * Tipos
         *
         * 1 => Penalización por cancelar orden
         * 2 => Cobro pendiente de domicilio
         */
    },
    dr_state: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 2
        /**
         * Estados
         *
         * 2 => Pendiente de cobro
         * 1 => Cobrado
         */
    },
    dr_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    dr_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = DebtsReceivableModel
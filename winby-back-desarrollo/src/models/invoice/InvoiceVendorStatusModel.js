'use strict'

const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()

const InvoiceVendorsModel = require('./InvoiceVendorsModel')

const { enCode, validationID } = require('../../utils')

const InvoiceVendorStatusModel = sequelize.define('invoiceVendorStatuses', {
    ivs_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    iv_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoiceVendorsModel,
            key: 'iv_id'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('iv_id', validationID(x, false)) }
    },
    ivs_type: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ivs_date: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = InvoiceVendorStatusModel

/**
 * ##########
 * # Estados #
 * ##########
 *
 * 0 - Elimando
 * 1 - Entregado
 * 2 - Despachado
 * 3 - Espera de despacho
 * 4 - En preparación
 * 5 - Compra aprobada
 * 6 - En espera de pago
 * 7 - Rechazado
 */
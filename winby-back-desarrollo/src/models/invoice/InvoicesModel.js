const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const UsersModel = require('../users/UsersModel')

const InvoicesModel = sequelize.define('invoices', {
    i_id: {
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
    i_consecutive: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    i_vendor: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    i_datSta: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    i_datEnd: {
        type: Sequelize.DATEONLY
    },
    i_datExp: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    i_sub: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    i_delivery: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    i_taxGat: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    i_total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    i_paymentType: {
        type: Sequelize.ENUM(['WALLET', 'EPAYCO', 'WOMPI', 'PAYPAL', 'NONE']),
        allowNull: false,
        defaultValue: 'NONE'
    },
    i_epayco: {
        type: Sequelize.STRING(50)
    },
    i_invoice: {
        type: Sequelize.STRING(50)
    },
    i_wallet: {
        type: Sequelize.TINYINT,
    },
    i_datCom: {
        type: Sequelize.DATEONLY
    },
    /**
     * 1: Completado, entregado al cliente.
     * 2: Despachado, esperando entrega al cliente
     * 3: Preparado, listo para despachar
     * 4: Confirmado, en proceso de preparación
     * 5: Pagado, esperando confirmación de los vendedores
     * 6: Esperado pago
     * 7: Cancelada,
     * 8: Pago rechazado
     * 9: Pago anulado, (aplica solo para tarjetas de crédito)
     * 10: Error en el método de pago.
     * 11: Pendiente
     * 12: Iniciada
     * 13: Expirada
     * 14: Abandonada
     */
    i_state: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 6
    },
    i_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    i_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = InvoicesModel
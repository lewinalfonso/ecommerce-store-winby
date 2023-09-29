const { transporter } = require('./index')

module.exports = {
    errorLogMail: (e, req) => {
        const mail = transporter()
        mail.sendMail({
            from: 'Error log <no-reply@winby.co>',
            to: 'hugo.gutierrezm@outlook.com, hugo.gutierrezm28@gmail.com',
            subject: '¡IMPORTANTE! Nuevo error en winby',
            html: `<html><body><h1>${e.name}</h1><p>${e.message}</p><p><b>path: </b>${req.originalUrl}</p></body></html>`
        })
}
}
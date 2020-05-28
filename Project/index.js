// * modules
    const express = require('express')
    const app = express()

    const bodyParser = require('body-parser')

    const session = require('express-session')

    const flash = require('connect-flash')

    const ControllerRouter = require('./Controller/ControllerRouter')

    // models + DB
    const connection = require('./Controller/database/database')

    const User = require('./Model/User')
    const Data = require('./Model/Data')
    
    const passport = require('passport')
    require('./Controller/helpers/auth')(passport)
    

// * configs
    // view ejs
    app.set('view engine', 'ejs')

    // pasta public
    app.use(express.static('public'))

    // body parser
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    //session
    app.use(session({
        secret: 'GerenciadorDeGanhos&Gastos',
        resave: true,
        saveUninitialized: true
    }))
    //passport
    app.use(passport.initialize())

    app.use(passport.session())

    //flash
    app.use(flash())

    // DB
    connection.authenticate().then( () => {
        console.log('conexao com o DB realizada')
    }).catch( (err) => {
        console.log('erro ao se conectar com o DB')
    })

    // middleware
    app.use( (req, res, next) => {
        
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.user = req.user || null

        next()
    })

// * router

    app.use('/', ControllerRouter)

// * server
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log('App rodando na porta 8081')
})
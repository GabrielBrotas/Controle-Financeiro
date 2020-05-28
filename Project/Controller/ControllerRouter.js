const express = require('express')
const router = express.Router()

const passport = require('passport') // sessao
require('./helpers/auth')(passport)

const {isAuth} = require('./helpers/isAuth') // verificar se está autenticado

// controle de rotas
const indexRouter = require('./classRouters/indexRouter')
const usersRouter = require('./classRouters/usersRouter') 
const itensRouter = require('./classRouters/itensRouter')
const historicoRouter = require('./classRouters/historicoRouter')
const dashboardRouter = require('./classRouters/dashboardRouter')

// rotas
    
    router.get('/', isAuth, indexRouter.index) // rota de inicio

    router.get('/month', indexRouter.month)// mostrar pelo mes

    router.get('/login', (req, res) => { // login view
        res.render('login')
    })

    router.post('/login', usersRouter.login) // efetuar login

    router.get('/logout', usersRouter.logout) // logout

    router.get('/register', (req, res) => { // registro view
        erros = []
        res.render('register', {erros: erros})
    })

    router.post('/register', usersRouter.register) // efetuar registro

    router.post('/adicionarItem', isAuth, itensRouter.adicionarItem) //Adicionar item

    router.post('/deletarItem', isAuth, itensRouter.daletarItem ) // remover item

    router.post('/editarItem', itensRouter.editarItem) // editar item

    router.get('/dashboard', isAuth, dashboardRouter.dashboardGeral)

    // router.get('/dashboard/year', isAuth, dashboardRouter.dashboardYear)

    router.get('/historico', isAuth, historicoRouter.historico)



module.exports = router
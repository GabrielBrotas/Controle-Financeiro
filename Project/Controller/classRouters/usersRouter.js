const helper = require('../helpers/userCheck')
const passport = require('passport') // sessao
const bcrypt = require('bcryptjs')

const User = require('../../Model/User')


class usersRouter{


    async login(req, res, next) {
        
        var {email, password} = req.body

        var dadosUser = {
            email,
            password
        }

        try{
            var isValid = await helper.loginCheck(dadosUser)

            if(isValid){

                passport.authenticate('local', {
                    successRedirect: '/',
                    failureRedirect: '/login',
                    failureFlash: true,
                })(req, res, next)

            } else {
                req.flash('error_msg', "Usuario ou senha inválido")
                res.redirect('/login')
            }

        } catch(err) {
            req.flash('error_msg', 'erro interno: ' + err)
            res.redirect('/login')
        }
        
    }


    logout(req, res, next){
        req.logout()
        req.flash('success_msg', 'Deslogado!')
        res.redirect('/login')
    }


    async register (req, res) {
        
        var {nome, email, password, confirmpassword} = req.body

        var dadosUser = {
            nome,
            email,
            password,
            confirmpassword
        }

        try{

            var erros = await helper.registerCheck(dadosUser)
            
            if(erros.length == 0){
                
                
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(password, salt)
    
                User.create({
                    nome,
                    email,
                    password: hash
                }).then( () => {
                    res.redirect('/login')
                }).catch( (err) => {
                    console.log(err)
                    res.redirect('/register')
                })
    
            } else {
                res.render('register', {erros: erros})
            }

        } catch(err){
            req.flash('error_msg', 'erro interno: ' + err)
            res.redirect('/register')
        }

    }


}

module.exports = new usersRouter()
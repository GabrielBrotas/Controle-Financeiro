const sequelize = require('sequelize')

const Data = require('../../Model/Data')
const { Op } = require("sequelize")


class historicoRouter{

    historico(req, res){ 

        // pegar dados do usuario que logou userId: req.user.id,
        Data.findAll( {

            where: {userId: req.user.id},
            order: [['data', 'desc']]
            
        }).then( (dados) =>{

            var entrada = 0
            var saida = 0
            var total = 0
            
            dados.forEach(dado => {
                // pegar soma das entradas e saidas
                if(dado.tipo === 1){
                    entrada += dado.valor          
                } else {
                    saida += dado.valor
                }

            })
            // diferenca entre entrada e esaida
            total = (entrada - saida).toFixed(2)
            entrada = entrada.toFixed(2)
            saida = saida.toFixed(2)

            res.render('historico', {dados, entrada, saida, total})

        }).catch( (err) => {
            req.flash('error_msg', 'erro interno')
            res.redirect('/login')
        })

    }


    
} 

module.exports = new historicoRouter()
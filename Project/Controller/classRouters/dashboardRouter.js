const sequelize = require('sequelize')

const Data = require('../../Model/Data')
const { Op } = require("sequelize")


class dashboardRouter{

    dashboardGeral(req, res){

        var ano = parseInt(req.query.ano) || 2020

        // pegar dados do usuario que logou userId: req.user.id,
        Data.findAll( {

            where: { [Op.and]: [
                sequelize.where( sequelize.fn('year', sequelize.col('data')), ano),
                {userId: req.user.id}
                ] 
            },
            order: [['data', 'asc']],
            
        }).then( (dados) =>{

            var entrada = 0
            var entradasArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            
            var saida = 0
            var saidasArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            
            var total = 0
            
            dados.forEach(dado => {
                // pegar soma das entradas e saidas
                if(dado.tipo === 1){

                    entrada += dado.valor
                    // na posicao do mes - 1 somar o valor 
                    entradasArray[ parseInt(dado.data.split('-')[1]) - 1] += dado.valor
                              
                }  else {
                    saida += dado.valor
                    saidasArray[ parseInt(dado.data.split('-')[1]) - 1] += dado.valor
                }

            })
            // diferenca entre entrada e esaida
            total = (entrada - saida).toFixed(2)

            res.render('dashboard', {dados, entrada, saida, total, entradasArray, saidasArray, ano})

        }).catch( (err) => {
            req.flash('error_msg', 'erro interno')
            res.redirect('/login')
        })

    }


    dashboardYear(req, res){

        // pegar dados do usuario que logou userId: req.user.id,
        Data.findAll( {

            where: { [Op.and]: [
                sequelize.where( sequelize.fn('year', sequelize.col('data')), 2020),
                {userId: req.user.id}
                ] 
            },
            order: [['data', 'asc']],
            
        }).then( (dados) =>{

            var entrada = 0
            var entradasArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            
            var saida = 0
            var saidasArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            
            var total = 0
            
            dados.forEach(dado => {
                // pegar soma das entradas e saidas
                if(dado.tipo === 1){

                    entrada += dado.valor
                    // na posicao do mes - 1 somar o valor 
                    entradasArray[ parseInt(dado.data.split('-')[1]) - 1] += dado.valor
                              
                }  else {
                    saida += dado.valor
                    saidasArray[ parseInt(dado.data.split('-')[1]) - 1] += dado.valor
                }

            })
            // diferenca entre entrada e esaida
            total = (entrada - saida).toFixed(2)

            res.render('dashboard', {dados, entrada, saida, total, entradasArray, saidasArray})

        }).catch( (err) => {
            req.flash('error_msg', 'erro interno')
            res.redirect('/login')
        })

    }

    
} 

module.exports = new dashboardRouter()
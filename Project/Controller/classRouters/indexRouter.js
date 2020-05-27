const sequelize = require('sequelize')

const Data = require('../../Model/Data')
const { Op } = require("sequelize")


class indexRouter{

    index(req, res){ 

        var now = new Date // pegar mes e ano atual

        const mesArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        const nomeMesArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Outubro', 'Novembro', 'Dezembro']

        var mes =  `${now.getFullYear()}-${mesArray[now.getMonth()]}`
        var mesNome = nomeMesArray[now.getMonth()]
        var ano = now.getFullYear()
        
        // pegar dados do usuario que logou userId: req.user.id,
        Data.findAll( {

            where: { [Op.and]: [
                 sequelize.where( sequelize.fn('month', sequelize.col('data')), mesArray[now.getMonth()] ),
                 sequelize.where( sequelize.fn('year', sequelize.col('data')), ano),
                 {userId: req.user.id}       
                ]},
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

            res.render('index', {dados, entrada, saida, total, mes, mesNome})

        }).catch( (err) => {
            req.flash('error_msg', 'erro interno')
            res.redirect('/login')
        })

    }


    month(req, res){
        var mes = req.query.mesEscolhido
        var mesFormatado = mes.split('-')[1]
        var ano = mes.split('-')[0]

        const nomeMesArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Outubro', 'Novembro', 'Dezembro']
        var mesNome = nomeMesArray[parseInt(mesFormatado) -1]

        
        Data.findAll( {

            where: { [Op.and]: [
                 sequelize.where( sequelize.fn('month', sequelize.col('data')), mesFormatado),
                 sequelize.where( sequelize.fn('year', sequelize.col('data')), ano),
                 {userId: req.user.id}       
                ]},
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

            res.render('index', {dados, entrada, saida, total, mes, mesNome})

        }).catch( (err) => {
            req.flash('error_msg', 'erro interno')
            res.redirect('/login')
        })
    }

} 

module.exports = new indexRouter()
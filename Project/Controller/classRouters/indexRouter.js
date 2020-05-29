const sequelize = require('sequelize')

const Data = require('../../Model/Data')
const { Op } = require("sequelize")


class indexRouter{

    index(req, res){ 

        var now = new Date // Chamar classe para pegar mes e ano atual

        const mesArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        const nomeMesArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Outubro', 'Novembro', 'Dezembro']
        
        try{
            // tentar pegar pelo parametro, so vai acontecer quando o usuario escolhere o mes pelo filtro
            var ano = parseInt(req.query.mesAnoFiltro.split('-')[0])
            var mes = parseInt(req.query.mesAnoFiltro.split('-')[1]) - 1
        } catch(err){
            // por padrao vai ser a data atual
            var ano = now.getFullYear()
            var mes = now.getMonth()
        }

        // formato ano-mes
        var ano_mes =  `${ano}-${mesArray[mes]}`

        // nome do mes
        var mesNome = nomeMesArray[mes]

        
        // pegar dados do usuario que logou userId: req.user.id,
        Data.findAll( {

            where: { [Op.and]: [
                // filtrar o sql pelo mes e ano
                 sequelize.where( sequelize.fn('month', sequelize.col('data')), mesArray[mes] ),
                 sequelize.where( sequelize.fn('year', sequelize.col('data')), ano),
                 {userId: req.user.id} // id do usuario       
                ]},
            order: [['data', 'desc']]
            
        }).then( (dados) =>{
            // valores iniciais
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
            
            res.render('index', {dados, entrada, saida, total, ano_mes, mesNome})

        }).catch( (err) => {
            req.flash('error_msg', 'erro interno')
            res.redirect('/login')
        })

    }

} 

module.exports = new indexRouter()
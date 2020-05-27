const Data = require('../../Model/Data')

class itensRouter{

    
    adicionarItem(req, res) {
        var {descricao, valor, tipo , data} = req.body

        if(tipo == 'Entrada'){
            tipo = 1
        } else {
            tipo = 0
        }
        
        Data.create({
            descricao,
            valor,
            tipo,
            data,
            userId: req.user.id
        }).then( () => {
            res.redirect('/')
        }).catch( (err) => {
            console.log(err)
            res.redirect('/')
        })
    }


    daletarItem(req, res) {

        var id = req.body.id

        Data.destroy({where: {id: id}}).then( () => {
            req.flash('success_msg', 'Item deletado')
            res.redirect('/')
        })
    }


    editarItem(req, res) {
        var {valorModal, descricaoModal, dataModal, tipoModal, idModal} = req.body

        if(tipoModal == 'Entrada'){
            tipoModal = 1
        } else {
            tipoModal = 0
        }
        
        Data.update( {
            descricao: descricaoModal,
            valor: valorModal,
            tipo: tipoModal,
            data: dataModal
        }, {where: {id: idModal}}).then( () => {

            req.flash('success_msg', 'item editado')
            res.redirect('/')

        }).catch( (err) => {
            req.flash('error_msg', 'erro interno')
            res.redirect('/')
        })

    }
}

module.exports = new itensRouter()
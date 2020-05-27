const User = require('../../Model/User')
const bcrypt = require('bcryptjs')


class helper{

    // verificar campos de registro
    async registerCheck(dados){

        var erros = []

        if(dados.nome.length < 3) {
            erros.push({texto: 'nome pequeno'})
        }

        if(dados.password != dados.confirmpassword){
            erros.push({texto: 'senhas divergentes'})
        }
        
        if(dados.password.length <= 3){
            erros.push({texto: 'senha muito pequena'})
        }

        await User.findOne({where: {email: dados.email}}).then( user => {

            if(user != undefined){
                erros.push({texto: 'email já cadastrado'})
            }

        })

        return erros
       
    }

    // verificar campos de login
    async loginCheck(dados){
        
        try{
            var user = await User.findOne({where: {email: dados.email}})

            if(user == undefined){

                return false

            } else {

                var checkPassword = await bcrypt.compareSync(dados.password, user.password) 
                
                if(checkPassword){

                    
                    return true

                } else {

                    return false

                }
            }
    
        } catch(err){
            return false
        }
        
    }

}

module.exports = new helper()
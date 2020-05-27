
module.exports = {

    isAuth: function(req, res, next) {

        if(req.isAuthenticated()){
            
            return next()

        }

        req.flash('error_msg', 'voce precisa estar logado para essa funcao')

        res.redirect('/login')
        
    }


}





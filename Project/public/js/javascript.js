function confirmDel(event, form){

    // atraves da variavel event estamos usando a funcao preventDefault() que vai impedir que o formulario seja enviado, vai barrar
    event.preventDefault();

    // funcao do javaScript que vai retornar uma mensagem para escolher true or false
    var decision = confirm('Tem certeza que deseja deletar este item?')

    if(decision){
        // se escolheu 'ok' entao o formulario nao vai ser mais barrado
        form.submit()

    } else {
        
        console.log('sem querer')
    }

}


function changeValues(event, form) {
    
    form.submit('/month')
}

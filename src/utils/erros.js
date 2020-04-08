export const traduzirErro = (code) => {

    let mensagem = "";
    
    switch (code) {
        case 'auth/email-already-in-use':
            mensagem = "O email que inseriu já está a ser utilizado."
            break;               
        case 'auth/invalid-email':
            mensagem = "O email que inseriu é inválido."
            break;
        case 'auth/operation-not-allowed':
            mensagem = "Ocorreu um erro, por favor tente mais tarde."
            break;
        case 'auth/weak-password':
            mensagem = "A password deve conter 6 caracteres ou mais."
            break;
        case 'auth/user-disabled':
            mensagem = "A conta foi desativada."
            break;
        case 'auth/user-not-found':
            mensagem = "Não existe nenhuma conta com este email."
            break;
        case 'auth/wrong-password':
            mensagem = "A password que digitou está errada."
            break;
        default:
            mensagem = "Ocorreu um erro, por favor tente mais tarde."
    }

    return mensagem;

}
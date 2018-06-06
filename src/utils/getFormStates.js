import store from '../redux/store';

export default function getFormStates(name) {
    switch(name){
        case 'login': return getLoginStates();
        case 'register': return getRegisterStates();
        case 'create-chirp': return getCreateChirpStates(); 
        default: return 'Error inside getFormStates/default switch case/'
    }
}

function getLoginStates() {
    return {username: '', password: ''}
}

function getRegisterStates() {
    return {username: '', password: '', repassword: ''}
}

function getCreateChirpStates() {
    let username = store.getState().user.username;
    return {chirpText: '', username}    
}

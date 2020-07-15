'use strict';

const login = new UserForm();
login.loginFormCallback = function(data){
    ApiConnector.login(data, (response) => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            login.setLoginErrorMessage(response.data);
        }
    });
} 


login.registerFormCallback = function(data){
    ApiConnector.register(data, (response) =>{
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            login.setLoginErrorMessage(response.data);
        }
    });
}
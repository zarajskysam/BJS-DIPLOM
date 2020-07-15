

const logout = new LogoutButton();
logout.action = function() {
    ApiConnector.logout(function(response){
        if(response.success){
            location.reload();
        }
    });
}

ApiConnector.current(function(response){
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }
});

const rates = new RatesBoard();
function exchangeRate() {
    ApiConnector.getStocks(function(response){
        if(response.success){
            rates.clearTable();
            rates.fillTable(response.data);
        }
    });
}
function exchangeRatePerMunute(){
    setInterval(exchangeRate(), 60000);
}
exchangeRatePerMunute();

const money = new MoneyManager();
money.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, (response) =>{
        if(response.success){
            ProfileWidget.showProfile(response.data);
            money.setMessage(false, `Успешное пополонение баланса`);
        } else {
            money.setMessage(true, `Ошибка`);
        }
    });
}

money.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (response) =>{
        if(response.success){
            if(response.success){
                ProfileWidget.showProfile(response.data);
                money.setMessage(false, `Успешная конвертация`);
            } else {
                money.setMessage(true, `Ошибка`);
            }
        }
    });
}

money.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (response) =>{
        console.log(response);
        if(response.success){
            if(response.success){
                ProfileWidget.showProfile(response.data);
                money.setMessage(false, `Успешная конвертация`);
            } else {
                money.setMessage(true, `Ошибка`);
            }
        }
    });
}

const favorite = new FavoritesWidget();
ApiConnector.getFavorites(function(response){
    if(response.success){
        console.log(response);
        favorite.clearTable();
        favorite.fillTable(response.data);
        money.updateUsersList(response.data);
    }
});

favorite.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, (response) =>{
        if (response.success){
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            money.setMessage(false, `Успешное добавление`);
        } else {
            money.setMessage(true, `Ошибка`);
        }
    });
}

favorite.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, (response) =>{
        if (response.success){
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            favorite.setMessage(false, `Успешное удаление`);
        } else {
            favorite.setMessage(true, `Ошибка`);
        }
    });
}









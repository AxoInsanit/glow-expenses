/* global app:true */

'use strict';

app.factory('loginRepositorySvc', function(repositoryBaseSvc) {

    function login(username, password) {
        return repositoryBaseSvc.executeRequest(
            'POST',
            'https://esb.dev.corp.globant.com/system/login',
            { username: username, password: password }
        );
    }

    return {
        login: login
    };
});
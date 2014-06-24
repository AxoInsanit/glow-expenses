'use strict';

app.factory('loginSvc',function($http){
    return {
        login:function(data){

            var $promise = $http.post('https://esb.dev.corp.globant.com/system/login',
                                        { username: 'rodrigo.rivas',
                                          password: 'lambda'
                                        });
            $promise.then(function(msg){

            });
        }
    };

});
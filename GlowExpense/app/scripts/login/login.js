'use strict';

angular.module('Login', ['ngResource'])
    .config(function () {})
    .constant('errorMsg', 'Please try again! Username or password is wrong!')
    .constant('loginUrl', 'https://esb.dev.corp.globant.com/system/login')
    .constant('loginUrlMockWeb', 'http://127.0.0.1:8080/service/login')
  //  .constant('loginUrlMockEmulate', 'http://10.0.2.2:8080/service/login')
    .constant('loginUrlMockEmulate', 'http://10.0.3.2:8080/service/login')
    .constant('loginUrlMockEmulateWebMocky', 'http://www.mocky.io/v2/53bfa053ea38ea64070472b2');

//192.168.55.1
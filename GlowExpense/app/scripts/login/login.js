'use strict';

angular.module('Login', ['ngResource'])
    .config(function () {})
    .constant('oAuthClientId', '303991400109-4ejt8etd7j13vt1dr5t5e3i8dh3uqbph.apps.googleusercontent.com')
    .constant('oAuthRedirectPath', '/system/login/web')
    .constant('oAuthLoginUri', 'https://accounts.google.com/o/oauth2/auth')
    .constant('errorMsg', 'Please try again! Username or password is wrong!')
    .constant('glowKey', '98X773A4-5H32-8921-H29N-KEJ8S93V2314')
    .constant('glowRegisterPath', '/system/register/web')
    .constant('globerStorageKey', 'glober')
    .constant('userName', 'userName');



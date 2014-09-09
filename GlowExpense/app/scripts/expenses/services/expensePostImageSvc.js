'use strict';

angular.module('Expenses').factory('expensePostImageSvc', ['$resource', 'baseUrlMockeyWeb',
 'imagesUrl','expensesUrl', '$http', 'imageFileShareSvc', 'expenseIdShareSvc', 'localStorageSvc', 'sessionToken', '$q',
    function($resource, baseUrlMockeyWeb, imagesUrl, expensesUrl, $http, imageFileShareSvc, expenseIdShareSvc,
        localStorageSvc, sessionToken, $q) {
        
        function saveImage(){
            var deffered = $q.defer();
            var fd = imageFileShareSvc.getFile();
            $http.post(baseUrlMockeyWeb + expensesUrl + imagesUrl +'?expenseId='+ expenseIdShareSvc.getId() + '&token=' + localStorageSvc.getItem(sessionToken),fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function(){
                    deffered.resolve();
                })
                .error(function(){
                    deffered.reject();
                });
                return deffered.promise;
            }
        return {
            saveImage: saveImage
        };
    }
]);
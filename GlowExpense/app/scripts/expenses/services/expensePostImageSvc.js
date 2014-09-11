'use strict';

angular.module('Expenses').factory('expensePostImageSvc', ['$resource', 'baseUrlMockeyWeb',
 'imagesUrl','expensesUrl', '$http', 'imageFileShareSvc', 'expenseIdShareSvc', 'localStorageSvc', 'sessionToken', '$q',
    function($resource, baseUrlMockeyWeb, imagesUrl, expensesUrl, $http, imageFileShareSvc, expenseIdShareSvc,
        localStorageSvc, sessionToken, $q) {
        
        return $resource(baseUrlMockeyWeb + expensesUrl + imagesUrl +'?expenseId='+ expenseIdShareSvc.getId() + '?token=:token',
            {
                token: 'token'
            },
            {
                'postImages' : {
                    'method': 'POST',
                    transformRequest : function(data){
                        if (data === undefined)
                          return data;

                        var fd = new FormData();
                        angular.forEach(data, function(value, key) {
                          if (value instanceof FileList) {
                            if (value.length == 1) {
                              fd.append(key, value[0]);
                            } else {
                              angular.forEach(value, function(file, index) {
                                fd.append(key + '_' + index, file);
                              });
                            }
                          } else {
                            fd.append(key, value);
                          }
                        });

                        return fd;
                    }
                }
            }
        );
    }
]);
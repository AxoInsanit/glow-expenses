'use strict';

angular.module('Services').factory('projectsRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'projectsUrl',
    function($resource, baseUrlMockeyWeb, projectsUrl) {

        return $resource( baseUrlMockeyWeb + projectsUrl + '?token=:token' + '&scope=expenses' ,
            {
                token: 'token'
            },
            {
                getProjects: {
                    'method':'GET',
                    'isArray':false
                }
            }
        );
    }
]);


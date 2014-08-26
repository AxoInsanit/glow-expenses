'use strict';

angular.module('Services').factory('projectsRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'projectsUrl', 'localStorageSvc', 'sessionToken',
    function($resource, baseUrlMockeyWeb, projectsUrl, localStorageSvc, sessionToken) {

        return $resource( baseUrlMockeyWeb + projectsUrl + '?token=' + localStorageSvc.getItem(sessionToken)  , {}, {
            getProjects: {
                method:'GET',
                isArray:false
            }
        } );
    }
]);


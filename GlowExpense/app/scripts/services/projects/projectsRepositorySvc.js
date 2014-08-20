'use strict';

angular.module('Services').factory('projectsRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'projectsUrl',
    function($resource, baseUrlMockeyWeb, projectsUrl) {

        return $resource( baseUrlMockeyWeb + projectsUrl, {}, {
            getProjects: {
                method:'GET',
                isArray:false
            }
        } );
    }
]);


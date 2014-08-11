angular.module('Services')
    .factory('projectsSharingSvc', ['$q', 'projectsRepositorySvc', function($q, projectsRepositorySvc) {

        var projects = [];

        // lazy load reports on demand
        function getProjects(){
            var deferred = $q.defer();

            if (projects.length === 0){
                projectsRepositorySvc.getProjects().$promise.then(function(response){
                    projects = response.projects;
                    deferred.resolve(projects);
                });
            }
            else {
                deferred.resolve(projects);
            }

            return deferred.promise;
        }

        return {
            getProjects: getProjects
        };
    }
]);
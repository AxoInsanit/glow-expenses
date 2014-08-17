'use strict';

angular.module('Services')
    .factory('projectsSharingSvc', ['$q', 'projectsRepositorySvc', function($q, projectsRepositorySvc) {
        var projects = [];
        // lazy load reports on demand
        function getProjects(){
            var deferred = $q.defer();

            function projectSuccess(response){
                response.projects.forEach(function(project){
                    project.title = project.client.name + ' - ' + project.name;
                    projects.push(project);
                });
                deferred.resolve(projects);
            }

            if (projects.length === 0){
                projectsRepositorySvc.getProjects(
                    {
                        'scope': 'expense'
                    },
                    projectSuccess
                );
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
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
                        
                    },
                    projectSuccess
                );
            }
            else {
                deferred.resolve(projects);
            }

            return deferred.promise;
        }

        function getProjectIdByName(name){
            var result = null;
            projects.some(function(project){
                if (project.name === name){
                    result = project.id;
                    return true;
                }
            });

            return result;
        }

        return {
            getProjects: getProjects,
            getProjectIdByName: getProjectIdByName
        };
    }
]);
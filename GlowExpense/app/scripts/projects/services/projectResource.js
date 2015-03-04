'use strict';

angular.module('Projects')
    .factory('projectResource', function ($http, $q, baseUrlMockeyWeb, projectsUrl, userResource, $rootScope,
                                          organizationalUnitsUrl) {
        var cachedProjects = false,
            cachedOrganizationalUnits = false;

        $rootScope.$on('global::signOut', function () {
            cachedProjects = false;
            cachedOrganizationalUnits = false;
        });

        return {
            getProject: function (projectId) {
                return this.getProjects().then(function (projects) {
                    var foundProject = false;
                    projects.some(function (project) {
                        if (project.id === projectId) {
                            foundProject = project;
                            return false;
                        }
                    });
                    return foundProject;
                });
            },
            getProjects: function () {
                var promise;
                if (cachedProjects) {
                    promise = $q.when(cachedProjects);
                } else {
                    promise = $http.get(baseUrlMockeyWeb + projectsUrl, {params: {token: userResource.getToken()}}).then(function (response) {
                        cachedProjects = response.data.projects;
                        return response.data.projects;
                    });
                }
                return promise;
            },
            getOrganizationalUnit: function (organizationalUnitId) {
                return this.getOrganizationalUnits().then(function (organizationalUnits) {
                    var foundOrganizationalUnit = false;
                    organizationalUnits.some(function (organizationalUnit) {
                        if (organizationalUnit.id === organizationalUnitId) {
                            foundOrganizationalUnit = organizationalUnit;
                            return false;
                        }
                    });
                    return foundOrganizationalUnit;
                });
            },
            getOrganizationalUnits: function () {
                var promise;
                if (cachedOrganizationalUnits) {
                    promise = $q.when(cachedOrganizationalUnits);
                } else {
                    promise = $http.get(baseUrlMockeyWeb + organizationalUnitsUrl, {params: {token: userResource.getToken()}}).then(function (response) {
                        cachedOrganizationalUnits = response.data.organizationalUnits;
                        return response.data.organizationalUnits;
                    });
                }
                return promise;
            }

        };
    });

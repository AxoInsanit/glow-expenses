'use strict';

angular.module('Reports').controller('projectNameModalCtrl', ['$scope', '$modalInstance', '$location', 'data',
        function ($scope, $modalInstance, $location, data) {
            $scope.projects = data.projects.projects;
            $scope.target = data.target;

            $scope.chousen = function (choise) {
                //change the input value
                $($scope.target).html(choise.name);
                $($scope.target).parent().find('input').attr("data-projId",choise.id);
                $($scope.target).parent().find('input').attr("data-projName",choise.name);
                
                $.grep($scope.projects, function(item){
                  if( item.selected == true );
                    item.selected = false;
                });
                choise.selected = true;
                $modalInstance.dismiss('cancel');
            };
             
        }
]);
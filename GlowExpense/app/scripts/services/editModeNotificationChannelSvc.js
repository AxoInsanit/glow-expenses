'use strict';

angular.module('Services').factory('editModeNotificationChannelSvc', ['$rootScope', 'editModeToggled',
        function($rootScope, editModeToggled){

            //subscribe
            var onEditModeToggled = function($scope, handler){
                $scope.$on(editModeToggled, function(event, args){
                    handler(args.isEditMode);
                });
            };

            // publish
            var toggleEditMode = function(isEditMode) {
                $rootScope.$broadcast(editModeToggled, { isEditMode: isEditMode }   );
            };

            return {
                onEditModeToggled: onEditModeToggled,
                toggleEditMode: toggleEditMode
            };
        }
]);

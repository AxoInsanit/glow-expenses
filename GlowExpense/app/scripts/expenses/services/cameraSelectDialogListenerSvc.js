'use strict';

angular.module('Expenses').factory('cameraSelectDialogListenerSvc', [
    function() {

        var openCameraSelectDlg = false;

        return {
            openCameraSelectDlg: openCameraSelectDlg
        };
    }
]);
'use strict';

angular.module('Services').factory('fileTransferSvc', function ($q, $window, $timeout, requestNotificationChannelSvc) {
    return {
        upload: function (uploadUrl, file, data) {
            var ft = ($window.FileTransfer) ? new $window.FileTransfer() : angular.noop,
                deferred = $q.defer(),
                options = new $window.FileUploadOptions(),
                params = {},
                defaultUploadTimeout = 40000,
                progressTimeout;

            requestNotificationChannelSvc.requestStarted();

            function onSuccess() {
                $timeout.cancel(progressTimeout);
                requestNotificationChannelSvc.requestEnded();
                deferred.resolve();
            }

            function onFail(error) {
                requestNotificationChannelSvc.requestEnded();
                console.log('file-transfer', error);
                deferred.reject(error);
            }

            function requestTimeout() {
                deferred.reject($window.FileTransferError.CONNECTION_ERR);
                ft.abort();
            }

            if (!file) {
                deferred.reject('No file to upload');
            } else {
                // set JSON data
                if (data) {
                    params.data = angular.toJson(data);
                }
                // set upload options
                options.fileKey = 'file';
                options.mimeType = 'image/png';
                options.httpMethod = 'POST';
                options.chunkedMode = false;
                options.headers = {
                    'Content-Type': undefined,
                    Connection: 'close'
                };
                options.params = params;

                console.log('file-transfer', options);

                // onprogress notifier
                ft.onprogress = function (e) {
                    var percentCompleted;
                    if (progressTimeout) {
                        $timeout.cancel(progressTimeout);
                    }
                    progressTimeout = $timeout(requestTimeout, defaultUploadTimeout);
                    // return progress
                    if (e.lengthComputable) {
                        percentCompleted = Math.round(e.loaded / e.total * 100);
                        deferred.notify(percentCompleted);
                    }
                };

                // trigger upload
                ft.upload(file, encodeURI(uploadUrl), onSuccess, onFail, options, true);
            }

            return deferred.promise;
        }
    };
});

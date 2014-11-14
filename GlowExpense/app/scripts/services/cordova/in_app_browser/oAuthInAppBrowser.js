'use strict';

angular.module('Services').service('oAuthInAppBrowser', function ($window) {
  var loadingStyles = '@keyframes spin { to { transform: rotate(1turn); } } @-webkit-keyframes spin { to { -webkit-transform: rotate(1turn); } } .spinner-overlay { position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.3); display: -webkit-box; display: box; box-orient: vertical; -webkit-box-orient: vertical; box-pack: center; -webkit-box-pack: center; box-align: center; -webkit-box-align: center; z-index: 10000 } .spinner-overlay.hide { display: none; } .spinner { position: relative; display: inline-block; width: 5em; height: 5em; margin: 0 .5em; font-size: 12px; text-indent: 999em; overflow: hidden; animation: spin 1s infinite steps(8); -webkit-animation: spin 1s infinite steps(8) } .spinner:after, .spinner:before, .spinner>div:after, .spinner>div:before { content: ""; position: absolute; top: 0; left: 2.25em; width: .5em; height: 1.5em; border-radius: .2em; box-shadow: 0 3.5em #eee; transform-origin: 50% 2.5em; -webkit-transform-origin: 50% 2.5em } .spinner:before { background: #fff; opacity: .2 } .spinner:after { transform: rotate(-45deg); -webkit-transform: rotate(-45deg); background: #fff; opacity: .4 } .spinner>div:before { transform: rotate(-90deg); -webkit-transform: rotate(-90deg); background: #fff; opacity: .6 } .spinner>div:after { transform: rotate(-135deg); -webkit-transform: rotate(-135deg); background: #fff; opacity: .8 }',
    loadingScript = {
      main: 'var spinner = document.createElement("div"), spinnerOverlay = document.createElement("div"); spinner.appendChild(document.createElement("div")); spinnerOverlay.className="spinner-overlay"; spinner.className="spinner"; spinnerOverlay.appendChild(spinner); document.querySelector("body").appendChild(spinnerOverlay);',
      show: 'document.querySelector(".spinner-overlay").className="spinner-overlay"',
      hide: 'document.querySelector(".spinner-overlay").className="spinner-overlay hide"'
    };
  return {
    login: function (url, resolveToken, rejectToken) {

      var inAppBrowser = $window.open(url, '_blank', 'location=no,clearcache=yes,clearsessioncache=yes,closebuttoncaption=Cancel,toolbar=yes'),
        browserInterval,
        tokenFound = false;

      function showSpinner() {
        inAppBrowser.executeScript({code: loadingScript.show});
      }
      function hideSpinner() {
        setTimeout(function () {
          inAppBrowser.executeScript({code: loadingScript.hide});
        }, 1000);
      }

      // handlers
      function checkToken(event) {
        var url = event.url,
          queryParams,
          oAuthToken;

        // detect url
        if (!url) {
          if (event.srcElement) {
            url = event.srcElement.URL;
          } else if (event.location) {
            url = event.location.href;
          }
        }

        console.log(url);
        if (url.indexOf('access_token') > 0) {
          // find access_token
          queryParams = url.split('#')[1];
          angular.forEach(queryParams.split('&'), function (queryParam) {
            queryParam = queryParam.split('=');
            if (queryParam[0] === 'access_token') {
              oAuthToken = queryParam[1];
            }
          });
          if (oAuthToken) {
            tokenFound = true;
            // clean & close inAppBrowser
            inAppBrowser.removeEventListener('close', rejectToken);
            inAppBrowser.removeEventListener('exit', rejectToken);

            resolveToken(oAuthToken);
            inAppBrowser.close();

          }
        }
      }

      // add listeners
      if ($window.cordova) {
        // spinner events
        inAppBrowser.executeScript({code: loadingScript.main});
        inAppBrowser.insertCSS({code: loadingStyles});

        // oauth events
        inAppBrowser.addEventListener('loadstart', checkToken);
        inAppBrowser.addEventListener('loaderror', checkToken);
        inAppBrowser.addEventListener('exit', rejectToken);

        inAppBrowser.addEventListener('loadstart', showSpinner);
        inAppBrowser.addEventListener('loadstop', hideSpinner);
        inAppBrowser.addEventListener('loaderror', hideSpinner);
        inAppBrowser.addEventListener('exit', hideSpinner);
      } else {
        inAppBrowser.addEventListener('load', checkToken);

        // browser hack for development
        browserInterval = setInterval(function () {
          if (inAppBrowser.location.href) {
            checkToken(inAppBrowser);
          } else {
            clearInterval(browserInterval);
            if (!tokenFound) {
              rejectToken();
            }
          }
        }, 2000);
      }


      return inAppBrowser;
    }
  };
});
/**
 * Created by diego.caro on 07/11/2014.
 */
'use strict';

angular.module('Services').factory('contableCodesSvc', [function() {

    var contableCodes = [];

    function get() {
        return contableCodes;
    }

    function set(contableCodesData) {
        if (!contableCodesData) {
            console.warn('Contable codes not set.');
            return false;
        }

        contableCodesData.map(function (item) {
            item.selected = false;
        });
        contableCodes = contableCodesData;
    }

    return {
        get: get,
        set: set
    };
}
]);

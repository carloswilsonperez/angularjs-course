(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['MenuService', 'ApiPath'];
function InfoController(MenuService, ApiPath) {
    var $ctrl = this;
    $ctrl.show = false;
    $ctrl.userData = MenuService.userData;
    $ctrl.userDish = MenuService.userDish;
    $ctrl.ApiPath = ApiPath;

    if ($ctrl.userData) {
        $ctrl.show = true;
    } else {
        $ctrl.show = false;
    }
}


})();

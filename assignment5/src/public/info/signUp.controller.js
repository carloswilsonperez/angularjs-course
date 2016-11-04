(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController)
.service('storageService', storageService);

storageService.$inject = ['MenuService', '$rootScope'];
function storageService(MenuService, $rootScope) {
    var service = this;

    service.userData = {};

    service.save = function (userData) {


        //Get menu from user Dish
        var result = MenuService.getDish(userData.dish).then(
            function(result) {
                service.userData = userData; //Save User information
                MenuService.userData = userData;
                MenuService.userDish = result;
                $rootScope.$broadcast('shoppinglist:processing', {on: false});  //Hide warning message
            },
            function(error) {
                $rootScope.$broadcast('shoppinglist:processing', {on: true});  //Show warning message
            }
        );
    };

    service.getUser = function () {
        return service.userData;
    };
}

SignUpController.$inject = ['storageService', '$rootScope'];
function SignUpController(storageService, $rootScope) {
    var $ctrl = this;

    $ctrl.save = function() {  //Saves user data into Service
        $ctrl.user.dish = $ctrl.user.dish.toUpperCase();
        storageService.save($ctrl.user);
    }

    $ctrl.retrieve = function() {   //Retrieves user data from Service
        console.log(storageService.getUser($ctrl.user));
    }

    $rootScope.$on('shoppinglist:processing', function(event, data) {
        if (data.on) {
            $ctrl.menuNotExists = data.on;
            $ctrl.showDataSavedMessage = false;
        }
        else {
            $ctrl.menuNotExists = data.on;
            $ctrl.showDataSavedMessage = true;
        }
    });
}


})();

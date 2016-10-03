/**
 * Created by carlos.wilson on 02/10/2016.
 */
(function() {
    "use strict";

    var myApp = angular.module("NarrowItDownApp", []);
    myApp.service("MenuSearchService", searchService);
    myApp.controller("NarrowItDownController", narrowController);
    myApp.directive("foundItems", foundDirective);
    myApp.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com/");

    searchService.$inject = ["$http", "ApiBasePath"];
    function searchService($http, ApiBasePath) {
        var service = this;

        service.foundItems = [];

        service.removeItem = function(index) {
            console.log(index);
            service.foundItems.splice(index, 1);
        };

        service.getMatchedMenuItems = function (searchTerm) {

            service.foundItems = [];

            return $http({
                method: "GET",
                url: ApiBasePath + "menu_items.json"
            }).then(function (result) {
                // process result and only keep items that match
                var totalItems = result.data.menu_items;
                var i;

                for (i = 0; i < totalItems.length; i++) {
                    if (totalItems[i].description.indexOf(searchTerm) > -1) {
                        service.foundItems.push(totalItems[i]);
                    }
                }

                // return processed items
                return service.foundItems;
            });
        };
    }

    narrowController.$inject = ["MenuSearchService"];
    function narrowController(MenuSearchService) {
        var narrowController = this;

        narrowController.removeItem = function(index) {
            MenuSearchService.removeItem(index);
        };

        narrowController.searchItems = function(searchTerm) {
            if (searchTerm) {
                var getItems = MenuSearchService.getMatchedMenuItems(searchTerm);

                getItems.then(function(result){
                    if (result) {
                        narrowController.foundItems = result;
                    } else {
                        narrowController.foundItems = [];
                    }

                }).catch(function(error) {
                    console.log("Error!");
                });
            } else {
                narrowController.foundItems = [];
            }
        }
    }

    function foundDirective() {
        var ddo = {
            templateUrl: 'searchList.html',
            scope: {
                items: '=',
                onRemove: '&'
            },
            controller: foundDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function foundDirectiveController() {
        var list = this;

        list.cookiesInList = function () {
            if (list.items && list.items.length > 0) {
                return false;
            }

            return true;
        };
    }

})();

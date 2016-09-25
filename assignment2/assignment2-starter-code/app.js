/**
 * Created by carlos.wilson on 25/09/2016.
 */
(function() {

    "use strict";

    var myApp = angular.module("ShoppingListCheckOff", []);

    myApp.service("ShoppingListCheckOffService", shopService);

    function shopService() {
        var service = this;

        service.toBuy = [
            { name: "cookies", quantity: 5 },
            { name: "bread", quantity: 6 },
            { name: "jam", quantity: 20 },
            { name: "eggs", quantity: 30 },
            { name: "milk", quantity: 4 }
        ];
        service.bought = [];

        service.getItemsToBuy = function() {
            return service.toBuy;
        };

        service.getItemsBought = function() {
            return service.bought;
        };

        service.add = function(itemIndex) {
            service.bought.push(service.toBuy[itemIndex]);
            console.log("pushing " + JSON.stringify(service.toBuy[itemIndex]));
        };

        service.remove = function(itemIndex) {
            service.toBuy.splice(itemIndex, 1);
        };

    }

    myApp.controller("ToBuyShoppingController", toBuyController);
    myApp.controller("AlreadyBoughtShoppingController", boughtController);
    toBuyController.$inject = ["ShoppingListCheckOffService"];
    boughtController.$inject = ["ShoppingListCheckOffService"];

    function toBuyController(ShoppingListCheckOffService) {
        var toBuyItems = this;

        toBuyItems.items = ShoppingListCheckOffService.getItemsToBuy();

        toBuyItems.moveItem = function(itemIndex) {
            ShoppingListCheckOffService.add(itemIndex);
            ShoppingListCheckOffService.remove(itemIndex);
        }
    }

    function boughtController(ShoppingListCheckOffService) {
        var bought = this;

        bought.items = ShoppingListCheckOffService.getItemsBought();
    }

})();

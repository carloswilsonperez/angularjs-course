(function () {
'use strict';

angular.module('ShoppingList')
.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com/")
.service('ShoppingListService', ShoppingListService);


ShoppingListService.$inject = ['$q', '$http']
function ShoppingListService($q, $http) {
  console.log("ooooo");
  var service = this;

  service.getAllCategories = function () {

    return $http({
        method: "GET",
        url:  "https://davids-restaurant.herokuapp.com/categories.json"
    }).then(function(result) {
      return result.data;
    });

  };

  service.getItemsForCategory = function(itemShortName) {console.log("Short name = " + itemShortName);
    return $http({
        method: "GET",
        url:  "https://davids-restaurant.herokuapp.com/menu_items.json",
        params: {
          category: itemShortName
        }
    }).then(function(result) {console.log("Items result = " + JSON.stringify(result.data.menu_items));
      return result.data.menu_items;
    });

  }
}


})();

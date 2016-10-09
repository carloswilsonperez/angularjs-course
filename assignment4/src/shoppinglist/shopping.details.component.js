(function () {
'use strict';

angular.module('ShoppingList')
.component('shoppingListDetails', {
  templateUrl: 'src/shoppinglist/templates/shoppinglist.details.template.html',
  bindings: {
    items: '<'
  }
});

})();

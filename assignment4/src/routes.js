(function () {
'use strict';

angular.module('ShoppingList')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/home');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/home',
    templateUrl: 'src/shoppinglist/templates/home.template.html'
  })

  // Premade list page
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
    controller: 'MainShoppingListController as mainList',
    resolve: {
      items: ['ShoppingListService', function (ShoppingListService) {
        return ShoppingListService.getAllCategories();
      }]
    }

  })

  // Item detail
  .state('mainList.itemDetail', {
    url: '/item-detail/{itemShortName}',
    templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    controller: 'ItemDetailController as itemDetail',
    resolve: {
      items: ['$stateParams', 'ShoppingListService', function ($stateParams, ShoppingListService) {
        return ShoppingListService.getItemsForCategory($stateParams.itemShortName);
      }]
    }

  });

}

})();

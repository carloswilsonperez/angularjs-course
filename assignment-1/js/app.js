/**
 * Created by carlos.wilson on 16/09/2016.
 */

(function() {

    "use strict";

    var LunchCheck = angular.module("LunchCheck", []);

    LunchCheck.controller("LunchCheckController", myController);

    myController.$inject = ["$scope"];

    function myController($scope) {

        $scope.message = "";
        $scope.userString = "";

        $scope.check = function() {

            if ($scope.userString == "") { //For empty strings
                $scope.message = "Please enter data first";
            } else {
                var userStringArray = $scope.userString.split(",");
                var numItems = userStringArray.length;

                if (numItems <= 3) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }
            }

            $scope.userString = "";
        };
    }

})();



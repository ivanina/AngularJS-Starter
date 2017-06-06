(function() {
    var app = angular.module('gemStore', ['store-directives']);

    app.controller('StoreController', ['$scope','$log','$http',function($scope,$log,$http){
        $scope.$log = $log;
        var store = this;
        store.products = [];
        $http.get('http://localhost:3000/shaping-up-with-angularjs/store-products/').then(
            function(response) { //store-products.json
                store.products = response.data;
            },
            function(error) {
                $log.log(error);
            }
        );
    }]);

    app.controller('ReviewController', function() {
        this.review = {};

        this.addReview = function(product) {
            product.reviews.push(this.review);

            this.review = {};
        };
    });
})();
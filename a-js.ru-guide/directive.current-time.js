(function(){
    "use strict";
    var app = angular.module('time',[]);

    // -- 0 --
    app.directive('currentTime',function ($timeout,dateFilter,$filter) {  // it's factory function. Other form: myModule.directive('directiveName', function factory(injectables) {
        return function(scope, element, arrts){ // it's postLink function
            var timerId, format;

            // Update UI
            function updateTime() {
                //element.text(dateFilter(new Date(), format));
                element.text( $filter('date')(new Date(), format) );
            }

            //CronJob for update every sec
            function updateCron(){
                timerId = $timeout(function () {
                    updateTime();
                    updateCron();
                },1000);
            }

            //Update UI if field (element) was change
            scope.$watch((arrts.currentTime, function (element) {
                format = element.format;
                updateTime();
            }));

            element.bind('$destroy',function () {
                $timeout.cancel(timerId);
            });

            updateCron();
        };
    });

    app.controller('Ctrl2',function ($scope) {
        $scope.format = 'M/d/yy h:mm:ss a';
    })

    function Ctrl2($scope) {
        $scope.format = 'M/d/yy h:mm:ss a';
    }

    /**
     * Different form of Directive for write
     */
    // -- 1 --
    app.directive('directiveNameA', function factory(injectables) {
        var directiveDefinitionObject = {
            priority: 0,
            template: '<div></div>',
            templateUrl: 'directive.html',
            replace: false,
            transclude: false,
            restrict: 'A',
            scope: false,
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        // do something A-A-A
                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        // do something U-U-U
                    }
                };
            },
            link: function postLink(scope, iElement, iAttrs) {
                // do something
            }
        };
        return directiveDefinitionObject;
    });

    // -- 2 --
    app.directive('directiveNameB', function factory(injectables) {
        var directiveDefinitionObject = {
            compile: function compile(tElement, tAttrs) {
                return function postLink(scope, iElement, iAttrs) {
                    // do something  U-U-U
                };
            }
        };
        return directiveDefinitionObject;
    });

    // -- 3 --  (used in view '-- 0 --')
    app.directive('directiveNameC', function factory(injectables) {
        return function postLink(scope, iElement, iAttrs) {
            // do something  U-U-U
        };
    });

})();


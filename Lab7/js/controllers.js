var portfolioApp = angular.module('portfolioApp', []);
portfolioApp.controller('GalleryListCtrl', ['$scope', '$http', function($scope, $http) {
        $http({
            method: 'get', 
            url: 'images/galleries.json'
        }).then(function (response) {
            $scope.galleries = response.data;
        },function (error){
            console.log(error, 'Error');
        });

        $http({
            method: 'get', 
            url: 'images/sortlist.json'
        }).then(function (response) {
            $scope.sortList = response.data;
            $scope.orderProp = $scope.sortList[1];
        },function (error){
            console.log(error, 'Error');
        });
    }]
);

portfolioApp.controller('Title', function($scope) {
    $scope.title = {
        'title': 'Moje podróże',
        'subtitle': 'Miejsca, w których byłem...'
    }
});

 

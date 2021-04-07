var portfolioApp = angular.module('portfolioApp', []);
portfolioApp.controller('GalleryListCtrl', function($scope) {
    $scope.galleries = [
        {
            'title': 'Egypt',
            'when': '2020-06-21',
            'thumbnailUrl': '/images/egypt.jpg'
        },
        {
            'title': 'Finland',
            'when': '2018-03-03',
            'thumbnailUrl': '/images/finland.jpg'
        },
        {
            'title': 'Japan',
            'when': '2016-10-14',
            'thumbnailUrl': '/images/japan.jpg'
        },
        {
            'title': 'London',
            'when': '2014-05-26',
            'thumbnailUrl': '/images/london.jpeg'
        },
        {
            'title': 'Paris',
            'when': '2012-07-05',
            'thumbnailUrl': '/images/paris.jpg'
        },
        {
            'title': 'Rome',
            'when': '2010-02-17',
            'thumbnailUrl': '/images/rome.jpg'
        }
    ];
});

portfolioApp.controller('Title', function($scope) {
    $scope.title = {
        'title': 'Moje podróże',
        'subtitle': 'Miejsca, w których byłem...'
    }
});

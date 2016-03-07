
var app = angular.module('narmboolGuide', ['ionic', 'narmboolGuide.controllers'])

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  //Pre-define all the states(pages)
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('firstLevelMenu', {
    url: '/',
    templateUrl: 'templates/firstLevelMenu.html'
  });
  $stateProvider.state('secondLevelMenu', {
    cache: false,
    url: '/',
    templateUrl: 'templates/secondLevelMenu.html'
  });
  $stateProvider.state('detail', {
    cache: false,
    url: '/',
    templateUrl: 'templates/detail.html'
  });
  $stateProvider.state('search', {
    url: '/',
    templateUrl: 'templates/search.html'
  });
  $stateProvider.state('about', {
    url: '/',
    templateUrl: 'templates/about.html'
  });

  //Disable navigating back behaviour from swipe gesture
  $ionicConfigProvider.views.swipeBackEnabled(false);
  //Disable animation of transitions between different pages
  $ionicConfigProvider.views.transition('none');


});

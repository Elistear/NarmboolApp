var app = angular.module("narmboolGuide.controllers",["ionic"]);

app.controller("narmboolGuide", function($scope, $state, $http, $window) {

  $scope.imageHeight = $window.innerHeight * 4 / 5;
  $scope.allSpecies = [];
  $http.get("data.json")
    .success(function (response) {
      $scope.allSpecies = response;
    });

  //Generate first level menu
  $scope.groups = ["Birds", "Mammals", "Frogs", "Grass", "Groundcovers", "Wildflowers", "Trees", "Understorey"];
  $scope.firstSelection;
  $scope.secondList = [];
  $scope.goToSecondLevelMenu = function (selection) {
    $scope.firstSelection = selection;
    $scope.secondList.splice(0, $scope.secondList.length);
    $scope.secondList = $scope.secondList.concat($scope.allSpecies[selection]);
    $state.go('secondLevelMenu');
  }

  //Generate second level menu
  $scope.secondSelection;
  $scope.species = {};
  $scope.showDetail = function (selection) {
    $scope.secondSelection = selection;
    $scope.species = $scope.allSpecies[$scope.firstSelection][selection];
    $state.go('detail');
  };

  //Go to search page
  $scope.goToSearch = function () {
    $state.go('search');
  };

  //Go to about page
  $scope.goToAboutPage = function () {
    $state.go('about');
  };

  //Go through all the species to find the search keyword
  $scope.searchResult = [];
  $scope.groupsFromSearchResult = [];
  $scope.searchText = {
    keyword: ''
  };
  $scope.search = function () {
    $scope.searchResult.splice(0, $scope.searchResult.length);
    $scope.groupsFromSearchResult.splice(0, $scope.groupsFromSearchResult.length);
    angular.forEach($scope.allSpecies, function (group, groupIndex) {
      angular.forEach(group, function (species, speciesIndex) {
        if ($scope.searchText.keyword != "") {
          if (species.name.toLowerCase().indexOf($scope.searchText.keyword.toLowerCase()) > -1) {
            $scope.searchResult.push(species);
            $scope.groupsFromSearchResult.push(groupIndex);
          }
        }
      });
    });
  }

  //Display the page with the search result.
  $scope.showDetailFromSearch = function (selection) {
    $scope.species = $scope.searchResult[selection];
    $scope.firstSelection = $scope.groupsFromSearchResult[selection];
    $scope.secondList.splice(0, $scope.secondList.length);
    $scope.secondList = $scope.secondList.concat($scope.allSpecies[$scope.firstSelection]);
    $state.go('detail');
  };
});

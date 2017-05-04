import { Directive } from '@angular/core';

/**
 * Generated class for the NewClick directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[new-click]' // Attribute selector
})
export class NewClick {

  app;

  constructor() {
    console.log('Hello NewClick Directive');

    this.app.directive('myclick', function() {
      return function(scope, element, attrs) {
        element.bind('touchstart click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          scope.$apply(attrs['myclick']);
        });
      };
    });

    this.app.controller('Main', function ($scope) {

      $scope.anything = function() {

        alert('Anything');
      };
    });


  }



}

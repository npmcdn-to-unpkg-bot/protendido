app.controller('AppController',['$scope','$mdDialog', '$mdMedia', function($scope,$mdDialog){

/*
    this.confirm = $mdDialog.alert()
        .title('Termo de responsabilidade')
        .content('Esse programa vem sem nenhuma garantia de bom funcionamento, somente o usúario será responsável no uso do mesmo ')

        .ok('Entendi');
        return $mdDialog.show(this.confirm);
  */


  $mdDialog.show(
    $mdDialog.alert()
        .title('Termo de uso')
        .content('Esse programa vem sem nenhuma garantia de bom funcionamento, somente o usúario será responsável no uso do mesmo ')
        .ok('Entendi')

  );

}]);

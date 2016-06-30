app.controller('TeController',['$scope','$mdToast', function($scope,$mdToast){

    var vm = this;
     //constantes
    vm.E_p = 200000 //Mpa
    vm.E_s = 210000 //Mpa

    vm.showToast = function (message, parentId) {
    var el = angular.element(document.getElementById(parentId));

    var toast = $mdToast.simple()
    .content(message)

    .highlightAction(true)
    .hideDelay(0)
    .position('bottom right')
    .hideDelay(5000)
    .parent(el);

    $mdToast.show(toast);
  };


    vm.evaluate = function(){

        //do usuario
        vm.caso     = $scope.caso; // caso encontrando
        vm.h        = $scope.h; //Altura total da seção
        vm.hm       = $scope.hm; //Altura da mesa
        vm.bw       = $scope.bw; //Largura da mesa
        vm.F_ck     = $scope.fck; //Fck do concreto
        vm.by       = $scope.by;   //Largura da alma
        vm.A_p      = $scope.Ap;  //Área da armadura ativa
        vm.Pn       = $scope.Pn;   //Força de protensão
        vm.A_s      = $scope.As;  //Área da armadura passiva
        vm.d_s      = $scope.ds;  //Posição da armadura passiva
        vm.d_p      = $scope.dp;  //Posição da armadura ativa
        vm.sigma_pn = $scope.sigma_pn; //Tensão de protensão


        //calcular por constantes
        vm.F_ctm = (0.3*(Math.pow(vm.F_ck,2/3)));
        $scope.fctm = (vm.F_ctm).toFixed(2) ? 0 : (vm.F_ctm).toFixed(2);

        console.log("caso "+ vm.caso + typeof(vm.caso));
        console.log("altura total " +vm.h);
        console.log("altura da mesa " +vm.hm);
        console.log("largura da mesa " +vm.bw);
        console.log("largura da alma " +vm.by);
        console.log("fck "+vm.F_ck);

        console.log("area passiva "+vm.A_p);
        console.log("força "+vm.Pn);
        console.log("area ativa "+vm.A_s);
        console.log("posição passivo "+vm.d_s);
        console.log("posição ativa "+vm.d_p);
        console.log("tensão de protensão "+vm.sigma_pn);


        vm.alpha_p = vm.E_p/(5600*(Math.pow(vm.F_ck,1/2)));
        vm.alpha_s = vm.E_s/(5600*(Math.pow(vm.F_ck,1/2)));


        switch(parseInt(vm.caso)){
            case 1:
                console.log("no caso "+ 1);
                vm.K1   = (vm.by - 0.5*vm.bw) ;
                vm.K2   = (-vm.hm*vm.by) + (vm.hm*vm.bw) + (-vm.h*vm.by) + (vm.A_p*vm.alpha_p) - vm.A_p - vm.A_s + (vm.A_s*vm.alpha_s) + (vm.Pn/vm.F_ctm);
                vm.K3   = (0.5*vm.hm*vm.by) + (vm.hm*vm.hm*vm.bw) + (0.5*vm.h*vm.h*vm.by) + (vm.A_p*vm.d_p) + (-vm.A_p*vm.alpha_p*vm.d_p) + (vm.A_s*vm.d_s) + (-vm.A_s*vm.alpha_s*vm.d_s) + (-vm.Pn/vm.F_ctm) ;

                console.log("K1: ", vm.K1);
                console.log("K2: ", vm.K2);
                console.log("K3: ", vm.K3);
                break;

            case 2:
                console.log("no caso "+ 2);
                vm.K1 = 0.5*(vm.bw-vm.by);
                vm.K2 = (vm.hm*vm.by) + (-vm.hm*vm.bw) + (vm.A_p*vm.alpha_p) - vm.A_p - vm.A_s + (vm.A_s*vm.alpha_s) + (vm.Pn/vm.F_ctm) ;
                vm.K3 = (0.5*vm.hm*vm.bw) + (0.5*vm.hm*vm.hm*vm.bw) + (0.5*vm.h*vm.h*vm.bw) + (-vm.h*vm.hm*vm.by) + (vm.alpha_p*vm.d_p) + (-vm.alpha_p*vm.A_p*vm.d_p) + (vm.alpha_s*vm.d_s) + (-vm.A_s*vm.alpha_s*vm.d_s) + (-vm.Pn/vm.F_ctm) ;

                console.log("K1: ", vm.K1);
                console.log("K2: ", vm.K2);
                console.log("K3: ", vm.K3);
                break;
        } ;

        if(vm.K1 == 0){
            //var message = "k1=0";
            //var parentId = "toast-container";
            //vm.showToast(message,parentId);
            //vm.linha_neutra = vm.K3/vm.K2;

        }else if( vm.K1 > 0 ){
            //var delta =  (vm.K2*vm.K2)-(4*vm.K1*vm.K3)
            //var message = "k1>0";
            //var parentId = "toast-container";
            //vm.showToast(message,parentId);

            console.log("K1 > 0")
            console.log("K1: ", vm.K1);
                console.log("K2: ", vm.K2);
                console.log("K3: ", vm.K3);
            var delta =  (vm.K2*vm.K2)-(4*vm.K1*vm.K3);
            console.log("delta = "+ delta);

            if( delta > 0){

            vm.X1 = (-vm.K2 + Math.pow( ((vm.K2*vm.K2)-(4*vm.K1*vm.K3)),1/2))/(2*vm.K1) ;
            vm.X2 = (-vm.K2 - Math.pow( ((vm.K2*vm.K2)-(4*vm.K1*vm.K3)),1/2))/(2*vm.K1) ;

            console.log("X1: ", vm.X1);
            console.log("X2: ", vm.X2);

            if( (vm.X1 >0) && (vm.X2<=0) ){
                vm.linha_neutra = vm.X1;
            }else if( (vm.X2 > 0) && (vm.X1 <= 0) ){
                vm.linha_neutra = vm.X2;
            }else if( (vm.X1 >0) && (vm.X2 >0)){
                if( (vm.X1 > vm.X2)){
                    vm.linha_neutra = vm.X1;
                }else{
                    vm.linha_neutra = vm.X2;
                }
            }
        }else{

            var message = "Nenhuma valor real foi encontrado,<br> Verifique seus dados";
            var parentId = "toast-container";
            vm.showToast(message,parentId);
        }
        }


        $scope.linha_neutra = (vm.linha_neutra).toFixed(2) ? 'indefinido' : (vm.linha_neutra).toFixed(2);

        //intermediarios de alavanca
        vm.X_rcc = (2*vm.linha_neutra)/3;
        vm.X_rct = (2*(vm.h-vm.linha_neutra))/3 ;

        //braço de alavanca
        vm.Z_c = vm.X_rcc + vm.X_rct;
        vm.Z_p = vm.d_p - vm.linha_neutra + vm.X_rcc;
        vm.Z_s = vm.d_s - vm.linha_neutra + vm.X_rcc;

        $scope.Z_c = (vm.Z_c).toFixed(2) ? 0 : (vm.Z_c).toFixed(2);
        $scope.Z_p = (vm.Z_p).toFixed(2) ? 0 : (vm.Z_p).toFixed(2);
        $scope.Z_s = (vm.Z_s).toFixed(2) ? 0 : (vm.Z_s).toFixed(2);

        //tensões
        //vm.sigma_c = vm.linha_neutra*vm.F_ctm/(vm.h - vm.linha_neutra);
        vm.sigma_cs = vm.F_ctm/(vm.h - vm.linha_neutra);
        vm.sigma_s = vm.F_ctm*(vm.d_s-vm.linha_neutra)*vm.alpha_s/(vm.h-vm.linha_neutra);  //(vm.alpha_s*vm.sigma_c*(vm.d_s-vm.linha_neutra))/vm.linha_neutra;
        vm.R_pt;



        //esforços
        vm.R_pt = (vm.A_p*vm.alpha_p*vm.sigma_cs*(vm.d_p-vm.linha_neutra)) + vm.A_p*vm.sigma_pn;
        vm.R_st = vm.A_s*vm.alpha_s*vm.sigma_cs*(vm.d_s-vm.linha_neutra);  //vm.linha_neutra;
        vm.R_ct = (0.5*vm.sigma_cs*(vm.h-vm.linha_neutra)*(vm.h-vm.linha_neutra)*vm.by)+(-vm.A_p*(vm.d_p-vm.linha_neutra))+(-(vm.A_s*vm.sigma_cs*(vm.d_s-vm.linha_neutra))); ///vm.linha_neutra)/2*vm.linha_neutra ;

        $scope.R_pt = (vm.R_pt).toFixed(2) ? 0 : (vm.R_pt).toFixed(2);
        $scope.R_st = (vm.R_st).toFixed(2) ? 0 : (vm.R_st).toFixed(2);
        $scope.R_ct = (vm.R_ct).toFixed(2) ? 0 : (vm.R_ct).toFixed(2);


        //momento de fissuração
        vm.M_r = vm.R_ct*vm.Z_c + vm.R_pt*vm.Z_p + vm.R_st*vm.Z_s;

        $scope.M_r = (vm.M_r/100).toFixed(2) ? 0 : (vm.M_r/100).toFixed(2);


    };
}]);

app.controller('RetangularController',['$scope', function($scope){
    var vm = this;
     //constantes
    vm.E_p = 200000 //Mpa
    vm.E_s = 210000 //Mpa

    //do usuario
    //vm.h        = 0;  //dado
   // vm.F_ck     = 0; //dado
   // vm.by       = 0;   //dado
   // vm.A_p      = 0;  //dado
   // vm.Pn       = 0;   //dado
   // vm.A_s      = 0;  //dado
   // vm.d_s      = 0;  //dado
    //vm.d_p      = 0;  //dado
    //vm.sigma_pn = 0; //dado

    //calcular por constantes
    //vm.F_ctm = $scope.fctm;
    //$scope.fctm = vm.F_ctm;

    vm.evaluate = function(){
        //do usuario

        vm.h        = $scope.h;
        vm.F_ck     = $scope.fck;
        vm.by       = $scope.by;   //dado
        vm.A_p      = $scope.Ap;  //dado
        vm.Pn       = $scope.Pn;   //dado
        vm.A_s      = $scope.As;  //dado
        vm.d_s      = $scope.ds;  //dado
        vm.d_p      = $scope.dp;  //dado
        vm.sigma_pn = $scope.sigma_pn; //dado


        //calcular por constantes
        vm.F_ctm = (0.3*(Math.pow(vm.F_ck,2/3))).toFixed(2);
        $scope.fctm = vm.F_ctm ? 0 : vm.F_ctm;


        console.log("altura " +vm.h);
        console.log(" fck "+vm.F_ck);
        console.log("largura "+vm.by);
        console.log("area passiva "+vm.A_p);
        console.log("força "+vm.Pn);
        console.log("area ativa "+vm.A_s);
        console.log("posição passivo "+vm.d_s);
        console.log("posição ativa "+vm.d_p);
        console.log("tensão de protensão "+vm.sigma_pn);


    vm.alpha_p = vm.E_p/(5600*(Math.pow(vm.F_ck,1/2)));
    vm.alpha_s = vm.E_s/(5600*(Math.pow(vm.F_ck,1/2)));

    //$scope.alpha_p = vm.alpha_p;
    //$scope.alpha_s = vm.alpha_s;

    //linha neutra
    vm.K1 = (vm.h*vm.by) + (vm.A_p*vm.alpha_p) - vm.A_p + (vm.A_s*vm.alpha_s) - vm.A_s + (vm.Pn/vm.F_ctm);
    vm.K2 = (-0.5*vm.h*vm.h*vm.by) + (vm.A_p*vm.d_p) - (vm.A_p*vm.alpha_p*vm.d_p) + (vm.A_s*vm.d_s) - (vm.A_s*vm.alpha_s*vm.d_s) - (vm.Pn*vm.h/vm.F_ctm);

    vm.linha_neutra = -vm.K2/vm.K1; //deve ser uma função a escrever

    $scope.linha_neutra = (vm.linha_neutra).toFixed(2) ? "indefinido" : (vm.linha_neutra).toFixed(2);

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

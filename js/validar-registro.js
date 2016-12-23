var app=angular.module("app", []);

app.controller("FormApp",function($scope) {
    
    $scope.registro={
        nombre:"",
        apellido_1:"",
        apellido_2:"",
        fecha_nacimiento:"",
        nif:"",
        login:"",
        passwd:""    
    };
    
    $scope.validarNombre= function() {
        
    };
    
    $scope.validarApellido_1= function() {
        
    };
    
    $scope.validarApellido_2= function() {
        
    };
    
    $scope.validarFecha= function() {
        
    };
    
    $scope.validarNIF= function() {
        
    };
    
    $scope.validarEmail= function() {
        
    };
    
    $scope.validarPassword= function() {
        
    };
    
    $scope.validarFormulario= function() {
        $scope.validarNombre();
        $scope.validarApellido_1();
        $scope.validarApellido_2();
        $scope.validarFecha();
        $scope.validarNIF();
        $scope.validarEmail();
        $scope.validarPassword();
    };
    
});
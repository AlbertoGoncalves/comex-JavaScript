
//function padrão
function conta(operador: string = '+', acumulador: number = 0 , ...numeros:any) {

    for (let numero of numeros) {
        console.log(numero);
        if(operador === '+') acumulador += parseFloat(numero);
        if(operador === '-') acumulador -= parseFloat(numero);
        if(operador === '/') acumulador /= parseFloat(numero);
        if(operador === '*') acumulador *= parseFloat(numero);
        
    }
    console.log(acumulador);
}

conta('*',2,2,2,2);


// Function expression
const conta1 = function (operador: string = '+', acumulador: number = 0 , ...numeros:any) {
    console.log(arguments);
    console.log(arguments[1]);

};
conta1('*',2,2,2,2);

const conta4 = function (...args: any) {
    console.log(args);
    console.log(args[1]);

};
conta4('*',2,2,2,2);





// Arrow functions
const conta2 = (operador: string = '+', acumulador: number = 0 , ...numeros:any) => {
    for (let numero of numeros) {
        console.log(numero);
        if(operador === '+') acumulador += parseFloat(numero);
        if(operador === '-') acumulador -= parseFloat(numero);
        if(operador === '/') acumulador /= parseFloat(numero);
        if(operador === '*') acumulador *= parseFloat(numero);
    }
    console.log(acumulador);
return acumulador;
};
conta2('*',2,2,2,2);


const conta5 = (...args:any) => {
    for (let argumen of args) {
        console.log(argumen);
    }
return args[1];
};
conta5('*',2,2,2,2);




// Exemplo de Closures função de fechamento funçã que retorna função    
function criaMultiplicador(multiplicador: number){
    return function(n:number){
        return n * multiplicador;
    };
}

const duplicar = criaMultiplicador(2);
const triplicar = criaMultiplicador(3);
const quadruplicar = criaMultiplicador(4);

console.log(duplicar(2));
console.log(triplicar(2));
console.log(quadruplicar(2));




// Escopo léxico
const nome: string = 'Teste'
console.log(nome)
function falaNome(){
    const nome:string = 'Teste2'
    console.log(nome)
};
falaNome();

function usaFalaNome(){
    const nome:string = 'Teste3'
    falaNome();
}
usaFalaNome();





// Função utilizando Callback para amaração de ordem de chamadas 
function f1(callback: any) {
    setTimeout(() => {
        console.log('f1');    
        if (callback) callback();
    }, 1000);
}

function f1Callback(){
    console.log('Teste de Callback')
}

f1(f1Callback);





// function IIFE Immediately invoked function Expression Proteção de função do escopo global não toca o mesmo 
(function(numero:number) {
    const teste:string = 'nome';
    function falaTest() {console.log(teste)};
    falaTest();
})(10);


let client: string;
let dtCambio: string;
let moedCiente: string;
let moedFretInter: string;
let moedFretRod: string;
let fretInter: number;
let fretRod: number;

// // chamada apenas como exemplo de estudo 
// conta('+',0,10,12);

let produto: string;
const vlProd = document.querySelector('#vlProd') as HTMLInputElement;
const tarefas = document.querySelector('.produtos') as HTMLUListElement;

// Coletando valores do DOM exemplo 
const valorDom = getComputedStyle(document.body);
const backgroundColor = valorDom.backgroundColor;
// console.log(backgroundColor);

// Exemplo para acionar alguma comando continuo por um periodo e para encerrar 
// iniciar sequencia 
// const timer = setInterval(() => {
// console.log('teste de tempo log');
// }, 1000);

// // Para uma sequencia 
// setTimeout(() => {
//     clearInterval(timer);
//     console.log('Para teste tempo');
// }, 3000);

// // Sequencia tipo Temporizado 
// setTimeout(() => {
//     console.log('Temporizado');
// }, 5000);


// Tipos de ventos 
// const i = addEventListener('keydown',{}); Enquanto mantiver a tecla precionada 
// const i1 = addEventListener('keyup',{}); Quando a tecla é precionada e solta 
// const i2 = addEventListener('keypress',{}); Keypress evento no precionar da tecla 
// keyCode retorna numero da tecla que foi precionado Exemplo 13 enter
// Capturando dos os eventos de click da pagina 
document.addEventListener('click', function (e) {
  const el = e.target as HTMLElement;
  // console.log(el.classList);
  if (el.classList.contains('getTaxaButton')) {
    getTaxaButton();
  };

  if (el.classList.contains('addProd')) {
    console.log('addProd');
    if (!vlProd.value) return;
    const x1 = document.getElementById('produto') as HTMLInputElement;
    produto = String(x1.value)
  
    criaTarefa(vlProd.value);

  };


});

// document.addEventListener('keyup', function (e) {
//   const el = e.target as HTMLElement;
//   console.log(el.classList);
//   console.log('keyup');

// });



async function getTaxaButton() {
  await setTaxaButton();
}

// Função para inibir envio do formulario
const form1 = document.querySelector('#form1');
form1?.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('Evendo Previnido')
});


function getCampos(e:String) {
    // console.log(e + 'teste');
    

  if(e == ('client')){
    const x1 = document.getElementById('client') as HTMLInputElement;
    client = String(x1.value)
    console.log(client);
  };

  if(e == ('dtCambio')){
    const x1 = document.getElementById('dtCambio') as HTMLInputElement;
    dtCambio = String(x1.value)
    console.log(dtCambio); 
  };
  
  if(e == ('moedCiente')){
    const x1 = document.getElementById('moedCiente') as HTMLInputElement;
    moedCiente = String(x1.value)
    console.log(moedCiente); 
  };
  
  if(e == ('moedFretInter')){
    const x1 = document.getElementById('moedFretInter') as HTMLInputElement;
    moedFretInter = String(x1.value)
    console.log(moedFretInter); 
  };
  
  if(e == ('fretInter')){
    const x1 = document.getElementById('fretInter') as HTMLInputElement;
    fretInter = Number(x1.value)
    console.log(String(fretInter)); 
  };
  
  if(e == ('moedFretRod')){
    const x1 = document.getElementById('moedFretRod') as HTMLInputElement;
    moedFretRod = String(x1.value)
    console.log(moedFretRod); 
  };
  
  if(e == ('fretRod')){
    const x1 = document.getElementById('fretRod') as HTMLInputElement;
    fretRod = Number(x1.value)
    console.log(String(fretRod)); 
  };

  // if(e == ('produto')){
  //   const x1 = document.getElementById('produto') as HTMLInputElement;
  //   produto = String(x1.value)
  //   console.log(produto); 
  // };



}




async function setTaxa(moed: string, dt: string) {
  // console.log("setTaxa")
  let result = await HttpClient.get({
    url: `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${moed}'&@dataCotacao='${`09-08-2022`}'&$top=100&$format=json&$select=cotacaoVenda,tipoBoletim`,
    method: "GET"
  }) as Ptax
  // console.log(result)

  let dol = result.value[4]
  console.log(dol)
  // console.log(String(dol.cotacaoVenda))
  // console.log(dol.tipoBoletim)

  return (dol.cotacaoVenda)
}


async function setTaxaButton() {
  let txDolar = document.getElementById('txDolar') as HTMLInputElement;
  txDolar.value = String(await setTaxa('USD', dtCambio));
  console.log(String(txDolar.value));

  let txEuro = document.getElementById('txEuro') as HTMLInputElement;
  txEuro.value = String(await setTaxa('EUR', dtCambio));
  console.log(String(txEuro.value));
}










function criaLi() {
  const li = document.createElement('li');
  return li;
}

function criaDiv() {
  const div = document.createElement('div');
  return div;
}

function criaLabel(textoInput: string) {
  const p = document.createElement('label');
  p.innerText = textoInput;
  return p;
}


function addItemProd(item: string, valor: string) {
  const div1 = criaDiv();
  div1.classList.add("form03");
  div1.appendChild(criaLabel(item))
  div1.appendChild(criaLabel(valor))
  return div1;
}


function criaTarefa(textoInput: string) {
  const li = criaLi();
  const div = criaDiv();
  div.appendChild(addItemProd("Produto",produto));
  div.appendChild(addItemProd("Valor Prod",vlProd.value));
  div.appendChild(addItemProd("Frete Rod",String(fretRod)));
  div.appendChild(addItemProd("Frete Inter",String(fretInter)));
  div.appendChild(addItemProd("Valor Export.",String(fretInter)));
  div.classList.add("tab02");
  li.appendChild(div);

  tarefas.appendChild(li);
  limpaInput();
  // criaBotaoApagar(li);
  //   salvarTarefas();
}



vlProd?.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!vlProd.value) return;
    criaTarefa(vlProd.value);
  }
});

function limpaInput() {
  vlProd.value = '';
  vlProd.focus();
}

function criaBotaoApagar(li: HTMLLIElement) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.classList.add('apagar');
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
}





// document.addEventListener('click', function(e) {
//   const el = e.target;

//   if (el.classList.contains('apagar')) {
//     el.parentElement.remove();
//     salvarTarefas();
//   }
// });

// function salvarTarefas() {
//   const liTarefas = tarefas.querySelectorAll('li') as ;
//   const listaDeTarefas = [];

//   for (let tarefa of liTarefas) {
//     let tarefaTexto = tarefa.innerText;
//     tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
//     listaDeTarefas.push(tarefaTexto);
//   }

//   const tarefasJSON = JSON.stringify(listaDeTarefas);
//   localStorage.setItem('tarefas', tarefasJSON);
// }

// function adicionaTarefasSalvas() {
//   const tarefas = localStorage.getItem('tarefas');
//   const listaDeTarefas = JSON.parse(tarefas);

//   for(let tarefa of listaDeTarefas) {
//     criaTarefa(tarefa);
//   }
// }
// adicionaTarefasSalvas();
// let apiKey: string = '3cf10e0bb2ae1e432edc5a97efa23713';
let apiKey: string = '';
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId: string;
let listname: string;
let userId: string;

let client: string;
let dtCambio: string;
let moedCiente: string;
let moedFretInter: string;
let moedFretRod: string;
let fretInter: number;
let fretRod: number;

// Função para inibir envio do formulario
const form1 = document.querySelector('#form1');
form1?.addEventListener('submit',function(e){
    e.preventDefault();
    console.log('Evendo Previnido')    
});

function getClient() {
    const x1 = document.getElementById('client') as HTMLInputElement;
    client = String (x1.value)
    console.log(client);
}

function getTaxas() {
    const x1 = document.getElementById('dtCambio') as HTMLInputElement;
    dtCambio = String (x1.value)
    console.log(dtCambio);
}

function getMoedCiente() {
    const x1 = document.getElementById('moedCiente') as HTMLInputElement;
    moedCiente = String (x1.value)
    console.log(moedCiente);
}

function getMoedFretInter() {
    const x1 = document.getElementById('moedFretInter') as HTMLInputElement;
    moedFretInter = String (x1.value)
    console.log(moedFretInter);
}
function getFretInter() {
    const x1 = document.getElementById('fretInter') as HTMLInputElement;
    fretInter = Number (x1.value)
    console.log( String(fretInter));
}

function getMoedFretRod() {
    const x1 = document.getElementById('moedFretRod') as HTMLInputElement;
    moedFretRod = String (x1.value)
    console.log(moedFretRod);
}

function getFretRod() {
    const x1 = document.getElementById('fretRod') as HTMLInputElement;
    fretRod = Number (x1.value)
    console.log( String(fretRod));

}





let getTaxaButton = document.getElementById('getTaxaButton') as HTMLInputElement
getTaxaButton.addEventListener('click', async () => {
    await setTaxaButton();
    
})




async function setTaxa(moed:string, dt:string) {
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

    return(dol.cotacaoVenda)
    
}


async function setTaxaButton() {
    let txDolar = document.getElementById('txDolar') as HTMLInputElement;
    txDolar.value = String(await setTaxa('USD',dtCambio));
    console.log( String(txDolar.value));

    let txEuro = document.getElementById('txEuro') as HTMLInputElement;
    txEuro.value = String(await setTaxa('EUR',dtCambio));
    console.log( String(txEuro.value));
}










let loginButton = document.getElementById('login-button') as HTMLInputElement

loginButton.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
    await coletarIdUser();

    
})

let ocultarLogin = function(){
    let ocultaLogin = document.getElementById('areaLogin') as HTMLInputElement
    ocultaLogin.className = ('hidden')
}

function preencherLogin() {
    let user = document.getElementById('login') as HTMLInputElement
    username = String(user.value)
    validateLoginButton();
}

function preencherSenha() {
    let senha = document.getElementById('senha') as HTMLInputElement
    password = String(senha.value)
    validateLoginButton();
}

function preencherApi() {
    let chave = document.getElementById('api-key') as HTMLInputElement
    apiKey = String(chave.value)
    validateLoginButton();
}

function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

loginButton.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
    await coletarIdUser();

    
})

async function criarRequestToken() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    }) as Token
    console.log(result)
    requestToken = result.request_token
}

async function logar() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: "POST",
        body: {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`
        }  
    })
    // console.log(result)
}

async function criarSessao() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    }) as Sessao
    if(result.success){
        console.log(result)
        sessionId = result.session_id;
        window.alert('Sessão iniciada com sucesso')
        ocultarLogin()
    }
    
}
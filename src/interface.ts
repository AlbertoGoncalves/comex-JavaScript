interface Ptax {
    value: Array<Taxa>,
}

interface Taxa {
    cotacaoVenda : string,
    tipoBoletim: string,
}


interface Produto {
    cod: String,
    quantidade: number,
    valor: number,
    pesoLiquido: number,
    pesoBruto: number,
    freTot:number,
    vlTot:number,
}

interface ItensNF{
    item: Array<Produto>,    
}
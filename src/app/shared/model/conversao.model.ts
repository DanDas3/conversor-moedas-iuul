export class ConversaoModel {
  dataConversao: Date = new Date();
  valor: number = 0;
  valorConvertido: number = 0;
  moedaOrigem: string = '';
  moedaConvertida: string = '';
  taxaCotacao: number = 0;
  altaConversao: boolean = false;

  constructor(valor: number, valorConvertido: number, moedaOrigem: string, moedaConvertida: string, taxaCotacao: number) {
    this.valor = valor;
    this.valorConvertido = valorConvertido;
    this.moedaOrigem = moedaOrigem;
    this.moedaConvertida = moedaConvertida;
    this.taxaCotacao = taxaCotacao;
  }
}

export class ConversaoModel {
  dataConversao: Date = new Date();
  valor: string = '';
  valorConvertido: string = '';
  moedaOrigem: string = '';
  moedaConvertida: string = '';
  taxaCotacao: string = '';

  constructor(valor: string, valorConvertido: string, moedaOrigem: string, moedaConvertida: string, taxaCotacao: string) {
    this.valor = valor;
    this.valorConvertido = valorConvertido;
    this.moedaOrigem = moedaOrigem;
    this.moedaConvertida = moedaConvertida;
    this.taxaCotacao = taxaCotacao;
  }
}

import random
import math
class RedeNeural():
    def __init__(self, entrada, saidaDesejada, funcaodeAticacao, calculodeSaida = 0.0, saidaNormalizada = None, saidaDesnormalizada = None,contadordeSaidas = 0.0, calculodosPesos = 0.0, dadosdeTeste = None, inputdeTeste = None, pesodoBias = random.triangular(0.10, 1.50), bias = 1, contadordeEntradas = None, input = None, peso = None, saida = 0.0, saidadaFuncao = None, taxadeAprendizado = 0.50, redecomErro = False, erro = None):
        self.saida = []
        self.funcaodeAticacao = funcaodeAticacao
        self.pesodoBias = pesodoBias
        self.bias = bias
        self.calculodosPesos = calculodosPesos
        self.calculodeSaida  = calculodeSaida 
        self.saidadaFuncao = []
        self.taxadeAprendizado = taxadeAprendizado
        self.redecomErro = redecomErro
        self.saidaDesejada = saidaDesejada
        self.dadosdeTeste = dadosdeTeste
        self.inputdeTeste = []
        self.contadordeSaidas = len(saidaDesejada)
        self.contadordeEntradas = len(entrada)
        self.contadordeNeuroniosOcultos = len(camadaOculta)
        self.saidaNormalizada = []
        self.saidaDesnormalizada = []
        self.input = []
        self.peso = []
        self.entrada = entrada

        self.contarEntradas()
        self.contarSaidas()

    def contarEntradas(self):
        for i in range(self.contadordeEntradas):
            self.input.append(self.entrada[i])
            self.inputdeTeste.append(0)

    def contarSaidas(self):
        for i in range(self.contadordeSaidas):
            self.peso.append([])
            self.saida.append(0)
            self.saidadaFuncao.append(0.0)
            for l in range(self.contadordeEntradas):
                self.peso[i].append(random.triangular(0.10, 1.50))

    def normalizarDados(self):
        for i in range(self.contadordeSaidas):
            self.saidaNormalizada.append(self.saidaDesejada[i]/self.saidaDesejada[i])

    def desnormalizarDados(self):
        for i in range(self.contadordeSaidas):
            self.saidaDesnormalizada.append(round(self.saidadaFuncao[i])*self.saidaDesejada[i])

    def backpropagation(self):
        for i in range(self.contadordeSaidas):
            for l in range(self.contadordeEntradas):
                self.calculodosPesos = self.peso[i][l] * self.taxadeAprendizado * self.input[l]
                self.peso[i].pop(l)
                self.peso[i].insert(l, self.calculodosPesos)
                while(l == self.contadordeEntradas):
                    self.pesodoBias = self.pesodoBias * self.taxadeAprendizado * bias

    def foreword(self):
        for i in range(self.contadordeSaidas):
            for l in range(self.contadordeEntradas):
                self.calculodeSaida  =+ (self.input[l] * self.peso[i][l])
                while(l==self.contadordeEntradas):
                    self.calculodeSaida  =+ self.bias * self.pesodoBias
            self.saida.pop(i)
            self.saida.insert(i, self.calculodeSaida)
            
        if(self.redecomErro == False):
            for i in range(self.contadordeSaidas):
                for l in range(self.contadordeEntradas):
                    self.calculodeSaida  =+ (self.inputdeTeste[l] * self.peso[i][l])
                self.saida.pop(i)
                self.saida.insert(i, self.calculodeSaida)
                while(i==self.contadordeEntradas):
                    self.saida =+ self.bias * self.pesodoBias
        
    def funcaodeAtivacaoDegrau(self):
        for i in range(self.contadordeSaidas):
            if(self.saida[i] <= 0.0):
                self.saidadaFuncao.pop(i)
                self.saidadaFuncao.insert(i, -1)
            elif(self.saida[i] > 0.0):
                self.saidadaFuncao.pop(i)
                self.saidadaFuncao.insert(i, 1)

    def funcaodeAtivacaoSigmoid(self):
        for i in range(self.contadordeSaidas):
            self.sigmoid = 2/(1 + 2 * self.saida[i])
            if(self.redecomErro == False):
                self.saidadaFuncao.pop(i)
                self.saidadaFuncao.insert(i, self.derivadadaSigmoid(self.sigmoid))
            self.saidadaFuncao.pop(i)
            self.saidadaFuncao.insert(i, self.derivadadaSigmoid(self.sigmoid))
    def derivadadaSigmoid(self, saida):
        return (math.pow(self.sigmoid, 2)) - 1

    def funcaodeAtivacaoRelu(self):
        for i in range(self.contadordeSaidas):
            if(self.saida[i] < 0.0):
                self.saidadaFuncao.pop(i)
                self.saidadaFuncao.insert(i, 0)
            elif(self.saida[i] >= 0.0):
                self.saidadaFuncao.pop(i)
                self.saidadaFuncao.insert(i, int(self.saida[i]))

    def calculodeErro(self):
        for i in range(self.contadordeSaidas):
            self.erro = self.saida[i] - self.saidaNormalizada[i]

    def verificacaodeErro(self):
        for i in range(self.contadordeSaidas):
            self.saidadaFuncao[i] = int(round(self.saidadaFuncao[i]))
            if(self.saidadaFuncao[i] != self.saidaNormalizada[i]):
                self.calculodeErro()
                self.backpropagation()
                self.redecomErro = True
            else:
                self.redecomErro = False
    def preparacaodaAmostra(self):
        for i in range(self.contadordeEntradas):   
            self.inputdeTeste[i] = self.dadosdeTeste[i]
    
    def testarRedeNeural(self, entradapraTeste):
        self.dadosdeTeste = entradapraTeste
        self.preparacaodaAmostra()
        self.foreword()
        if(self.funcaodeAticacao == "Degrau"):
            self.funcaodeAtivacaoDegrau()
        elif(self.funcaodeAticacao == "Relu"):
            self.funcaodeAtivacaoRelu()
        elif(self.funcaodeAticacao == "Sigmoid"):
            self.funcaodeAtivacaoSigmoid()
        self.funcaodeAtivacaoSigmoid()
        self.desnormalizarDados()
        print("Teste da rede neural:")
        print("Entradas : {}".format(entradapraTeste))
        print("Saída: {}".format(self.saidaDesnormalizada))

    def mensagensDeCalculoDuranteoTreino(self, epoca):
        print("Época: {}".format(epoca))
        print("Saída: {}".format(self.saidadaFuncao))
        print("Erro: {}".format(self.erro))
        
    def treino(self, epoca):
        self.foreword()
        if(self.funcaodeAticacao == "Degrau"):
            self.funcaodeAtivacaoDegrau()
        elif(self.funcaodeAticacao == "Relu"):
            self.funcaodeAtivacaoRelu()
        elif(self.funcaodeAticacao == "Sigmoid"):
            self.funcaodeAtivacaoSigmoid()
        self.normalizarDados()
        self.verificacaodeErro()
        self.mensagensDeCalculoDuranteoTreino(epoca)
        

entradas = [[1, 0], [1, 1], [0, 1]]
saidas = [[-1], [30, 50], [-1]]
redeNeural = RedeNeural(entradas[1], saidas[1], "Sigmoid")

for i in range(10000):
    redeNeural.treino(i+1)
    if(redeNeural.redecomErro == False):
        break

redeNeural.testarRedeNeural([1, 1])

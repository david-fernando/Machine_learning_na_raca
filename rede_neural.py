import random
class RedeNeural():
    def __init__(self, entrada, saidaDesejada, calculodeSaida = 0.0, contadordeSaidas = 0.0, calculodosPesos = 0.0, dadosdeTeste = None, inputdeTeste = None, pesodoBias = random.triangular(0.10, 1.50), bias = 1, contadordeEntradas = None, input = None, peso = None, saida = 0.0, saidadaFuncao = None, taxadeAprendizado = 0.50, redecomErro = False, erro = None):
        self.saida = []
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
        self.input = []
        self.peso = []
        for i in range(self.contadordeEntradas):
            self.input.append(entrada[i])
            self.inputdeTeste.append(0)
            
        for i in range(self.contadordeSaidas):
            self.peso.append([])
            self.saida.append(0)
            self.saidadaFuncao.append(0.0)
            for l in range(self.contadordeEntradas):
                self.peso[i].append(random.triangular(0.10, 1.50))
                #print(self.peso)
        
    def backpropagation(self):
        for i in range(self.contadordeSaidas):
            for l in range(self.contadordeEntradas):
                self.calculodosPesos = self.peso[i][l] * self.taxadeAprendizado * self.input[l]
                self.peso[i].pop(l)
                self.peso[i].insert(l, self.calculodosPesos)
                #while(l == self.contadordeEntradas):
                    #self.pesodoBias = self.pesodoBias * self.taxadeAprendizado * bias

    def foreword(self):
        for i in range(self.contadordeSaidas):
            for l in range(self.contadordeEntradas):
                self.calculodeSaida  =+ (self.input[l] * self.peso[i][l])
            self.saida.pop(i)
            self.saida.insert(i, self.calculodeSaida)
                #while(l==self.contadordeEntradas):
                    #calculodeSaida  =+ self.bias * self.pesodoBias
            
        if(self.redecomErro == False):
            for i in range(self.contadordeSaidas):
                for l in range(self.contadordeEntradas):
                    self.calculodeSaida  =+ (self.inputdeTeste[l] * self.peso[i][l])
                self.saida.pop(i)
                self.saida.insert(i, self.calculodeSaida)
                #while(i==self.contadordeEntradas):
                    #self.saida =+ self.bias * self.pesodoBias
        
    def funcaodeAtivacaoDegrau(self):
        for i in range(self.contadordeSaidas):
            if(self.saida[i] <= 0.0):
                self.saidadaFuncao.pop(i)
                self.saidadaFuncao.insert(i, -1)
            elif(self.saida[i] > 0.0):
                self.saidadaFuncao.pop(i)
                self.saidadaFuncao.insert(i, 1)

    def calculodeErro(self):
        for i in range(self.contadordeSaidas):
            self.erro = self.saida[i] - self.saidaDesejada[i]

    def verificacaodeErro(self):
        for i in range(self.contadordeSaidas):
            if(self.saidadaFuncao[i] != self.saidaDesejada[i]):
                self.calculodeErro()
                self.backpropagation()
                self.redecomErro = True
            else:
                self.redecomErro = False
    def preparacaodaAmostra(self):
        for i in range(self.contadordeEntradas):   
            self.inputdeTeste[i] = self.dadosdeTeste[i]
    
    def teste(self, entradapraTeste):
        self.dadosdeTeste = entradapraTeste
        self.preparacaodaAmostra()
        self.foreword()
        print("Teste")
        print(self.saida)
        self.funcaodeAtivacaoDegrau()
        print(self.saidadaFuncao)

    def mensagensDeCalculoDuranteoTreino(self, epoca):
        print("Época: {}".format(epoca))
        print("Saída: {}".format(self.saida))
        print("Erro: {}".format(self.erro))
        
    def treino(self,epoca):
        self.foreword()
        self.verificacaodeErro()
        self.funcaodeAtivacaoDegrau()
        self.mensagensDeCalculoDuranteoTreino(epoca)
        self.verificacaodeErro()

entradas = [[1, 0], [1, 1], [0, 1]]
saidas = [[-1], [1, 1, 1] , [-1]]
redeNeural = RedeNeural(entradas[1], saidas[1])

for i in range(10000):
    redeNeural.treino(i)
    if(redeNeural.redecomErro == False):
        break

redeNeural.teste([1, 1])
        

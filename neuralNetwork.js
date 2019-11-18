let input = [20, 10, 40, 5];
let hiddenWeight;
let weight;
let hiddenNeurons = [0, 0, 0];
let outputExpected = [4, 4];
const learningRate = 0.50;
let summation = [];
let output = [];
let normalizedInput;
let normalizedOutput;
let denormalizedInput;
let denormalizedOutput;
let denormalizedExpectedOutput;
let message;
let epochCount = 1;
const epoch = 100;
let sigmoid = [];
let outputsEquals;
function measureArrayOfWeights(){
	hiddenWeight = input.map((inputs)=>{
		return hiddenNeurons.map((arrayOfHiddenWeights) => Math.random())
	})
	weight = hiddenNeurons.map((hiddenNeurons) =>{
		return outputExpected.map((arrayOfWeights) => Math.random())
	})
}
function foreword(weight, hiddenWeight){
	hiddenLayer(hiddenWeight);
	summation = hiddenNeurons.reduce((hiddenNeurons, neuronIndex) =>{
		return outputExpected.map((hiddenNeurons, weightIndex)=>{return +(hiddenNeurons * weight[neuronIndex][weightIndex])}
			)});
} 
function hiddenLayer(hiddenWeight){
	hiddenNeurons = normalizedInput.reduce((normalizedInput, neuronIndex) =>{
		return hiddenNeurons.map((normalizedInput, weightIndex)=>{
			return +(normalizedInput * hiddenWeight[neuronIndex][weightIndex])
		}
	)});
}
function backpropagation(hiddenWeights, weights, input, hiddenNeurons, learningRate){
	hiddenWeight = hiddenWeight.map((hiddenWeight, externalIndex) =>{return hiddenWeight.map((hiddenWeight, internalIndex) => hiddenWeights[externalIndex][internalIndex] * learningRate * input[externalIndex])});
	weight = weight.map((weight, externalIndex) =>{ return weight.map((weight, internalIndex) => weights[externalIndex][internalIndex] * learningRate * hiddenNeurons[externalIndex])});
}
function normalizeData(input, outputExpected){
	normalizedInput = input.map((inputNormalization, index) =>{
		if(input[index]> 0){
			return Math.round(input[index] / Math.max(...input));
		}else{
			return 0;
		}
	});
	normalizedOutput = outputExpected.map((outputNormalization, index) => outputExpected[index] / outputExpected[index]);
}
function denormalizeData(input, normalizedInput,outputExpected, output){
	denormalizedInput = input.map((inputDenormalization, index) => input[index] * normalizedInput[index]);
	denormalizedOutput = outputExpected.map((outputDenormalization, index) => outputExpected[index] * output[index]);
	denormalizedExpectedOutput = output.map((expectedOutputDenormalization, index) => outputExpected[index] * output[index]);
}
function stepActivation(summations){
	output = summation.map((summation, outputs, index) => outputs = summations[index] <= 0 ? outputs = -1: outputs = 1); 
}
function sigmoidActivation(summation){
	sigmoid = outputExpected.map((sigmoid, index) => 1 /( 1 + Math.E ** summation[index]));
	derivedFromSigmoid(sigmoid, summation);
}
function derivedFromSigmoid(sigmoid, summation){
	output = sigmoid.map((derived, index) => parseInt(1 - sigmoid[index] * summation[index]));
	return parseInt(output);
}
function messages(){
	console.log(`Epoch ${epochCount}\nOutput:${denormalizedExpectedOutput}\nOutput expected:${outputExpected}`)
}
let outputComparison = (output, normalizedOutput)=>{
	outputsEquals  = output.every((outputs, index)=>outputs == normalizedOutput[index]);
	return outputsEquals;
}
function predict(inputs){
	normalizeData(inputs, outputExpected);
	foreword(weight, hiddenWeight);
	sigmoidActivation(summation);
	denormalizeData(inputs, normalizedInput, outputExpected, output);
	console.log(`===================\nInput:${inputs}\nPredict:${denormalizedOutput}`);
}
function training(){
	normalizeData(input, outputExpected);
	measureArrayOfWeights();
	while(epochCount < epoch){
		foreword(weight, hiddenWeight);
		backpropagation(hiddenWeight,weight, normalizedInput, hiddenNeurons, learningRate);
		sigmoidActivation(summation);
		denormalizeData(input, normalizedInput, outputExpected, output);
		outputComparison(output, normalizedOutput);
		messages();
		epochCount += 1 
		if(outputsEquals == true){
			break;
		}
	}
}
training();
predict([20, 10, 40, 5]);
let input = [20, 36, 40, 30, 0];
let hiddenWeight = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
let weight = [Math.random(), Math.random(), Math.random(), Math.random()];
let hiddenNeurons = [0, 0, 0, 0];
let hiddenValues = [];
let outputExpected = [4, 4, 5];
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
function foreword(weight, hiddenWeight){
	hiddenLayer(hiddenWeight);
	summation = hiddenNeurons.reduce((hiddenNeurons, index) =>{
		return outputExpected.map((hiddenNeurons)=>{return +(hiddenNeurons * weight[index])}
			)});
}
function hiddenLayer(hiddenWeight){
	hiddenNeurons = normalizedInput.reduce((normalizedInput, index) =>{
		return hiddenNeurons.map((normalizedInput)=>{
			return +(normalizedInput * hiddenWeight[index])
		}
	)});
}
function backpropagation(hiddenWeights, weights, input, hiddenNeurons, learningRate){
	hiddenWeight = hiddenWeight.map((hiddenWeight, index) =>hiddenWeights[index] * learningRate * input[index]);
	weight = weight.map((weight, index) =>weights[index] * learningRate * hiddenNeurons[index]);
}
function normalizeData(input, outputExpected){
	normalizedInput = input.map((inputNormalization, index) =>{
		if(input[index]> 0){
			return input[index] / input[index]
		}else{
			return 1;
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
function training(){
	normalizeData(input, outputExpected);
	while(epochCount < epoch){
		foreword(weight, hiddenWeight);
		backpropagation(hiddenWeight, weight, normalizedInput, hiddenNeurons, learningRate);
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

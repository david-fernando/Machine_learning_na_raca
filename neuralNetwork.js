let input = [20, 36, 40, 30, 0];
let weight = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
let outputExpected = [4];
const learningRate = 0.50;
let summation = [];
let output = [];
let normalizedInput;
let normalizedOutput;
let denormalizedInput;
let denormalizedOutput;
let denormalizedExpectedOutput;
let message;
let time = 1;
const timeMaximum = 10;
let sigmoid = [];
function foreword(weight){
	summation = normalizedInput.reduce((normalizedInput, index) =>+(normalizedInput * weight[index]));
}
function backpropagation(weights, input, learningRate){
	weight = weight.map((weight, index) =>weights[index] * learningRate * input[index]);
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
	sigmoid = outputExpected.map((sigmoid) => 1 /( 1 + Math.pow(Math.E, summation)));
	derivedFromSigmoid(sigmoid, summation);
}
function derivedFromSigmoid(sigmoid, summation){
	output = sigmoid.map((derived) => parseInt(1 - sigmoid * summation));
	return output;
}
function messages(){
	console.log(`Time ${time}\nOutput:${denormalizedExpectedOutput}\nSummation:${summation}\nOutput expected:${outputExpected}`)
}
function training(){
	normalizeData(input, outputExpected);
	while(parseInt(output) != normalizedOutput || time < timeMaximum){
		foreword(weight);
		backpropagation(weight, normalizedInput, learningRate);
		sigmoidActivation(summation);
		denormalizeData(input, normalizedInput, outputExpected, output);
		messages();
		time += 1 
	}
}
training();
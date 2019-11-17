let input = [20, 36, 40, 30, 0];
let weight = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
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
let time = 1;
const timeMaximum = 100;
let sigmoid = [];
let outputsEquals;
function foreword(weight){
	summation = normalizedInput.reduce((normalizedInput, index) =>{
		return outputExpected.map((normalizedInput)=>{return +(normalizedInput * weight[index])}
			)});
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
	sigmoid = outputExpected.map((sigmoid, index) => 1 /( 1 + Math.pow(Math.E, summation[index])));
	derivedFromSigmoid(sigmoid, summation);
}
function derivedFromSigmoid(sigmoid, summation){
	output = sigmoid.map((derived, index) => parseInt(1 - sigmoid[index] * summation[index]));
	return parseInt(output);
}
function messages(){
	console.log(`Time ${time}\nOutput:${denormalizedExpectedOutput}\nOutput expected:${outputExpected}`)
}
let outputComparison = (output, normalizedOutput)=>{
	outputsEquals  = output.every((outputs, index)=>outputs == normalizedOutput[index]);
	return outputsEquals;
}
function training(){
	normalizeData(input, outputExpected);
	while(time < timeMaximum){
		foreword(weight);
		backpropagation(weight, normalizedInput, learningRate);
		sigmoidActivation(summation);
		denormalizeData(input, normalizedInput, outputExpected, output);
		outputComparison(output, normalizedOutput);
		messages();
		time += 1 
		if(outputsEquals == true){
			break;
		}
	}
}
training();
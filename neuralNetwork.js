let input = [1, 1];
let weight = [Math.random(), Math.random()];
let outputExpected = [1.0];
const learningRate = 0.50;
let summation = [];
let output = [];
let message;
let time = 1;
const timeMaximum = 10;
let sigmoid = [];
function foreword(input, weight){
	summation = outputExpected.map((index,summation) =>+(input[index] * weight[index]));
}
function backpropagation(weights, input, learningRate){
	weight = weight.map((weight, index) =>weights[index] * learningRate * input[index]);
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
}
function messages(){
	console.log(`Time ${time}\nOutput:${output}\nSomatória:${summation}\nOutput expected:${outputExpected}`)
}
function training(){
	while(time < timeMaximum || parseInt(output) != outputExpected){
		foreword(input, weight);
		backpropagation(weight, input, learningRate);
		sigmoidActivation(summation);
		messages();
		time += 1 
	}
}
training();
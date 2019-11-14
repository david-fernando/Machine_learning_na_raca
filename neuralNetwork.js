let input = [1, 0, 1];
let weight = [Math.random(), Math.random(), Math.random()];
let outputExpected = [1, 0, 1];
const learningRate = 0.5;
let summation;
let output = [];
let message;
let time = 1;
const timeMaximum = 200;
let sigmoid = [0,0,0];
function foreword(){
	summation = input.map((input, weight) => summation=+(input *  weight));
}
function backpropagation(){
	weight = weight.map((weight, input) => weight * learningRate * input);
}
function stepActivation(){
	output = summation.map((output, summation) => output = summation <= 0 ? output = -1: output = 1); 
}
function sigmoidActivation(){
	sigmoid = sigmoid.map((sigmoid, summation) => 1 /( 1 + Math.pow(Math.E, summation)))
	derivedFromSigmoid();
}
function derivedFromSigmoid(){
	output = sigmoid.map((sigmoid, summation) => parseInt(1 - sigmoid * summation));
}
function messages(){
	console.log(`Time ${time}\nOutput:${output}\nOutput expected:${outputExpected}`)
}
function training(){
	while(time < timeMaximum){
		foreword();
		backpropagation();
		sigmoidActivation();
		messages();
		time += 1 
	}
}
training();
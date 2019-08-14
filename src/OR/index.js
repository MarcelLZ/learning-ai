const { dot } = require("numjs");

/**
 * Creating an AI to learn OR (||) comparison.
 *
 * Function: Step Function
 * 1 = enabled
 * 0 = not enabled
 */

// Inputs
const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];

// Answers
const answers = [0, 1, 1, 1];

// Weights
let weights = [0, 0];

// Used to increase weights.
const LEARNING_RATE = 0.1;

// Return the dot product
function calculate(input, weights) {
  const result = dot(input, weights);
  return stepFunction(result.tolist()[0]);
}

// Activation function
function stepFunction(value) {
  return value >= 1 ? 1 : 0;
}

// Train NN!!
function train() {
  let totalError = 1;
  while (totalError !== 0) {
    totalError = 0;

    for (let a = 0; a < answers.length; a++) {
      const output = calculate(inputs[a], weights);
      const error = answers[a] - output;
      totalError += error;

      console.log();
      console.log("--- WEIGHTS ---");
      for (let w = 0; w < weights.length; w++) {
        weights[w] = weights[w] + LEARNING_RATE * inputs[a][w] * error;
        console.log("W" + w + ":", weights[w]);
      }
      console.log("--- / ---");
    }
  }

  console.log("Ajusted weights:", weights);
}

// Running!
train();

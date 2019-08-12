const { dot } = require("numjs");

/**
 * Creating an AI to learn E (&&) comparison.
 * Function: Step Function
 *
 * 1 = enabled
 * 0 = not enabled
 */

// Inputs
const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];

// Answers
const answers = [0, 0, 0, 1];

// Weights
let weights = [0.0, 0.0];

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
function train(inputs, weights, answers, totalError) {
  if (totalError !== 0) {
    const brainData = answers.reduce((data, answer, a) => {
      const output = calculate(inputs[a], weights);
      const error = answer - output;

      // To ajust weights
      const newWeights = weights.map((weight, w) => {
        return weight + LEARNING_RATE * inputs[a][w] * error;
      });

      return {
        totalErrors: (data.totalErrors || 0) + error,
        weights: newWeights
      };
    }, {});

    train(inputs, brainData.weights, answers, brainData.totalErrors);
  } else {
    console.log("Ajusted weights:", weights);
  }
}

// Running!
const initialErrorRate = 1;
train(inputs, weights, answers, initialErrorRate);

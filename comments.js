// function addName() {
//   let amount = document.getElementById("player_amount").value;

//   document.getElementById("name_inputs").style = "display: flex";

//   for (let i = 0; i < amount; i++) {
//     let o = document.createElement("input");
//     document.getElementById("name_inputs").appendChild(o);
//     o.className = "name_input";
//   }

//   document.getElementById("name_add").addEventListener("click", addPlayer);
// }

// function addPlayer() {
//   let amount = document.getElementById("player_amount").value;

//   document.getElementById("name_inputs").style = "display: none";

//   for (let i = 0; i < amount; i++) {
//     Array.from(document.getElementsByClassName("points_row")).forEach(
//       (e, index) => {
//         let div = document.createElement("div");
//         if (index == 0) {
//           e.appendChild(div);
//           div.innerHTML = Array.from(
//             document.getElementsByClassName("name_input")
//           )[i].value;
//           if (i == amount - 1) div.id = "turn";
//         } else e.appendChild(div), (div.innerHTML = 0);
//       }
//     );
//   }
//   turn();
// }

// let fitness = 0;
// POPULATION.forEach((pop) => {
//   fitness += pop.avgFitness;
// });
// fitness = fitness / 200;
// fitness = fitness / 100;
// fitness = Math.pow(fitness, 1 / 4);
// fitness *= 374;
// document.getElementById("fitness").innerHTML += fitness.toFixed(2) + " ";






// inputs.forEach((neuron, i) => neuron.activate(input[i]));
// hiddens.forEach((neuron) => neuron.activate());
// return outputs.map((neuron) => neuron.activate());

// const multiplyMatrixOne = gpu.createKernel(function (a, b, c) {
//     let sum = 0;
//     for (let i = 0; i < 20; i++) {
//       sum += a[i] * b[i][this.thread.x];
//     }
//     sum += c[this.thread.x]
//     return sum;
//   }, {
//     output: [20]
//   });
//   const multiplyMatrixTwo = gpu.createKernel(function (a, b, c) {
//     let sum = 0;
//     for (let i = 0; i < 61; i++) {
//       sum += a[i] * b[i][this.thread.x];
//     }
//     sum += c[this.thread.x]
//     return sum;
//   }, {
//     output: [61]
//   });

//   const gpu = new GPU();

// let matrixA = []
// let matrixB = []
// let matrixC = []

// inputs.forEach((neuron, index) => {
//   matrixA.push(input[index])

//   matrixB[index] = Object.keys(neuron.outgoing.weights).map((t) => {
//     return neuron.outgoing.weights[t]
//   })
// })
// hiddens.forEach((neuron) => matrixC.push(neuron.bias))

// let c = multiplyMatrixOne(matrixA, matrixB, matrixC);
// c = c.map(v => {
//   return sigmoid(v)
// })

// matrixA = []
// matrixB = []
// matrixC = []

// hiddens.forEach((neuron, index) => {
//   matrixA.push(c[index])
//   matrixB[index] = Object.keys(neuron.outgoing.weights).map((t) => {
//     return neuron.outgoing.weights[t]
//   })
// })
// outputs.forEach((neuron) => matrixC.push(neuron.bias))

// let d = multiplyMatrixTwo(matrixA, matrixB, matrixC);
// d = d.map(v => {
//   return sigmoid(v)
// })

// outputs.forEach((neuron,i) => neuron.output = d[i])
// new turn function
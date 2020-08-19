import {
  Neuron
} from "./neuron.js";

import {
  DNA
} from "./DNA.js";

window.onload = function () {
  // global variables
  let DICE = [{
      value: parseInt(Math.random() * 6 + 1),
      marked: false,
    },
    {
      value: parseInt(Math.random() * 6 + 1),
      marked: false,
    },
    {
      value: parseInt(Math.random() * 6 + 1),
      marked: false,
    },
    {
      value: parseInt(Math.random() * 6 + 1),
      marked: false,
    },
    {
      value: parseInt(Math.random() * 6 + 1),
      marked: false,
    },
  ];
  let SCORE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let ROLLS = 0;
  let inputArray = [];
  let success = false;
  let isGameOver = false;
  let currentDNA = [];
  const MutationRate = 0.02;

  // game rules
  
  const errorMsg = (msg) => {
    let error = document.getElementById("error_msg");
    error.style = "display:block";
    error.innerHTML = msg;
    setTimeout(() => {
      error.style = "display:none";
    }, 2000);
  }

  // checks aces
  const aces = () => {
    // console.log("aces pressed");
    if (
      !DICE.find((d) => {
        return d.value == 1;
      })
    ) {
      // errorMsg("sorry, pal")
      return;
    } else {
      success = true;
      DICE.forEach((d) => {
        if (d.value == 1) SCORE[0] += d.value;
      });
      turn();
      sum();
      displayScore();
      document.getElementById("aces").removeEventListener("click", aces);
    }
  };

  // checks twos
  const twos = () => {
    // console.log("twos pressed");
    if (
      !DICE.find((d) => {
        return d.value == 2;
      })
    ) {
      // errorMsg("sorry, pal")
      return;
    } else {
      success = true;
      DICE.forEach((d) => {
        if (d.value == 2) SCORE[1] += d.value;
      });
      turn();
      sum();
      displayScore();
      document.getElementById("twos").removeEventListener("click", twos);
    }
  };

  // checks threes
  const threes = () => {
    // console.log("threes pressed");
    if (
      !DICE.find((d) => {
        return d.value == 3;
      })
    ) {
      // errorMsg("sorry, pal")
      return;
    } else {
      success = true;
      DICE.forEach((d) => {
        if (d.value == 3) SCORE[2] += d.value;
      });
      turn();
      sum();
      displayScore();
      document.getElementById("threes").removeEventListener("click", threes);
    }
  };

  // checks fours
  const fours = () => {
    // console.log("fours pressed");
    if (
      !DICE.find((d) => {
        return d.value == 4;
      })
    ) {
      // errorMsg("sorry, pal")
      return;
    } else {
      success = true;
      DICE.forEach((d) => {
        if (d.value == 4) SCORE[3] += d.value;
      });
      turn();
      sum();
      displayScore();
      document.getElementById("fours").removeEventListener("click", fours);
    }
  };

  // checks fives
  const fives = () => {
    // console.log("fives pressed");
    if (
      !DICE.find((d) => {
        return d.value == 5;
      })
    ) {
      // errorMsg("sorry, pal")
      return;
    } else {
      success = true;
      DICE.forEach((d) => {
        if (d.value == 5) SCORE[4] += d.value;
      });
      turn();
      sum();
      displayScore();
      document.getElementById("fives").removeEventListener("click", fives);
    }
  };

  // checks sixes
  const sixes = () => {
    // console.log("sixes pressed");
    if (
      !DICE.find((d) => {
        return d.value == 6;
      })
    ) {
      // errorMsg("sorry, pal")
      return;
    } else {
      success = true;
      DICE.forEach((d) => {
        if (d.value == 6) SCORE[5] += d.value;
      });
      turn();
      sum();
      displayScore();
      document.getElementById("sixes").removeEventListener("click", sixes);
    }
  };

  // checks par
  const par = () => {
    // console.log("par pressed");
    let parFound = 0;
    DICE.forEach((d, i, a) => {
      for (let o = i; o < a.length - 1; o++) {
        if (d.value == a[o + 1].value && d.value + a[o + 1].value > parFound)
          parFound = d.value + a[o + 1].value;
      }
    });
    if (parFound == 0) {
      // errorMsg("sorry, pal")
      return;
    } else {
      success = true;
      SCORE[8] = parFound;
      turn();
      sum();
      displayScore();
      document.getElementById("par").removeEventListener("click", par);
    }
  };

  // checks twopar
  const twopar = () => {
    // consoleconsole.log("twopar pressed");
    let twoparFound = [];
    DICE.forEach((d, i, a) => {
      for (let o = i; o < a.length - 1; o++) {
        if (d.value == a[o + 1].value && twoparFound[0] != d.value)
          twoparFound.push(d.value);
      }
    });
    if (twoparFound.length < 2) {
      // errorMsg("sorry, pal")
      return;
    } else {
      success = true;
      SCORE[9] = twoparFound[0] * 2 + twoparFound[1] * 2;
      turn();
      sum();
      displayScore();
      document.getElementById("twopar").removeEventListener("click", twopar);
    }
  };

  // checks threeofakind
  const threeofakind = () => {
    // consoleconsole.log("threeofakind pressed");
    let threeofakindFound = 0;
    DICE.forEach((d, i, a) => {
      for (let o = i; o < a.length - 1; o++) {
        if (d.value == a[o + 1].value) {
          for (let j = o; j < a.length - 2; j++) {
            if (d.value == a[j + 2].value) threeofakindFound = d.value * 3;
          }
        }
      }
    });
    if (threeofakindFound == 0) {
      // errorMsg("sorry, pal")
      return;
    } else {
      success = true;
      SCORE[10] = threeofakindFound;
      turn();
      sum();
      displayScore();
      document
        .getElementById("threeofakind")
        .removeEventListener("click", threeofakind);
    }
  };

  // checks fourofakind
  const fourofakind = () => {
    let fourofakindFound = 0;
    let matchesFound = [];
    DICE.forEach((d, i, a) => {
      matchesFound = [d.value];
      for (let o = i; o < a.length - 1; o++) {
        if (d.value == a[o + 1].value) matchesFound.push(d.value);
        if (matchesFound.length == 4) fourofakindFound = d.value * 4;
      }
    });
    if (fourofakindFound == 0) {
      // errorMsg("sorry, pal")
      return;
    } else {
      success = true;
      SCORE[11] = fourofakindFound;
      turn();
      sum();
      displayScore();
      document
        .getElementById("fourofakind")
        .removeEventListener("click", fourofakind);
    }
  };

  // check fullhouse
  const fullhouse = () => {
    // console console.log("fullhouse pressed");
    let parFound = 0;
    let threeofakindFound = 0;

    DICE.forEach((d, i, a) => {
      for (let o = i; o < a.length - 1; o++) {
        if (d.value == a[o + 1].value) {
          for (let j = o; j < a.length - 2; j++) {
            if (d.value == a[j + 2].value) threeofakindFound = d.value * 3;
          }
        }
      }
    });

    if (threeofakindFound != 0) {
      DICE.forEach((d, i, a) => {
        if (threeofakindFound / 3 == d.value) return;
        for (let o = i; o < a.length - 1; o++) {
          if (d.value == a[o + 1].value) parFound = a[o + 1].value + d.value;
        }
      });
    }
    if (parFound == 0) {
      // errorMsg("sorry, pal")

      return;
    } else {
      success = true;
      SCORE[12] = parFound + threeofakindFound;
      turn();
      sum();
      displayScore();
      document
        .getElementById("fullhouse")
        .removeEventListener("click", fullhouse);
    }
  };

  // checks small
  const small = () => {
    // consoleconsole.log("small pressed");
    let smallFound = 0;
    let DICECopy = [];
    DICE.forEach((d) => {
      DICECopy.push(d.value);
    });
    DICECopy.sort((a, b) => {
      return a - b;
    });
    for (let i = 0; i < DICECopy.length; i++) {
      if (DICECopy[i] == i + 1) smallFound += DICECopy[i];
    }
    if (smallFound != 15) {
     // errorMsg("sorry, pal")

      return;
    } else {
      success = true;
      SCORE[13] = smallFound;
      turn();
      sum();
      displayScore();
      document.getElementById("small").removeEventListener("click", small);
    }
  };

  // checks large
  const large = () => {
    // consoleconsole.log("large pressed");
    let largeFound = 0;
    let DICECopy = [];
    DICE.forEach((d) => {
      DICECopy.push(d.value);
    });
    DICECopy.sort((a, b) => {
      return a - b;
    });
    for (let i = 0; i < DICECopy.length; i++) {
      if (DICECopy[i] == i + 2) largeFound += DICECopy[i];
    }
    if (largeFound != 20) {
     // errorMsg("sorry, pal")

      return;
    } else {
      success = true;
      SCORE[14] = largeFound;
      turn();
      sum();
      displayScore();
      document.getElementById("large").removeEventListener("click", large);
    }
  };

  // checks chance
  const chance = () => {
    // console.log("chance pressed");
    DICE.forEach((d) => {
      SCORE[15] += d.value;
    });
    turn();
    sum();
    displayScore();
    document.getElementById("chance").removeEventListener("click", chance);
  };

  // checks yatzy
  const yatzy = () => {
    // console.log("yatzy pressed")
    let yatzyFound = 50;
    for (let i = 0; i < DICE.length; i++) {
      if (DICE[0].value != DICE[i].value) yatzyFound = 0;
    }

    if (yatzyFound == 0) {
      // errorMsg("sorry, pal")

      return;
    } else {
      success = true;
      SCORE[16] = 50;
      turn();
      sum();
      displayScore();
      document.getElementById("yatzy").removeEventListener("click", yatzy);
    }
  };

  // array with all the scoring functions and the html id associated with it
  const scoreFunctionNames = [{
      name: "aces",
      function: aces,
    },
    {
      name: "twos",
      function: twos,
    },
    {
      name: "threes",
      function: threes,
    },
    {
      name: "fours",
      function: fours,
    },
    {
      name: "fives",
      function: fives,
    },
    {
      name: "sixes",
      function: sixes,
    },
    {
      name: "par",
      function: par,
    },
    {
      name: "twopar",
      function: twopar,
    },
    {
      name: "threeofakind",
      function: threeofakind,
    },
    {
      name: "fourofakind",
      function: fourofakind,
    },
    {
      name: "fullhouse",
      function: fullhouse,
    },
    {
      name: "small",
      function: small,
    },
    {
      name: "large",
      function: large,
    },
    {
      name: "chance",
      function: chance,
    },
    {
      name: "yatzy",
      function: yatzy,
    },
  ];

  // checks if gameover, clear marked die, sets roll to 0, and roll new DICE
  const turn = () => {
    clearMarked();
    ROLLS = 0;
    document.getElementById("rolls").innerHTML = ROLLS + "/2";

    DICE.forEach((die) => {
      die.value = parseInt(Math.random() * 6 + 1);
    });
    displayDice();
  };

  // ROLLS all the unmarked DICE
  const roll = () => {
    // console.log("roll pressed")
    if (ROLLS == 2) {
      clearMarked();

      return;
    }
    DICE.forEach((die) => {
      if (die.marked) return;
      die.value = parseInt(Math.random() * 6 + 1);
    });
    ROLLS++;
    document.getElementById("rolls").innerHTML = ROLLS + "/2";
    success = true;
    clearMarked();
    displayDice();
  };

  // checks if the SCORE array contains any zeros and ends game if not
  const gameOver = () => {
    let o = SCORE.map((s, i) => {
      if ((i != 6 || i != 7 || i != 17) && s != 0) return true;
      else if ((i == 6 || i == 7 || i == 17) && s >= 0) return true;
      else return false;
    });

    if (o.every((e) => e == true)) {
      isGameOver = true;

      currentDNA.fitness.push(SCORE[SCORE.length - 1]);
      // document.getElementById("fitness").innerHTML += SCORE[SCORE.length - 1] + " ";
    }
  };

  // resets all the values
  const reset = () => {
    DICE = [{
        value: parseInt(Math.random() * 6 + 1),
        marked: false,
      },
      {
        value: parseInt(Math.random() * 6 + 1),
        marked: false,
      },
      {
        value: parseInt(Math.random() * 6 + 1),
        marked: false,
      },
      {
        value: parseInt(Math.random() * 6 + 1),
        marked: false,
      },
      {
        value: parseInt(Math.random() * 6 + 1),
        marked: false,
      },
    ];
    SCORE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    ROLLS = 0;
    inputArray = [];
    success = false;
    inputArray = [];
    displayDice();
    displayScore();
    setUpEventListeners(false);
    updateInputArray();
    isGameOver = false;
  };

  // prints the values from the SCORE array on screen
  const displayScore = () => {
    for (
      let i = 0; i < Array.from(document.getElementById("points").children).length - 1; i++
    ) {
      document.getElementById("points").children[i + 1].children[1].innerHTML =
        SCORE[i];
    }
  };

  // prints the values from the DICE array on screen
  const displayDice = () => {
    for (let i = 0; i < 5; i++) {
      document.getElementById("die" + (i + 1)).innerHTML = DICE[i].value;
    }
  };

  // calculates the bonus and total sum
  const sum = () => {
    SCORE[6] = 0;
    SCORE[SCORE.length - 1] = 0;
    SCORE.forEach((s, i, a) => {
      if (i < a.length - 1 && i != 6 && s != "/") a[a.length - 1] += s;
      if (i < 6 && s != "/") a[6] += s;
      if (a[6] > 63) a[7] = 50;
    });
  };

  // marks or unmarks die
  const marked = (d) => {
    if (DICE[d.id.slice(-1) - 1].marked) {
      DICE[d.id.slice(-1) - 1].marked = false;
      d.className = "die";
    } else {
      DICE[d.id.slice(-1) - 1].marked = true;
      d.className = "die marked";
    }
  };

  // clear all marked DICE
  const clearMarked = () => {
    DICE.forEach((d) => {
      d.marked = false;
    });
    Array.from(document.getElementsByClassName("die")).forEach((d) => {
      d.className = "die";
    });
  };

  // sets up eventlistener for rolling, marking DICE, crossing and scoring
  const setUpEventListeners = (isSetup) => {
    scoreFunctionNames.forEach((t, i) => {
      document.getElementById(t.name).addEventListener("click", t.function);
      if (isSetup) {
        Array.from(document.getElementsByClassName("cross"))[
          i
        ].addEventListener("click", () => {
          if (SCORE[i < 6 ? i : i + 2] == 0) {
            success = true;
            document
              .getElementById(t.name)
              .removeEventListener("click", t.function);
            SCORE[i < 6 ? i : i + 2] = "/";
            displayScore();
            turn();
          }
        });
      }
    });

    if (isSetup) {
      document.getElementById("roll").addEventListener("click", roll);
      Array.from(document.getElementsByClassName("die")).forEach((d) =>
        d.addEventListener("click", () => marked(d))
      );
    }
  };

  // neural network

  // adds Neurons to inputsArray
  const setUpInputs = () => {
    let tempInputs = [];
    for (let i = 0; i < 24; i++) {
      tempInputs.push(new Neuron(i));
    }
    return tempInputs;
  };

  // adds Neurons to hiddensArray
  const setUpHiddens = () => {
    let tempHiddens = [];
    for (let i = 24; i < 44; i++) {
      tempHiddens.push(new Neuron(i));
    }
    return tempHiddens;
  };

  // adds Neurons to outputsArray
  const setUpOutputs = () => {
    let tempOutputs = [];
    for (let i = 44; i < 105; i++) {
      tempOutputs.push(new Neuron(i));
    }
    return tempOutputs;
  };

  // connects the layers to eachother
  const connect = (inputs, hiddens, outputs, currentDNA) => {
    let o = currentDNA.DNA.map((x) => x);
    inputs.forEach((input) => {
      hiddens.forEach((hidden) => input.connect(hidden, o.shift()));
    });
    hiddens.forEach((hidden) => {
      outputs.forEach(
        (output) => hidden.connect(output, o.shift()),
        hidden.setBias(o.shift())
      );
    });
    outputs.forEach((output) => output.setBias(o.shift()));
  };

  // calls the activate function on each neuron
  // calculates the neurons output
  const activate = (input) => {
    inputs.forEach((neuron, i) => neuron.activate(input[i]));
    hiddens.forEach((neuron) => neuron.activate());
    return outputs.map((neuron) => neuron.activate());
  };

  // squish the value of each SCORE to be between 0-1
  const squish = (VALUE, MAX) => {
    if (VALUE == "/") return 0;
    else return (VALUE + 1) / (MAX + 1);
  };

  // takes the scores, ROLLS and DICE values and updates an array
  const updateInputArray = () => {
    DICE.forEach((d) => inputArray.push((d.value - 1) / 5));
    inputArray.push(ROLLS / 2);
    inputArray.push(squish(SCORE[0], 5));
    inputArray.push(squish(SCORE[1], 10));
    inputArray.push(squish(SCORE[2], 15));
    inputArray.push(squish(SCORE[3], 20));
    inputArray.push(squish(SCORE[4], 25));
    inputArray.push(squish(SCORE[5], 30));
    inputArray.push(squish(SCORE[6], 105));
    inputArray.push(squish(SCORE[7], 50));
    inputArray.push(squish(SCORE[8], 12));
    inputArray.push(squish(SCORE[9], 22));
    inputArray.push(squish(SCORE[10], 18));
    inputArray.push(squish(SCORE[11], 24));
    inputArray.push(squish(SCORE[12], 15));
    inputArray.push(squish(SCORE[13], 20));
    inputArray.push(squish(SCORE[14], 28));
    inputArray.push(squish(SCORE[15], 30));
    inputArray.push(squish(SCORE[16], 60));
    inputArray.push(squish(SCORE[17], 374));
  };

  // takes the index of the highest output and executes an action
  const action = (i) => {
    if (i < 15) {
      Array.from(document.getElementsByClassName("cross"))[i].click();
    } else if (i > 14 && i < 21) {
      Array.from(document.getElementsByClassName("points_row"))[i - 14].click();
    } else if (i > 20 && i < 30) {
      Array.from(document.getElementsByClassName("points_row"))[i - 12].click();
    } else if (i > 29) {
      let binary = (i - 30).toString(2).split("");
      while (binary.length < 5) {
        binary.unshift("0");
      }
      binary.forEach((b, i) => {
        if (b == "1")
          document.getElementById("die" + (1 + i)).className = "die marked";
      });
      document.getElementById("roll").click();
    }
  };

  // DNA
  const populate = (n) => {
    let tempPop = [];
    for (let i = 0; i < n; i++) {
      tempPop.push(new DNA());
    }
    return tempPop;
  };

  let POPULATION = populate(100);

  currentDNA = POPULATION[0];

  const inputs = setUpInputs();
  const hiddens = setUpHiddens();
  const outputs = setUpOutputs();

  const setUp = () => {
    setUpEventListeners(true);
    connect(inputs, hiddens, outputs, currentDNA);
    updateInputArray();
    activate(inputArray);
    displayDice();
    displayScore();
  };

  const gameLoop = () => {
    while (!isGameOver) {
      success = false;

      function bestOption() {
        let outputArray = outputs.map((o, i) => {
          return {
            value: o.output,
            index: i,
          };
        });
        return outputArray.sort((a, b) => b.value - a.value);
      }
      function performAction(outputArray) {
        for (let i = 0; i < outputArray.length; i++) {
          action(outputArray[i].index);
          if (success) return;
        }
      }

      performAction(bestOption());
      updateInputArray();
      activate(inputArray);
      gameOver();
    }
  };

  const mutation = (DNA) => {
    DNA.forEach((d) => {
      if (Math.random() < MutationRate)
        d = parseFloat((Math.random() * 10 - 5).toFixed(2));
    });
    return DNA;
  };

  const crossing = (parentA, parentB) => {
    let child = [];

    for (let i = 0; i < parentA.length; i++) {
      i % 2 == 0 ? child.push(parentA[i]) : child.push(parentB[i]);
    }

    return child;
  };

  const mating = (POPULATION) => {
    let test = [];
    let othertest = [];
    let thing = 0;

    let bestFitness = POPULATION.map((p) => p);
    bestFitness = bestFitness.sort((a, b) => {
      return b.avgFitness - a.avgFitness;
    });

    POPULATION.forEach((element) => {
      thing += element.avgFitness;
    });

    for (let j = 0; j < POPULATION.length; j++) {
      let r = Math.random() * thing;
      bestFitness.every((pop, index, array) => {
        let accumulated = 0;
        for (let i = 0; i < index; i++) {
          accumulated += array[i].avgFitness;
        }
        if (accumulated + pop.avgFitness > r) {
          test.push(pop);
          return false;
        } else return true;
      });
    }

    test.forEach((pop, index, array) => {
      othertest.push(
        crossing(pop.DNA, array[index + 1 < array.length ? index + 1 : 0].DNA)
      );
    });

    othertest.forEach((dna) => mutation(dna));

    othertest.forEach((value, index) => {
      POPULATION[index].DNA = value;
    });
    return POPULATION;
  };

  const training = (epoch) => {
    // looping through the DNA's in the POPULATION
    for (let i = 0; i < POPULATION.length; i++) {
      currentDNA = POPULATION[i];
      connect(inputs, hiddens, outputs, currentDNA);
      // one DNA plays 10 games to get average fitness
      for (let j = 0; j < 10; j++) {
        gameLoop();
        reset();
        currentDNA.calcAvgFitness();
      }
    }

    mating(POPULATION);

    epoch--;
    if (epoch == 0) {
      findBest(POPULATION)
      return;
    }
    setTimeout(() => {
      training(epoch);
    }, 200);
  };

  const findBest = (array) => {
    array.sort((a, b) => b.avgFitness - a.avgFitness)
    for (let i = 0; i < 10; i++) {
      console.log(JSON.stringify(array[i]))
    }
  }

  setUp();
  training(10);
};
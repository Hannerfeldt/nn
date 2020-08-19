export class Neuron {
  constructor(id) {
    this.id = id
    this.bias

    this.incoming = {
      neurons: {},
      weights: {}
    }

    this.outgoing = {
      neurons: {},
      weights: {}
    }

    this.output

    this.connect = (neuron, weight) => {
      this.outgoing.neurons[neuron.id] = neuron
      neuron.incoming.neurons[this.id] = this
      this.outgoing.weights[neuron.id] = neuron.incoming.weights[this.id] = weight
    }


    this.setBias = (bias) => {
      this.bias = bias
    }

    this.activate = (input) => {
      const self = this

      function sigmoid(x) {
        return 1 / (1 + Math.exp(-x))
      }

      if (input >= 0) {
        this._output = 1
        this.output = input
      } else {


        const sum = Object.keys(this.incoming.neurons).reduce((total, target, index) => {
          return total += self.incoming.neurons[target].output * self.incoming.weights[target]
        }, this.bias)

        this.output = sigmoid(sum)

      }
      return this.output
    }
  }
}
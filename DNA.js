export class DNA {
    constructor() {
        this.DNA = []
        this.createDNA = () => {
            for (let i = 0; i < 1781; i++) {
                this.DNA.push(parseFloat((Math.random() * 10 - 5).toFixed(2)))
            }
        }
        this.createDNA()
        this.fitness = []

        this.calcAvgFitness = () => {
            this.avgFitness = this.fitness.length > 0 ? Math.floor(this.fitness.reduce((a, b) => {
                return a + b
            }) / this.fitness.length) : 0
            this.avgFitness = this.avgFitness / 374
            this.avgFitness = Math.pow(this.avgFitness, 4)
            this.avgFitness *= 100
            this.fitness = []
        }
    }
}
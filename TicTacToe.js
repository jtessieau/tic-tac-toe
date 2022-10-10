class TicTacToe {
    player1 = "x";
    player2 = "o";

    currentPlayer = this.player1;

    state = ["", "", "", "", "", "", "", "", ""];

    winningConditions = [
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0, 0],
    ];

    isWin = false;
    click = 0;

    boundHandler = this.handler.bind(this);

    initGrid() {
        const gridContainer = document.getElementById("gridContainer");

        // reset
        gridContainer.innerHTML = "";
        this.click = 0;
        this.state = this.resetState();
        this.currentPlayer = this.player1;
        this.isWin = false;

        const grid = document.createElement("div");
        grid.id = "grid";

        for (let i = 0; i < 9; i++) {
            const newCase = document.createElement("div");
            newCase.className = "case";
            newCase.id = i.toString();

            newCase.addEventListener("click", this.boundHandler);

            grid.appendChild(newCase);
        }

        gridContainer.appendChild(grid);
    }

    switchPlayer() {
        this.currentPlayer === this.player1
            ? (this.currentPlayer = this.player2)
            : (this.currentPlayer = this.player1);

        return this.currentPlayer;
    }

    resetState() {
        return ["", "", "", "", "", "", "", "", ""];
    }

    updateState(id) {
        this.state[id] = this.currentPlayer;
        return this.state;
    }

    handler(e) {
        if (this.click < 9 && !this.isWin) {
            this.click++;
            const newCase = e.target;

            newCase.innerHTML = this.currentPlayer;
            newCase.removeEventListener("click", this.boundHandler);

            this.updateState(newCase.id);
            this.testWinningConditions();

            if (this.isWin) {
                console.log(this.currentPlayer + " wins!");
            } else if (this.click == 9) {
                console.log("no winner");
            } else {
                this.switchPlayer();
            }
        }
    }

    testWinningConditions() {
        let isWinningPatternFound = false;

        for (const condition of this.winningConditions) {
            let isWin = condition.every((el, index) => {
                if (el === 1) {
                    return this.state[index] === this.currentPlayer;
                }
                return true;
            });

            if (isWin) {
                isWinningPatternFound = true;
                break;
            }
        }

        this.isWin = isWinningPatternFound;
    }
}

const app = new TicTacToe();

// Button
const initButton = document.querySelector("#initButton");
initButton.addEventListener("click", () => {
    app.initGrid();
});

const stateButton = document.querySelector("#stateButton");
stateButton.addEventListener("click", () => {
    console.log(app.state);
});

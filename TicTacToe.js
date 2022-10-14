class TicTacToe {
    player1 = "x";
    player2 = "o";

    currentPlayer = this.player1;

    state = ["", "", "", "", "", "", "", "", ""];
    stateMessage = "";

    winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
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
        this.updateStateDisplay(`${this.currentPlayer.toUpperCase()}'s turn`);
    }

    updateStateDisplay(message) {
        const stateDisplay = document.getElementById("stateDisplay");
        stateDisplay.innerHTML = message;
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
                this.updateStateDisplay(
                    `${this.currentPlayer.toUpperCase()} WINS!`
                );
            } else if (this.click == 9) {
                this.updateStateDisplay("DRAW!");
            } else {
                this.switchPlayer();
                this.updateStateDisplay(
                    `${this.currentPlayer.toUpperCase()}'s turn`
                );
            }
        }
    }

    testWinningConditions() {
        for (const condition of this.winningConditions) {
            let isWin = condition.every((cell) => {
                return this.state[cell] === this.currentPlayer;
            });

            if (isWin) {
                this.isWin = true;
                break;
            }
        }
    }
}

const app = new TicTacToe();

// Button
const initButton = document.querySelector("#initButton");
initButton.addEventListener("click", () => {
    app.initGrid();
});

const row = document.querySelector("input.inputRow");
row.addEventListener("change", (e) => Game.onChangeInputs(e));
const column = document.querySelector("input.inputColumn");
column.addEventListener("change", (e) => Game.onChangeInputs(e));
const bombs = document.querySelector("input.inputBomb");
bombs.addEventListener("change", (e) => Game.onChangeInputs(e));

const playButton = document.getElementsByClassName("playButton")[0];
playButton.addEventListener("click", (e) => {
    e.preventDefault();
    play(...Game.inputVal);
});

const restartButton = document.getElementsByClassName("restartButton")[0];
restartButton.addEventListener("click", (e) => {
    e.preventDefault();
    let game = new Game();
    game.restart();
});

class Game {
    static inputVal = [];
    constructor(row, column, bombCount) {
        this.row = row;
        this.column = column;
        this.bombCount = bombCount;
        this.countClick = 0;
        this.anyClickCount = 0;
    }

    createBord() {
        const table = document.querySelector(".game_table");

        this.bombPlace.forEach((item) => {
            const tr = document.createElement("tr");
            tr.setAttribute("class", "tr");
            table.append(tr);
            item.forEach((item) => {
                const td = document.createElement("td");
                td.setAttribute("class", "td");
                td.innerText = "_";
                td.addEventListener("click", () => this.anyClick());
                if (item === "*") {
                    td.addEventListener("click", (e) => {
                        this.showBomb(e);
                    });
                }
                tr.append(td);
            });
        });
    }

    createBombPlace(bomb) {
        const arr = [];
        for (let i = 0; i < this.row; i++) {
            const pushingArr = new Array(this.column).fill("-");
            arr.push(pushingArr);
        }

        arr.forEach((item) => {
            item.forEach((el, indx, arr) => {
                if (Math.random() < 0.5 && bomb !== 0) {
                    bomb--;
                    if (arr.includes("-")) {
                        arr[indx] = "*";
                    } else {
                        arr[indx] = "-";
                    }
                    if (!arr.includes("*")) {
                        arr[indx] = "*";
                    }
                }
            });
        });
        return arr;
    }

    anyClick() {
        this.anyClickCount++;
        if (this.anyClickCount === 7) {
            alert("You are lose");
            if (confirm("Do you want play again")) {
                this.restart();
            } else {
                alert("Game Over");
            }
        }
    }

    showBomb({ target }) {
        this.countClick++;
        target.setAttribute("class", "bomb");

        if (this.countClick == 5) {
            setTimeout(() => {
                if (confirm("Do you want play again")) {
                    this.restart();
                }
            }, 100);
        }
    }

    static onChangeInputs({ target }) {
        switch (target.classList.value) {
            case "inputRow":
                this.inputVal[0] = +target.value;
                break;
            case "inputColumn":
                this.inputVal[1] = +target.value;
                break;
            case "inputBomb":
                this.inputVal[2] = +target.value;
                break;
        }
    }

    start() {
        this.bombPlace = this.createBombPlace(this.bombCount);
        this.createBord(this.row, this.column);
    }

    restart() {
        this.anyClickCount = 0;
        this.bombPlace = [];
        let gameBoard = document.querySelector(".game_table");
        gameBoard.innerHTML = "";
        this.start();
    }
}

function play(row, column, bombCount) {
    let game = new Game(row, column, bombCount);
    game.start();
}

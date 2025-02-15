
class JogoVelha {
    constructor(){
        this.tabuleiroState = [0,0,0,0,0,0,0,0,0];
        this.currentPlayer = "X";
        this.winnablePositions = [
            [1,2,3],
            [4,5,6],
            [7,8,9],

            [1,4,7],
            [2,5,8],
            [3,6,9],

            [1,5,9],
            [3,5,7]
        ];
        this.jogadasFeitas = 0;
    }
    main(position){
        if(this.tabuleiroState[position - 1] == 0){
            this.tabuleiroState[position - 1] = this.currentPlayer;
            this.jogadasFeitas++;
            jogodaveia.checkIfWin();
            jogodaveia.putInHTML(position); 
            jogodaveia.changeCurrentPlayer(position);
        }
        // console.log(this.tabuleiroState);
    }
    putInHTML(position){
        document.getElementById(`grid${position}`).innerHTML = this.currentPlayer;
    }
    changeCurrentPlayer(position){
        if(this.currentPlayer == "X"){
            this.currentPlayer = "O";
        }else{
            this.currentPlayer = "X";
        }
    }
    checkIfWin(){
        for (const winposition of this.winnablePositions) {
            won_question = true;
            for (const position of winposition) {
                if(this.tabuleiroState[position - 1] != this.currentPlayer){
                    won_question = false;
                    break;
                }
            }
            if(won_question == true){
                document.getElementById('balanco').innerHTML = `O Jogador ${this.currentPlayer} Ganhou!`;
                break;
            }
        }
        if(this.jogadasFeitas == 9 && won_question == false){
            won_question = true;
            document.getElementById('balanco').innerHTML = `o Jogo Empatou!`;
        }

    }
}



let thegrid = "";
for(let i = 1; i <= 9; i++){
    thegrid += `<div class="grid" id="grid${i}" onclick="jogadaFeita(${i});"></div>`;
}
document.getElementById('maingrid').innerHTML = thegrid;

let jogodaveia;
function startNewJogoDaVeia(){
    won_question = false;
    document.getElementById('maingrid').innerHTML = thegrid;
    document.getElementById('balanco').innerHTML = "";
    jogodaveia = new JogoVelha ;
}

let won_question = false;
function jogadaFeita(position){
    if(won_question == false){
        jogodaveia.main(position);
    }
}

startNewJogoDaVeia();
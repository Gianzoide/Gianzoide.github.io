


let clickedMovesState = [];
let previus_dragable_MovesState = false;

let dragableMoveState = false;
let clickableMoveState = false;

function clicking_on_board_manegement(square_id, comecando_clickar) {//dont try understand this mess
    
    clickedMovesState.push(square_id);
    // console.log(clickedMovesState)
    

    if(clickedMovesState.length == 1){
        change_expecific_square_color(clickedMovesState[0]);
    }

    if( // se por acaso clica for do tabueiro +> reinicia
        (comecando_clickar == true && clickedMovesState.length == 2)
        || 
        (comecando_clickar == false && clickedMovesState.length == 1)
    ){
        clickableMoveState = false;
        dragableMoveState = false; 
        change_expecific_square_color(clickedMovesState[0],true);
        if(clickedMovesState.length == 2){
            change_expecific_square_color(clickedMovesState[1],true);
        }
        if(previus_dragable_MovesState){
            change_expecific_square_color(previus_dragable_MovesState[0],true);
        }
        clickedMovesState = [];
        previus_dragable_MovesState = false;

        return 0;
    }
    


    if(clickedMovesState.length == 2){
        const [move1, move2] = clickedMovesState;

        if(checkIfSameSquare(move1[0], move2[0]) && checkIfSameSquare(move1[2], move2[2])){ // [2] because move1 = "x-x"
            clickableMoveState = true;
            dragableMoveState = false;
        }else{
            clickableMoveState = false;
            dragableMoveState = true;
        }

        if(clickableMoveState == true){
            // console.log("clickableMoveState")

            if(!previus_dragable_MovesState){
                if(!chessGame.what_piece_in_that_square([move1[0] , move1[2]])){
                    change_expecific_square_color(move1,true);
                }else{
                    previus_dragable_MovesState = clickedMovesState;
                }
            }else{
                change_expecific_square_color(move1,true);
                change_expecific_square_color(previus_dragable_MovesState[0],true);

                clicking_manegement_move_a_piece([previus_dragable_MovesState[0],move1]);
                previus_dragable_MovesState = false;
            }
            
            clickedMovesState = [];
        }else if(dragableMoveState == true){
            // console.log("dragableMoveState")   

            change_expecific_square_color(move1,true);
            if(previus_dragable_MovesState){
                change_expecific_square_color(previus_dragable_MovesState[0],true);
            }
            clicking_manegement_move_a_piece(clickedMovesState);
            previus_dragable_MovesState = false;
            clickedMovesState = [];
        }
    }


}

function change_expecific_square_color(square_id, remove = false){
    const square = document.getElementById(`${square_id}`)

    if (square) { // Verifica se o elemento existe
        if(!remove){
            square.style.filter = " brightness(115%) blur(0.4px)";
        }else if(remove){
            square.style.filter = ""; // Remove o filtro
        }
    } else {
        console.error("Elemento não encontrado com o ID:", square_id);
    }
}

function clicking_manegement_move_a_piece(clickedMovesState){
    let [start_move, end_move] = clickedMovesState;

    start_move = start_move.split("-").map(Number);
    end_move = end_move.split("-").map(Number);

    chessGame.does_can_move_piece(start_move,end_move);

}
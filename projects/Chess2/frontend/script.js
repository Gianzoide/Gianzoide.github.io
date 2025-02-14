

function createBoard() {

    const boardElement = document.getElementById('chessboard');
    let max_colum = 7;
    let max_row = 7;

    for (let colum = 0; colum <= max_colum; colum++) {
        for (let row = 0; row <= max_row; row++) {
            //square
            const square = document.createElement('div');
            const isDark = (row + colum) % 2 !== 0;

            square.className = 'square ';
            square.className += `${isDark ? 'dark' : 'light'} `;
            square.id = `${max_colum - colum}-${row}`;

            // Adicionando o evento onclick
            square.addEventListener('mousedown', function() {
                // console.log(`Você clicou na posição ${square.id}`);
                clicking_on_board_manegement(square.id, true);
            });
            square.addEventListener('mouseup', function() {
                // console.log(`Você soltou na posição ${square.id}`);
                clicking_on_board_manegement(square.id, false);
            });


            boardElement.appendChild(square);
        }
    }
}

createBoard();

//create
function createPiece(piece_destination, color, piece_type){

    let piece_info = `${color}-${piece_type}`

    let piece = `<img class="piece" draggable="false" src="./imgs/${piece_info}.png" alt="${piece_info}"> </img>`;

    let Height = piece_destination[0];
    let width = piece_destination[1];

    document.getElementById(`${Height}-${width}`).innerHTML = piece;

}
//delet
function deletPiece(piece_location){
    
    let Height = piece_location[0];
    let width = piece_location[1];
 
    document.getElementById(`${Height}-${width}`).innerHTML = '';
}

//move piece
function moving_a_piece(piece_location, piece_destination){
    
    //get piece img
    let Height = piece_location[0];
    let width = piece_location[1];

    piece = document.getElementById(`${Height}-${width}`).innerHTML;
    // console.log(piece)
    
    //move
    Height = piece_destination[0];
    width = piece_destination[1];
    
    document.getElementById(`${Height}-${width}`).innerHTML = piece;

    //delet
    deletPiece(piece_location);
}

function script_move_a_piece(){

    let start_move = document.getElementById('start-move').value;
    start_move = start_move.split(",").map(Number);

    let end_move = document.getElementById('end-move').value;
    end_move = end_move.split(",").map(Number);


    chessGame.does_can_move_piece(start_move,end_move);

}



//side board
function moves_history(number_of_the_move, start_move, end_move){
    const moves_history = document.getElementById('moves_history');

    //chili1
    const child = document.createElement('div');
    child.className = 'moves_history_item'; 

    const childitem_1 = document.createElement('div');
    const childitem_1textContent = document.createElement('p');
    childitem_1textContent.textContent = `${number_of_the_move + 1}.`;
    childitem_1.appendChild(childitem_1textContent);

    //chili2
    const childitem_2 = document.createElement('div');
    
    const childitem_2IMG = document.createElement('img');
    const IMG2 = chessGame.what_piece_in_that_square(start_move);
    childitem_2IMG.src = `./imgs/${IMG2.color}-${IMG2.type}.png`;
    childitem_2IMG.alt = `${IMG2.color}-${IMG2.type}`;
    
    const childitem_2textContent = document.createElement('p');
    childitem_2textContent.textContent = `${number_to_albhabet(start_move[1])}${start_move[0] + 1}`;
    
    childitem_2.appendChild(childitem_2IMG);
    childitem_2.appendChild(childitem_2textContent);

    //arrow
    const chlidren_arrow = document.createElement('div');

    const arrow = document.createElement('img');
    arrow.src = `./imgs/arrow.png`;
    arrow.alt = `arrow`;
    chlidren_arrow.appendChild(arrow);


    //chili3
    const childitem_3 = document.createElement('div');
    
    const childitem_3IMG = document.createElement('img');
    const IMG3 = chessGame.what_piece_in_that_square(end_move);
    if(IMG3){
        childitem_3IMG.src = `./imgs/${IMG3.color}-${IMG3.type}.png`;
        childitem_3IMG.alt = `${IMG3.color}-${IMG3.type}`;  
        
        childitem_3.appendChild(childitem_3IMG);  
    }

    const childitem_3textContent = document.createElement('p');
    childitem_3textContent.textContent = `${number_to_albhabet(end_move[1])}${end_move[0] + 1}`;
    childitem_3.appendChild(childitem_3textContent);  
    

    //final step of the operation
    child.appendChild(childitem_1);
    child.appendChild(childitem_2);
    child.appendChild(chlidren_arrow);
    child.appendChild(childitem_3);

    // Adiciona ao moves_history
    moves_history.insertBefore(child, moves_history.firstChild);


}

const albhabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
function number_to_albhabet(the_number){
    return albhabet[the_number];
}
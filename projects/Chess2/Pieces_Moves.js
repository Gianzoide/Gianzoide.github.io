class Pieces_Moves{
    constructor(height, width, pieces_positions) {
        this.height = height; 
        this.width = width;   
        this.pieces_positions = pieces_positions; 
    }

    moving_piece_function(movement_type, movement_value, start_move, end_move, start_piece, end_piece) {
        switch (movement_type) {
            case "straight":
                return this.straight_movement(movement_value, start_move, end_move, start_piece, end_piece);
            case "diagonal":
                return this.diagonal_movement(movement_value, start_move, end_move, start_piece, end_piece);
            case "extra_straight_move":
                return this.extra_straight_move(movement_value, start_move, end_move, start_piece, end_piece);
            case "coordenated_move":
                return this.coordenated_move(movement_value, start_move, end_move, start_piece, end_piece);
    
            default:
                return false;
        }
    }

    how_pieces_moves(piece_type) {
        const movement = {};
        switch (piece_type) {
            case "rook":
                movement["straight"] = {
                    "direction": "any-straight",
                    "limit": Infinity,
                    "can_capture": "opposite_piece",
                    "what_can_jump": "nothing"
                };
                break;
            case "bishop":
                movement["diagonal"] = {
                    "direction": "any-diagonal",
                    "limit": Infinity,
                    "can_capture": "opposite_piece",
                    "what_can_jump": "nothing"
                };
                break;
            case "queen":
                movement["diagonal"] = {
                    "direction": "any-diagonal",
                    "limit": Infinity,
                    "can_capture": "opposite_piece",
                    "what_can_jump": "nothing"
                };
                movement["straight"] = {
                    "direction": "any-straight",
                    "limit": Infinity,
                    "can_capture": "opposite_piece",
                    "what_can_jump": "nothing"
                };
                break;
            case "king":
                movement["diagonal"] = {
                    "direction": "any-diagonal",
                    "limit": 1,
                    "can_capture": "opposite_piece",
                    "what_can_jump": "nothing"
                };
                movement["straight"] = {
                    "direction": "any-straight",
                    "limit": 1,
                    "can_capture": "opposite_piece",
                    "what_can_jump": "nothing"
                };
                break;
            case "pawn":
                movement["straight"] = {
                    "direction": "forward-straight",
                    "limit": 1,
                    "can_capture": "nothing",
                    "what_can_jump": "nothing"
                };
                movement["extra_straight_move"] = {
                    "direction": "forward-straight",
                    "can_do_with_x_moves":0,
                    "limit": 2,
                    "can_capture": "nothing",
                    "what_can_jump": "nothing"
                }
                movement["diagonal"] = {
                    "direction": "forward-diagonal",
                    "limit": 1,
                    "can_capture": "ONLY_opposite_piece",
                    "what_can_jump": "nothing"
                };
                break;
            case "horse":
                movement["coordenated_move"] = {
                    "direction":"any-horse",
                    "can_capture": "opposite_piece"
                }
                break
            default:
                break;
        }
        return movement;
    }

    checkCapture(end_piece, capture){
        let validCapture = false;

        if (end_piece) {
            if (capture.includes(end_piece.color)) {
                validCapture = true;
            }
        }
        
        if(!end_piece){
            if(capture.includes("nothing")){
                validCapture = true;
            }
        }

        if (!validCapture) {
            return false; // Não é uma captura válida
        }
    
        return true; // Movimento válido
    }

    checkBoardLimit([start_y, start_x],[end_y, end_x]){
    
        const [boardYLimit,boardYMinimum,boardXLimit,boardXMinimum] = this.boardLimit();
    
        const isWithinBounds = (x, y) =>
            x >= boardXMinimum && x < boardXLimit &&
            y >= boardYMinimum && y < boardYLimit;
    
        if (!isWithinBounds(start_x, start_y) || !isWithinBounds(end_x, end_y)) {
            return false; // Movimento fora dos limites do tabuleiro
        }
        return true;
    }

    boardLimit(){
        return [this.height, 0, this.width, 0];
    }

    checkCan_do_with_x_moves(can_do_with_x_moves, piece_times_moved){
        if(can_do_with_x_moves == piece_times_moved){
            return true;
        }else{
            return false;
        }
    }

    coordenated_move(movement_value, start_move, end_move, start_piece, end_piece){
        // console.log(movement_value);
        if(!this.checkBoardLimit(start_move,end_move)){
            return false;
        }

        const [start_y, start_x] = start_move;
        const [end_y, end_x] = end_move;

        const {"direction": direction, "can_capture": can_capture } = movement_value;

        const directions = tranforming_movement_type("direction", direction, { "color_start_piece": start_piece.color });
        let current_x = 0;
        let current_y = 0;
        let validHorselocation = false;

        for(const dir of directions) {

            current_y = start_y + dir[0];
            current_x = start_x + dir[1];

            if(end_y === current_y && end_x === current_x){
                validHorselocation = true;
            }
        }

        if(!validHorselocation){
            return false;
        }

        const capture = tranforming_movement_type("can_capture", can_capture, {"color_start_piece":start_piece.color});
        if(!this.checkCapture(end_piece, capture)){
            return false;
        }

        return true;
    }

    extra_straight_move(movement_value, start_move, end_move, start_piece, end_piece){
        // console.log(movement_value);
        if(!this.checkBoardLimit(start_move,end_move)){
            return false;
        }

        const {"can_do_with_x_moves": can_do_with_x_moves, "can_capture": can_capture } = movement_value;

        if(!this.checkCan_do_with_x_moves(can_do_with_x_moves, start_piece.times_moved)){
            return false;
        }

        if(!this.straight_movement(movement_value, start_move, end_move, start_piece, end_piece)){
            return false;
        }

        const capture = tranforming_movement_type("can_capture", can_capture, {"color_start_piece":start_piece.color});
        if(!this.checkCapture(end_piece, capture)){
            return false;
        }

        return true;
    }   

    diagonal_movement(movement_value, start_move, end_move, start_piece, end_piece) {
        if (!this.checkBoardLimit(start_move, end_move)) {
            return false;
        }

        if(checkIfSameSquare(start_move, end_move)){
            return false;
        }

        const [start_y, start_x] = start_move;
        const [end_y, end_x] = end_move;
    
        // Verifica se é um movimento diagonal
        const isDiagonal = Math.abs(end_x - start_x) === Math.abs(end_y - start_y);
    
        if (!isDiagonal) {
            return false; // Não é um movimento diagonal
        }
    
        // Determinar a direção e o passo
        const x_direction = end_x > start_x ? 1 : -1;
        const y_direction = end_y > start_y ? 1 : -1;
    
        const { "can_capture": can_capture, "direction": direction, "limit": limit, "what_can_jump": what_can_jump } = movement_value;
    
        // Verifica o limite
        if (limit < Math.abs(end_x - start_x) || limit < Math.abs(end_y - start_y)) {
            return false;
        }
    
        const directions = tranforming_movement_type("direction", direction, { "color_start_piece": start_piece.color });
    
        // Verifica se a direção é válida
        let validDirection = false;
        for (let dir of directions) {
            if (dir[0] === y_direction && dir[1] === x_direction) {
                validDirection = true;
                break;
            }
        }
        if (!validDirection) {
            return false;
        }
    
        let current_x = start_x + x_direction;
        let current_y = start_y + y_direction;
    
        const jumpable = tranforming_movement_type("what_can_jump", what_can_jump, { "color_start_piece": start_piece.color });
    
        // Verificar todas as posições intermediárias
        while (current_x !== end_x || current_y !== end_y) {
            const positionKey = `${current_y}-${current_x}`;
            const pieceAtPosition = this.pieces_positions[positionKey];
    
            // Verifica se a posição está vazia e se "nothing" está em jumpable
            if (!pieceAtPosition && !jumpable.includes("nothing")) {
                return false; // Se não pode pular quadrados vazios, retorna falso
            }
    
            if (pieceAtPosition) {
                // Se a peça está no caminho, verifica se pode ser pulada
                if (!jumpable || (Array.isArray(jumpable) && !jumpable.includes(pieceAtPosition.color))) {
                    return false; // Não pode pular essa peça
                }
            }
    
            current_x += x_direction;
            current_y += y_direction;
        }
    
        // Checar a captura
        const capture = tranforming_movement_type("can_capture", can_capture, { "color_start_piece": start_piece.color });
        if (!this.checkCapture(end_piece, capture)) {
            return false;
        }
    
        return true;
    }
    

    straight_movement(movement_value, start_move, end_move, start_piece, end_piece) {
        // console.log(movement_value);
        if(!this.checkBoardLimit(start_move,end_move)){
            return false;
        }

        if(checkIfSameSquare(start_move, end_move)){
            return false;
        }

        const [start_y, start_x] = start_move;
        const [end_y, end_x] = end_move;
    
        // Verifica se é um movimento reto
        const isHorizontal_0 = start_x === end_x;
        const isVertical_0 = start_y === end_y;
    
        if (!isHorizontal_0 && !isVertical_0) {
            return false; // Não é um movimento reto
        }
    
        // Determinar a direção e o passo
        const x_direction = isHorizontal_0 ? 0 : (end_x > start_x ? 1 : -1);
        const y_direction = isVertical_0 ? 0 : (end_y > start_y ? 1 : -1);
    
        const { "can_capture": can_capture, "direction": direction, "limit": limit, "what_can_jump": what_can_jump } = movement_value;
    
        //ver o limite
        if(limit < Math.abs(start_x - end_x) || limit < Math.abs(start_y - end_y)){
            return false; 
        }

        const directions = tranforming_movement_type("direction", direction, {"color_start_piece":start_piece.color});
    
        let validDirection = false;
        for (let dir of directions) {
            if (dir[0] === y_direction && dir[1] === x_direction) {
                validDirection = true;
                break;
            }
        }
        if (!validDirection) {
            return false;
        }
    
        let current_x = start_x + x_direction;
        let current_y = start_y + y_direction;
    
        const jumpable = tranforming_movement_type("what_can_jump", what_can_jump, {"color_start_piece":start_piece.color});
    
        // Verificar todas as posições intermediárias
        
        while (current_x !== end_x || current_y !== end_y) {
    
            const positionKey = `${current_y}-${current_x}`;
            const pieceAtPosition = this.pieces_positions[positionKey];
    
            // Verifica se a posição está vazia e se "nothing" está em jumpable
            if (!pieceAtPosition) {
                if(!jumpable.includes("nothing")){
                    return false; // Se não pode pular quadrados vazios, retorna falso
                }
            }
    
            if (pieceAtPosition) {
                // Se a peça está no caminho, verifica se pode ser pulada
                if (!jumpable || (Array.isArray(jumpable) && !jumpable.includes(pieceAtPosition.color))) {
                    return false; // Não pode pular essa peça
                }
            }
    
            current_x += x_direction;
            current_y += y_direction;
        }
    
        // Checar a captura
        const capture = tranforming_movement_type("can_capture", can_capture, {"color_start_piece":start_piece.color});
        if(!this.checkCapture(end_piece, capture)){
            return false;
        }

        return true;        
    }

}

function checkIfSameSquare(move1, move2){
    const [move1y, move1x] = move1;
    const [move2y, move2x] = move2;

    if(!(move1y == move2y)){
        return false;
    }

    if(!(move1x == move2x)){
        return false;
    }

    return true;
}
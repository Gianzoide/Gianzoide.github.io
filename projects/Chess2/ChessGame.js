class ChessGame {
    constructor(dimentions, pieces_positions) {
        this.height = dimentions[0]; 
        this.width = dimentions[1]; 
        this.pieces_positions = pieces_positions;

        // Passe os parâmetros necessários para Pieces_Moves
        this.pieces_moves = new Pieces_Moves(this.height, this.width, this.pieces_positions);

        for (const key in this.pieces_positions) {
            const value = this.pieces_positions[key];
            let coordenada = key.split("-").map(Number);
            createPiece([coordenada[0], coordenada[1]], value.color, value.type);
        }

        this.number_of_moves_made = 0;
        this.moves_history = [];
    }

    moving_a_piece(start_move, end_move) {
        // console.log(`Moving piece from ${start_move} to ${end_move}`);
        
        moves_history(this.number_of_moves_made, start_move, end_move);
        
        
        const startKey = `${start_move[0]}-${start_move[1]}`;
        const endKey = `${end_move[0]}-${end_move[1]}`;
        this.pieces_positions[endKey] = this.pieces_positions[startKey];
        this.pieces_positions[endKey]["times_moved"]++;
        delete this.pieces_positions[startKey];
        this.number_of_moves_made++;

        this.moves_history.push([start_move,end_move]);
    }

    what_piece_in_that_square(piece_location) {
        const location = `${piece_location[0]}-${piece_location[1]}`;
        return this.pieces_positions[location] || null;
    }

    does_can_move_piece(start_move, end_move) {
        const start_piece = this.what_piece_in_that_square(start_move);
        const end_piece = this.what_piece_in_that_square(end_move);

        if (!this.can_move_piece_logic(start_move, end_move, start_piece, end_piece)) {
            console.log("jogada nao autorizada.")
            return false;
        }

        moving_a_piece(start_move, end_move);
        this.moving_a_piece(start_move, end_move);

        // this.hello()

        return true;
    }

    can_move_piece_logic(start_move, end_move, start_piece, end_piece) {
        if (!start_piece) return false;

        const howThePieceMove_info = this.pieces_moves.how_pieces_moves(start_piece.type);

        for (const movement_type in howThePieceMove_info) {
            const movement_value = howThePieceMove_info[movement_type];
            if (this.pieces_moves.moving_piece_function(movement_type, movement_value, start_move, end_move, start_piece, end_piece)) {
                return true;
            }
        }

        return false; 
    }

    hello() {
        console.log(this.pieces_positions);
        console.log(this.number_of_moves_made);
        console.log(this.moves_history);
    }
}
pieces = 
{

    "0-0":{"type":"rook"    ,"color":"white"     ,"times_moved":0},
    "0-1":{"type":"horse"   ,"color":"white"     ,"times_moved":0},
    "0-2":{"type":"bishop"  ,"color":"white"     ,"times_moved":0},
    "0-3":{"type":"queen"   ,"color":"white"     ,"times_moved":0},
    "0-4":{"type":"king"    ,"color":"white"     ,"times_moved":0},
    "0-5":{"type":"bishop"  ,"color":"white"     ,"times_moved":0},
    "0-6":{"type":"horse"   ,"color":"white"     ,"times_moved":0},
    "0-7":{"type":"rook"    ,"color":"white"     ,"times_moved":0},

    "7-0":{"type":"rook"    ,"color":"black"     ,"times_moved":0},
    "7-1":{"type":"horse"   ,"color":"black"     ,"times_moved":0},
    "7-2":{"type":"bishop"  ,"color":"black"     ,"times_moved":0},
    "7-3":{"type":"queen"   ,"color":"black"     ,"times_moved":0},
    "7-4":{"type":"king"    ,"color":"black"     ,"times_moved":0},
    "7-5":{"type":"bishop"  ,"color":"black"     ,"times_moved":0},
    "7-6":{"type":"horse"   ,"color":"black"     ,"times_moved":0},
    "7-7":{"type":"rook"    ,"color":"black"     ,"times_moved":0},

    "1-0":{"type":"pawn"    ,"color":"white"     ,"times_moved":0},
    "1-1":{"type":"pawn"    ,"color":"white"     ,"times_moved":0},
    "1-2":{"type":"pawn"    ,"color":"white"     ,"times_moved":0},
    "1-3":{"type":"pawn"    ,"color":"white"     ,"times_moved":0},
    "1-4":{"type":"pawn"    ,"color":"white"     ,"times_moved":0},
    "1-5":{"type":"pawn"    ,"color":"white"     ,"times_moved":0},
    "1-6":{"type":"pawn"    ,"color":"white"     ,"times_moved":0},
    "1-7":{"type":"pawn"    ,"color":"white"     ,"times_moved":0},

    "6-0":{"type":"pawn"    ,"color":"black"     ,"times_moved":0},
    "6-1":{"type":"pawn"    ,"color":"black"     ,"times_moved":0},
    "6-2":{"type":"pawn"    ,"color":"black"     ,"times_moved":0},
    "6-3":{"type":"pawn"    ,"color":"black"     ,"times_moved":0},
    "6-4":{"type":"pawn"    ,"color":"black"     ,"times_moved":0},
    "6-5":{"type":"pawn"    ,"color":"black"     ,"times_moved":0},
    "6-6":{"type":"pawn"    ,"color":"black"     ,"times_moved":0},
    "6-7":{"type":"pawn"    ,"color":"black"     ,"times_moved":0},
};


function tranforming_movement_type(movement_type, movement_value,
    {
        "color_start_piece":color_start_piece,
        "can_do_with_x_moves":can_do_with_x_moves
    }) 
    
    {
    switch (movement_type) {
        case "can_capture":
            if (movement_value === "opposite_piece") {
                return color_start_piece === "white" ? ["black","nothing"] : ["white","nothing"];
            }
            if (movement_value === "all") {
                return ["black", "white","nothing"];
            }
            if (movement_value === "nothing") {
                return ["nothing"];
            }
            if (movement_value === "ONLY_opposite_piece") {
                return color_start_piece === "white" ? ["black"] : ["white"];
            }
            console.error(`Valor inesperado para can_capture: ${movement_value}`);
            return null;

        case "direction":
            if (movement_value === "any-straight") {
                return [[1, 0], [0, 1], [-1, 0], [0, -1]]; // Direções em 4 eixos
            }
            if (movement_value === "forward-straight") {
                return color_start_piece === "white" ? [[1, 0]] : [[-1, 0]]; // Movimento para frente
            }
            if (movement_value === "any-diagonal") {
                return [[1,1],[-1,1],[-1,-1],[1,-1]]; // Direções em 4 eixos
            }
            if (movement_value === "forward-diagonal") {
                return color_start_piece === "white" ? [[1, 1],[1,-1]] : [[-1,-1],[-1,1]]; // Movimento para frente
            }
            if (movement_value === "any-horse") {
                return [[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]]; // Movimento para frente
            }
            console.error(`Direção desconhecida: ${movement_value}`);
            return null;

        case "what_can_jump":
            if (movement_value === "opposite_piece") {
                return color_start_piece === "white" ? ["black","nothing"] : ["white","nothing"];
            }
            if (movement_value === "all") {
                return ["black", "white","nothing"];
            }
            if (movement_value === "nothing") {
                return ["nothing"]; // Retorna array vazio para indicar "sem peças para saltar"
            }
            console.error(`Valor inesperado para what_can_jump: ${movement_value}`);
            return null;

        default:
            console.error(`Tipo de movimento desconhecido: ${movement_type,":", movement_value}`);
            return null;
    }
}

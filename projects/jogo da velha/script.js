
let grid = [];let backupgrid = [];
let Extragrid = ``; // grid for the Extras
let all_TotalPlaces = 0; let all_TotalPlacesbackup = 0;
let X_totalPlaces = 3;
let Y_totalPlaces = 3;
let inARowToWin = 3;
let gameMode = "TicTacToe"; 
let roundsPlayed = 0;
let ExtraroundsPlayed = 0; let ExtraroundsPlayedbackup = 0;
let gameEndedTF = false;
let X = 1, Y = 1;
let _O_svg = `<svg class="O" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 96a160 160 0 1 0 0 320 160 160 0 1 0 0-320zM448 256A224 224 0 1 1 0 256a224 224 0 1 1 448 0z"/></svg>`;
let _X_svg = `<svg class="X" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>`;
let _Wall_svg = `<svg width="800px" height="800px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path class="Wall" d="M494 18.02l-101 .103V119h101zm-119 .12l-238 .247V119h238zm-256 .266L18 18.51V119h101zM18 137v110h229V137zm247 0v110h229V137zM18 265v110h101V265zm119 0v110h238V265zm256 0v110h101V265zM18 393v100.98l229-.236V393zm247 0v100.727l229-.237V393z"/></svg>`;
let _plusOne_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path class="plusonetowin" d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4L224 224l-114.7 0 9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L224 288l0 114.7-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4L288 288l114.7 0-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4L288 224l0-114.7 9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z"/></svg>`;
let _Detonator_ = `<img src="./IMGs/DetonatorBox.png"></img>`;
let currentTurn = _X_svg;
let Extra = 0; // what thing user is placing in the grid
let OBJ = 0; // not stackable items with each other
let ACTIVATE = 1; // if met wiht player's move, sothing will happen
let listOfEvents = [];
let pushedPosition;
function findIndexOfGrid(XYArray){
    return XYArray[0] + (XYArray[1] * X_totalPlaces);
}

function XOdetected(XYindex){
    position = findIndexOfGrid(XYindex)

    switch (Extra) {
        case 0:
            simbol = currentTurn;
            break;
        case 1:
            simbol = _Wall_svg;
            break;
        case 2:
            simbol = _plusOne_svg;
            break;
        case 3:
            simbol = _Detonator_;
            break;
        default:
            console.log("erro in switch in OXdetecteed");
            break;
    }
    
    if(grid[position][OBJ] == false){
        
        if(Extra == 0){
            roundsPlayed++;
            if(roundsPlayed == 1){
                Extragrid = document.getElementById('grid-container').innerHTML;
                backupgrid = JSON.parse(JSON.stringify(grid));
                ExtraroundsPlayedbackup = ExtraroundsPlayed;
                all_TotalPlacesbackup = all_TotalPlaces;
            }
            // console.log("wfewe",ExtraroundsPlayedbackup, ExtraroundsPlayed);
            
        }else if(Extra != 0){
            ExtraroundsPlayed++;
        }
        
        if(gameMode == "TicTacToe" || Extra != 0){
            pushedPosition = XYindex;
            grid[findIndexOfGrid(pushedPosition)][OBJ] = simbol;
        }else if(gameMode == "Lig4"     ){
            pushedPosition = XOPushDown(XYindex);
            grid[findIndexOfGrid(pushedPosition)][OBJ] = simbol;
        }

        checkEventsInSequence(listOfEvents);
        
        
        document.getElementById(`grid-item[${pushedPosition}]`).innerHTML = simbol;

        if(Extra == 0){
            // console.log("won? ------------", checkIfWon(pushedPosition, currentTurn));  
            if(checkIfWon(pushedPosition, currentTurn)){
                gameEndedTF = true;
                gameEnded(currentTurn);
            }else{ 
                if(roundsPlayed + ExtraroundsPlayed == all_TotalPlaces){
                    gameEndedTF = true;
                    gameEnded("tied");
                }
                if(currentTurn == _X_svg){
                    document.documentElement.style.setProperty('--grid-item-color', `rgb(255, 36, 32)`);
                }else{
                    document.documentElement.style.setProperty('--grid-item-color', `rgb(32, 62, 255)`);
                }
                currentTurn = currentTurn === _X_svg ? _O_svg : _X_svg;
            }    
        }
        
    }else   
    if(Extra != 0){
        if(grid[findIndexOfGrid(XYindex)][OBJ] != simbol){
            grid[findIndexOfGrid(XYindex)][OBJ] = simbol;
            document.getElementById(`grid-item[${XYindex}]`).innerHTML = simbol;
            listOfEvents.push(); //----------------------------
        }else{
            grid[findIndexOfGrid(XYindex)][OBJ] = 0;
            document.getElementById(`grid-item[${XYindex}]`).innerHTML = ``;
            ExtraroundsPlayed--;
        }
        
    }
    // console.log(grid)
}

function XOPushDown(notPushedPosition){ 
    for(let i = notPushedPosition[1] + 1; i <= Y_totalPlaces - 1; i++){

        if(grid[findIndexOfGrid([notPushedPosition[0],i])][OBJ] != false){
            return [notPushedPosition[0],i - 1];
        }
    }
    return [notPushedPosition[0], Y_totalPlaces - 1];
}

let XYDirections = [
    [[0,1 ] ,[0,-1 ] ], 
    [[1,1 ] ,[-1,-1] ],
    [[1,0 ] ,[-1,0 ] ], 
    [[1,-1] ,[-1,1 ] ]
]; 
function checkIfWon(position, simbol, quantParaGanhar = 0){
    for (const element of XYDirections) {
        for (const element2 of element) {
            let i = 1;

            while (i <= inARowToWin &&
                (position[0] + (i * element2[0]) < X_totalPlaces) &&
                (position[1] + (i * element2[1]) < Y_totalPlaces) &&
                (position[0] + (i * element2[0]) >= 0) &&
                (position[1] + (i * element2[1]) >= 0)) {
                
                // console.log(position, checkNextPosition(position, element2, i), simbol, i);

                if (grid[checkNextPosition(position, element2, i)][OBJ] == simbol ||
                    grid[checkNextPosition(position, element2, i)][OBJ] == _plusOne_svg
                ){
                    quantParaGanhar++;
                } else {
                    break;
                }
                i++;
            }
        }

        // console.log("quantos em seguida achou?", quantParaGanhar + 1);
        if (quantParaGanhar + 1 >= inARowToWin) {
            return true;
        } else {
            quantParaGanhar = 0;
        }
    }
    return false;
}
function checkNextPosition(originalXY,nextXY,i){
    return findIndexOfGrid([originalXY[0] + (i * nextXY[0]), originalXY[1] + (i * nextXY[1]) ]  );
}

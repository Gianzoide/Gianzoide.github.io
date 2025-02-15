let checkboxchecked = 0;
function gameEnded(state){
    if(state == _X_svg){
        displayGameEnded(`WON`,_X_svg);
    }
    if(state == _O_svg){
        displayGameEnded(`WON`,_O_svg);
    }
    if(state == "tied"){
        displayGameEnded("TIED");
    }
}

function displayGameEnded(str,svg = ``){


    const mesenge = document.getElementById('displayMesenge');
    mesenge.style.display = "flex";

    let newstr = ``;
    for (const onestr of str) {
        newstr += `<div>${onestr}</div>`
    }
    document.getElementById('displayMesenge').innerHTML += `
    <div class="displayMesenge_content" id="displayMesenge_content">
        ${svg}
    </div>
    ${newstr}

    `;
}

const Configuration = document.getElementById('configuracao');

Configuration.style.display = "none";

let letcloseOpenConfiguration = 0;
function closeOpenConfiguration(){
    const Configuration = document.getElementById('configuracao');
    const openConfiguration = document.getElementById('close_configuracao');

    if(letcloseOpenConfiguration == 0){
        letcloseOpenConfiguration = 1;
        Configuration.style.display = "flex";
        openConfiguration.style.display = "none";

    }else{
        letcloseOpenConfiguration = 0;
        Configuration.style.display = "none";
        openConfiguration.style.display = "flex";
    }

    uncheckRadio(0);
}

const Configuration2 = document.getElementById('configuracao');

Configuration2.style.display = "none";

let letcloseOpenConfiguration2 = 0;
function closeOpenConfiguration2(){
    const Configuration2 = document.getElementById('configuracao2');
    const openConfiguration2 = document.getElementById('close_configuracao3');

    if(letcloseOpenConfiguration2 == 0){
        letcloseOpenConfiguration2 = 1;
        Configuration2.style.display = "flex";
        openConfiguration2.textContent = "↑";

    }else{
        letcloseOpenConfiguration2 = 0;
        Configuration2.style.display = "none";
        openConfiguration2.textContent = "↓";
    }

    uncheckRadio(0);
}

closeOpenConfiguration();
closeOpenConfiguration2();

function changeExtras(checkBox){
    if(roundsPlayed != 0){
        reset("softReset");
    }
    switch (checkBox) {
        case 0:
            uncheckRadio(checkBox);
            break;
        case 1:
            uncheckRadio(checkBox);
            break;
        case 2:
            uncheckRadio(checkBox);
            break;
        case 3:
            uncheckRadio(checkBox);
            break;
        default:
            break;
    }
}
function uncheckRadio(radioid){
    const radio = document.getElementById(`checkbox${radioid}`);
    for(let i = 1; i <= 3; i++){
        document.getElementById(`checkbox${i}`).checked = false;
    }
    if(radioid == checkboxchecked){
        Extra = 0;
        checkboxchecked = 0;
        if(radioid != 0){
            radio.checked = false;
        }
    }else{
        Extra = radioid;
        checkboxchecked = radioid;
        if(radioid != 0){
            radio.checked = true;
        }
    }
}

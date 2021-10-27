// Variáveis de controle
const game = document.getElementById('game');
let board = [];
let bombs = [];
let tableDim = 0;
lost = false;

// Função para definir o campo
function startBoard(dimensions, nBombs) {
    // Define o tamanho do tabuleiro e começa
    tableDim = dimensions;
    lost = false;

    // Define o tamanho individual de cada célula
    let size = ((56 / dimensions) / 100) * window.innerHeight - 2;

    // Gera as bombas
    while (bombs.length != nBombs) {    
        let bombX = Math.floor(Math.random() * dimensions);
        let bombY = Math.floor(Math.random() * dimensions);
        bombs.indexOf([bombY, bombX]) === -1 ? bombs.push([bombY, bombX]) : null;
    }

    // Cria as células
    for (let i = 0; i < dimensions; i++) {
        for (let j = 0; j < dimensions; j++) {
            // Cria a div das células
            const cell = document.createElement("div");

            // Configura as propriedades
            cell.setAttribute('id', i + "-" + j);
            cell.setAttribute('class', 'cell cursorControl');
            cell.addEventListener("click", () => {cellClick(i, j)}, false)
            cell.style['height'] = `${size}px`;
            cell.style['width'] = `${size}px`;

            game.appendChild(cell);
            board.push(cell);
        }
    }
}

// Clique em uma celula
function cellClick(i, j) {    
    const clickedCell = document.getElementById(i + "-" + j);

    // Se a célula ainda nao está aberta ou usuário nao perdeu
    const bg = clickedCell.style.backgroundColor;
    if (bg != "rgb(48, 48, 48)" && lost == false) {
        
        // Atribui ou número ou bomba para a célula
        if (verifyIn(i, j, bombs)) {
            // Clicou em uma bomba
            loss();
        } else {
            // Não clicou em bomba
            clickedCell.style['background-color'] = 'rgb(48, 48, 48)';
            const number = document.createElement("div");
            let n = bombsArround(i, j);
            if (n != 0) {
                // Clicou em um número
                number.innerHTML = n;
                number.style['color'] = getColor(n);
                number.setAttribute('class', 'number cursorControl');
                clickedCell.appendChild(number);
            } else {
                // Clicou em um espaço em branco
            }
        }

    }
}

// Define o jogo como perdido
function loss() {
    lost = true;
    const allCells = document.getElementsByClassName('cursorControl');
    for (let i = 0; i < allCells.length; i++){
        allCells[i].style['cursor'] = "default";
    }

    for (let i = 0; i < bombs.length; i++) {
        const tmpCell = document.getElementById(bombs[i][0] + '-' + bombs[i][1]);
        if (tmpCell.style.backgroundColor != 'rgb(48, 48, 48)'){
            const bombImg = document.createElement("img");
            bombImg.setAttribute('src', '../assets/bomb.png')
            bombImg.setAttribute('class', 'bomb-and-flag');
            tmpCell.style['background-color'] = 'rgb(48, 48, 48)';
            tmpCell.appendChild(bombImg);
        }
    }
}

// Verifica o número de bombas ao redor da célula
function bombsArround(i, j) {
    let bombsCount = 0;
    const verifyList = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    for (let x = 0; x < verifyList.length; x++) {
        try {
            if (verifyIn(i + verifyList[x][0], j + verifyList[x][1], bombs)) {
                bombsCount += 1;
            }
            // else {
            //     if (bombsArround(i + verifyList[x][0], j + verifyList[x][1]) == 0) {
            //         cellClick(i + verifyList[x][0], j + verifyList[x][1]);
            //     }
            // }
        } catch {
            null;
        }
    }
    return bombsCount;
}

// Retorna a cor do número
function getColor(n) {
    switch(n) {
        case 1:
            return "blue";
        case 2:
            return "green";
        case 3:
            return "red";
        case 4:
            return "purple";
        case 5:
            return "orange";
        case 6:
            return "yellow";
        case 7:
            return "pink";
        default:
            return "white";
    }
}

// Verifica se uma cordenada está em uma lista
function verifyIn(x, y, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i][0] == x && list[i][1] == y){
            return true;
        }
    }
    return false;
}

// Atualiza o slider de configurações
function updateSlider() {
    const bombSlider = document.getElementById('n-bombs');
    const gridSlider = document.getElementById('grid-size');
    bombSlider.setAttribute['max', gridSlider.value];
}

// Aplica as configurações
function applySettings() {
    const dimension = document.getElementById('grid-size').value;
    const nBombs = document.getElementById('n-bombs').value;
    //startBoard(dimension, nBombs);
}

// Executada quanto iniciado
document.addEventListener('DOMContentLoaded', () => {
    let startDimension =  6;
    let startBombsNumber = 5;
    startBoard(startDimension, startBombsNumber);
});



const allRanges = document.querySelectorAll(".slider");
    allRanges.forEach(wrap => {
    const range = wrap.querySelector(".range");
    const bubble = wrap.querySelector(".bubble");

    range.addEventListener("input", () => {
        setBubble(range, bubble);
    });
    setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}
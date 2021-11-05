// Variáveis de controle
const game = document.getElementById("game");
let board = [];
let bombs = [];
let tableDim = 0;
let minute = 0;
let second = 0;
let cron;
let cron_started = 0;
let lost = false;
let usedCheat = false;

// Desabilita o clique com o botão direito
window.addEventListener("contextmenu", (e) => e.preventDefault());

// Função que realiza a mudanda no texto do cronometro
function timer() {
	second++;

	if (second == 60) {
		second = 0;
		minute++;
	}

	if (minute == 60) {
		minute = 0;
	}

	document.getElementById("minute").innerText = returnData(minute);
	document.getElementById("second").innerText = returnData(second);
}

function returnData(input) {
	return input >= 10 ? input : `0${input}`;
}

// Função para iniciar o cronometro
function startTimer() {
	pauseTimer();
	cron = setInterval(() => {
		timer();
	}, 1000);
}

// Função para pausar o cronometro
function pauseTimer() {
	clearInterval(cron);
}

// Função para reiniciar o cronometro
function resetTimer() {
	minute = 0;
	second = 0;
	document.getElementById("minute").innerText = "00";
	document.getElementById("second").innerText = "00";
}

// Função para definir o campo
function startBoard(dimensions, nBombs) {
	// Define o tamanho do tabuleiro e começa
	tableDim = dimensions;
	lost = false;

	// Define o tamanho individual de cada célula
	let size = (56 / dimensions / 100) * window.innerHeight - 2;

	// Gera as bombas
	while (bombs.length != nBombs) {
		let bombX = Math.floor(Math.random() * dimensions);
		let bombY = Math.floor(Math.random() * dimensions);
		bombs.indexOf([bombY, bombX]) === -1
			? bombs.push([bombY, bombX])
			: null;
	}

	// Cria as células
	for (let i = 0; i < dimensions; i++) {
		for (let j = 0; j < dimensions; j++) {
			// Cria a div das células
			const cell = document.createElement("div");

			// Configura as propriedades
			cell.setAttribute("id", i + "-" + j);
			cell.setAttribute("class", "cell cursorControl");
			cell.setAttribute("oncontextmenu", "markAsFlag(this)");
			cell.addEventListener(
				"click",
				() => {
					cellClick(i, j);
				},
				false
			);
			cell.style["height"] = `${size}px`;
			cell.style["width"] = `${size}px`;

			game.appendChild(cell);
			board.push(cell);
		}
	}
}

// Clique em uma celula
function cellClick(i, j) {
	if (cron_started == 0) {
		cron_started = 1;
		startTimer();
	}

	try {
		const clickedCell = document.getElementById(i + "-" + j);
		// Se a célula ainda nao está aberta ou usuário nao perdeu
		const bg = clickedCell.style.backgroundColor;
		if (bg != "rgb(48, 48, 48)" && lost == false) {
			let cell = openCell(i, j)
			if (cell == "bomb") {
				pauseTimer();
				loss();
			}

			if (cell == 'empty') {
				cellClick(i + 1, j);
				cellClick(i + 1, j + 1);
				cellClick(i + 1, j - 1);

				cellClick(i - 1, j - 1);
				cellClick(i - 1, j);
				cellClick(i - 1, j + 1);

				cellClick(i, j + 1);
				cellClick(i, j - 1);
			}
		}
	} catch (error) {
		
	}
}

// Abre uma célula e atribui uma imagem
function openCell(i, j) {
	const cellToOpen = document.getElementById(i + "-" + j);

	// Se a célula ainda nao está aberta
	const bg = cellToOpen.style.backgroundColor;
	if (bg != "rgb(48, 48, 48)") {
		// Retira a flag se houver
		if (cellToOpen.hasChildNodes())
			cellToOpen.removeChild(cellToOpen.lastChild);

		// Define o fundo para a célula e o cursor
		cellToOpen.style["background-color"] = "rgb(48, 48, 48)";
		cellToOpen.style["cursor"] = "default";
		// Verifica se é uma bomba
		if (verifyIn(i, j, bombs)) {
			// É uma bomba
			const bombImg = document.createElement("img");
			bombImg.setAttribute("src", "../assets/bomb.png");
			bombImg.setAttribute("class", "bomb-and-flag");
			cellToOpen.appendChild(bombImg);
			return "bomb";
		} else {
			const number = document.createElement("div");
			let n = bombsArround(i, j);
			if (n != 0) {
				// Clicou em um número
				number.innerHTML = n;
				number.style["color"] = getColor(n);
				number.setAttribute("class", "number cursorControl");
				cellToOpen.appendChild(number);
				return "number";
			} else {
				return "empty";
			}
		}
	}
}

// Define o jogo como perdido
function loss() {
	if (cron_started) {
		cron_started = 0;
		pauseTimer();
	}

	lost = true;
	const allCells = document.getElementsByClassName("cursorControl");
	for (let i = 0; i < allCells.length; i++) {
		allCells[i].style["cursor"] = "default";
	}

	for (let i = 0; i < bombs.length; i++) {
		openCell(bombs[i][0], bombs[i][1]);
	}
}

// Verifica o número de bombas ao redor da célula
function bombsArround(i, j) {
	let bombsCount = 0;
	const verifyList = [
		[-1, -1],
		[0, -1],
		[1, -1],
		[-1, 0],
		[1, 0],
		[-1, 1],
		[0, 1],
		[1, 1],
	];
	for (let x = 0; x < verifyList.length; x++) {
		try {
			if (verifyIn(i + verifyList[x][0], j + verifyList[x][1], bombs)) {
				bombsCount += 1;
			}
		} catch {
			null;
		}
	}
	return bombsCount;
}

// Retorna a cor do número
function getColor(n) {
	switch (n) {
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
		if (list[i][0] == x && list[i][1] == y) {
			return true;
		}
	}
	return false;
}

// Marca como Bomba (botão direito)
function markAsFlag(e) {
	// Se a célula ja está marcada
	if (hasFlag(e)) {
		e.removeChild(e.lastChild);
	} else {
		// Caso nao esteja
		const bg = e.style.backgroundColor;
		// Se a célula ainda não foi aberta, ainda não possui flag e o jogo ainda nao foi perdido
		if (bg != "rgb(48, 48, 48)" && !e.hasChildNodes() && lost == false) {
			const flagImg = document.createElement("img");
			flagImg.setAttribute("src", "../assets/flag.png");
			flagImg.setAttribute("class", "bomb-and-flag");
			e.appendChild(flagImg);
		}
	}
}

// Verifica se a célula possui flag
function hasFlag(e) {
	if (e.hasChildNodes()) {
		if (e.lastChild.getAttribute("src") == "../assets/flag.png") {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

// Botão de Trapaça
async function activateCheat(s) {
	if (!usedCheat) {
		usedCheat = true;
	}

	let prevBoard = [];

	for (let i = 0; i < tableDim; i++) {
		let row = [];
		for (let j = 0; j < tableDim; j++) {
			// Se a célula estava aberta
			const tmpCell = document.getElementById(i + "-" + j);
			if (tmpCell.style.backgroundColor == "rgb(48, 48, 48)") {
				row.push("open");
			} else {
				if (hasFlag(tmpCell)) {
					row.push("flag");
				} else {
					row.push("closed");
				}
			}
		}
		prevBoard.push(row);
	}

	// Mostra todas as células
	for (let i = 0; i < tableDim; i++) {
		for (let j = 0; j < tableDim; j++) {
			openCell(i, j);
		}
	}
	// Espera
	await new Promise((r) => setTimeout(r, s * 1000));
	// Restaura o tabuleiro
	for (let i = 0; i < tableDim; i++) {
		for (let j = 0; j < tableDim; j++) {
			const tmpCell = document.getElementById(i + "-" + j);
			tmpCell.style["background-color"] = "rgb(0, 0, 0)";
			tmpCell.style["cursor"] = "pointer";
			try {
				tmpCell.removeChild(tmpCell.lastChild);
			} catch {
				null;
			}
			if (prevBoard[i][j] == "open" || prevBoard[i][j] == "flag") {
				if (prevBoard[i][j] == "flag") {
					markAsFlag(tmpCell);
				} else {
					openCell(i, j);
				}
			}
		}
	}
}

// Atualiza o slider de configurações
function updateSlider() {
	const bombSlider = document.getElementById("n-bombs");
	const gridSlider = document.getElementById("grid-size");
	bombSlider.setAttribute[("max", gridSlider.value)];
}

// Aplica as configurações
function applySettings() {
	const dimension = document.getElementById("grid-size").value;
	const nBombs = document.getElementById("n-bombs").value;
	//startBoard(dimension, nBombs);
}

// Executada quanto iniciado
document.addEventListener("DOMContentLoaded", () => {
	let startDimension = 6;
	let startBombsNumber = 5;
	startBoard(startDimension, startBombsNumber);
});

const allRanges = document.querySelectorAll(".slider");
allRanges.forEach((wrap) => {
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

// Variáveis de controle
const game = document.getElementById("game");
let bombs = [];
let tableDim = 0;
let minute = 0;
let second = 0;
let notFlag = 0;
let cron;
let cron_started = 0;
let lost = false;
let usedCheat = false;
let activeCheat = false;
let openedCells = 0;
let rivotril = false;
let xhttp;
let verifyWinFlag = 1;

// Setando o dia de hoje no formato yyyy-mm-dd.
let today =
	new Date().getFullYear() +
	"-" +
	new Date().getMonth() +
	"-" +
	new Date().getDay() +
	" " +
	new Date().getHours() +
	":" +
	new Date().getMinutes() +
	":" +
	new Date().getSeconds();

// Desabilita o clique com o botão direito
window.addEventListener("contextmenu", (e) => e.preventDefault());

// Função que realiza a mudança no texto do cronometro
function timer() {
	if (!rivotril) {
		second++;

		if (second == 60) {
			second = 0;
			minute++;
		}

		if (minute == 60) {
			minute = 0;
		}
	} else {
		if (!notFlag) {
			// Minuto inicial para o modo Rivotril
			let tmpSecond =
				(timerRivotril() - Math.floor(timerRivotril())) * 60;
			minute = Math.floor(timerRivotril());
			second = tmpSecond;
			second++;
			notFlag = 1;
		}

		second--;

		if (second < 0) {
			second = 59;
			minute--;
		}
	}
	updateTimer();

	if (rivotril && minute == 0 && second == 0) {
		loss();
	}
}

function updateTimer() {
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
	notFlag = 0;
	document.getElementById("minute").innerText = "00";
	document.getElementById("second").innerText = "00";
}

// Retorna o tempo para o modo rivotril
function timerRivotril() {
	return tableDim / 2;
}

// Função para definir o campo
function startBoard(dimensions, nBombs) {
	// Define o tamanho do tabuleiro e começa
	tableDim = dimensions;
	lost = false;
	bombs = [];
	cron_started = 0;
	openedCells = 0;
	resetTimer();
	pauseTimer();
	document.getElementById("grid-size").setAttribute("value", dimensions);
	document.getElementById("size-bubble").setAttribute("value", dimensions);
	document.getElementById("n-bombs").setAttribute("value", nBombs);
	document.getElementById("bomb-bubble").setAttribute("value", nBombs);

	// Define o tamanho individual de cada célula
	let size = (56 / dimensions / 100) * window.innerHeight - 2;

	// Gera as bombas
	while (bombs.length != nBombs) {
		let bombX = Math.floor(Math.random() * dimensions);
		let bombY = Math.floor(Math.random() * dimensions);
		if (!verifyIn(bombY, bombX, bombs)) {
			bombs.push([bombY, bombX]);
		}
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
		}
	}
}

// Clique em uma celula
async function cellClick(i, j) {
	if (cron_started == 0) {
		cron_started = 1;
		startTimer();
	}

	try {
		const clickedCell = document.getElementById(i + "-" + j);
		// Se a célula ainda nao está aberta ou usuário nao perdeu
		const bg = clickedCell.style.backgroundColor;
		if (bg != "rgb(48, 48, 48)" && lost == false) {
			let cell = openCell(i, j);
			if (cell == "bomb") {
				pauseTimer();
				loss();
			}

			if (cell == "empty") {
				cellClick(i + 1, j);
				cellClick(i + 1, j + 1);
				cellClick(i + 1, j - 1);

				cellClick(i - 1, j - 1);
				cellClick(i - 1, j);
				cellClick(i - 1, j + 1);

				cellClick(i, j + 1);
				cellClick(i, j - 1);
			}

			if (verifyWin() && verifyWinFlag) {
				pauseTimer();
				verifyWinFlag = 0;
				await new Promise((r) => setTimeout(r, 300));

				try {
					const wlGif = document.getElementById("wl-gif");
					wlGif.setAttribute("src", "../assets/win.gif");
				} catch (error) {
					const wlBox = document.getElementById("wl-box");
					const wlGif = document.createElement("img");
					wlGif.setAttribute("src", "../assets/win.gif");
					wlGif.setAttribute("id", "wl-gif");
					wlBox.appendChild(wlGif);
				}

				document.getElementById("text-wl").innerHTML = "Você ganhou =)";
				document.getElementById("tempo-wl").innerHTML = `Tempo: ${
					returnData(minute) + ":" + returnData(second)
				}`;
				document.getElementById(
					"pontuacao-wl"
				).innerHTML = `Pontuação: ${getPoints()}`;
				document.getElementById(
					"cells-wl"
				).innerHTML = `Células abertas: ${openedCells}`;

				if (rivotril) {
					let tempoInicial = timerRivotril() * 60;
					let tempoPassado = minute * 60 + second;

					// Tempo passado em segundos
					let tmpTempo = tempoInicial - tempoPassado;

					let minutosPassados = Math.floor(tmpTempo / 60);
					let segundosPassados = tmpTempo - minutosPassados * 60;
					document.getElementById("tempo-wl").innerHTML = `Tempo: ${
						returnData(minutosPassados) +
						":" +
						returnData(segundosPassados)
					}`;
				}

				// Adiciona o game no banco
				try {
					xhttp = new XMLHttpRequest();

					if (!xhttp) {
						alert(
							"Não foi possível criar um objeto XMLHttpRequest."
						);
						return false;
					}

					xhttp.onreadystatechange = function () {
						try {
							if (xhttp.readyState === XMLHttpRequest.DONE) {
								if (xhttp.status === 200) {
									let resposta = xhttp.responseText;
								} else {
									alert("Um problema ocorreu.");
								}
							}
						} catch (e) {
							alert("Ocorreu uma exceção: " + e.description);
						}
					};

					xhttp.open("POST", "../resources/insert_game.php", true);

					xhttp.setRequestHeader(
						"Content-Type",
						"application/x-www-form-urlencoded"
					);

					let tempoInicial = timerRivotril() * 60;
					let tempoPassado = minute * 60 + second;

					// Tempo passado em segundos
					let tmpTempo = tempoInicial - tempoPassado;

					let minutosPassados = Math.floor(tmpTempo / 60);
					let segundosPassados = tmpTempo - minutosPassados * 60;

					let params =
						"boardsize=" +
						encodeURIComponent(
							document.getElementById("grid-size").value
						) +
						"&numbombs=" +
						encodeURIComponent(
							document.getElementById("n-bombs").value
						) +
						"&gamemode=" +
						encodeURIComponent(
							rivotril == true ? "Rivotril" : "Normal"
						) +
						"&gametime=" +
						(rivotril == true
							? returnData(minutosPassados) * 60 +
							  returnData(segundosPassados)
							: returnData(minute) * 60 + returnData(second)) +
						"&datetime=" +
						encodeURIComponent(today) +
						"&score=" +
						encodeURIComponent(getPoints()) +
						"&result=" +
						encodeURIComponent(1);
					xhttp.send(params);
				} catch (e) {
					alert("Ocorreu uma exceção: " + e.description);
				}

				window.location.href = "#popup-wl";
			}
		}
	} catch (error) {}
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
				if (!activeCheat) {
					openedCells++;
				}
				return "number";
			} else {
				if (!activeCheat) {
					openedCells++;
				}
				return "empty";
			}
		}
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

// Reseta o jogo
function resetBoard(dimension, nBombs) {
	let i = 0;
	try {
		while (game.hasChildNodes || i == 1000) {
			game.removeChild(game.lastChild);
			i++;
		}
	} catch (error) {}
	usedCheat = false;
	verifyWinFlag = 1;
	startBoard(dimension, nBombs);
}

// Reseta o campo depois do final
function finalReset() {
	resetBoard(document.getElementById("grid-size").value, bombs.length);
	window.location.href = "#";
	window.location.reload();
}

// Reseta depois de mudar para rivotril
function resetRivotril() {
	resetBoard(document.getElementById("grid-size").value, bombs.length);
}

// Botão de Trapaça
async function activateCheat(s) {
	if (!usedCheat) {
		usedCheat = true;
	}
	activeCheat = true;

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
		activeCheat = false;
	}
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

// Determina a pontuação
function getPoints() {
	let score = tableDim * tableDim * bombs.length;
	if (rivotril) {
		score *= 1.5;
	}

	if (usedCheat) {
		score = 0;
	}

	return score;
}

// Muda o modo
function changeMode(mode) {
	resetRivotril();

	const buttonNormal = document.getElementById("normal-button");
	const buttonRivotril = document.getElementById("rivotril-button");
	switch (mode) {
		case "normal":
			rivotril = false;
			buttonNormal.style["color"] = "red";
			buttonRivotril.style["color"] = "black";
			break;
		case "rivotril":
			rivotril = true;
			buttonNormal.style["color"] = "black";
			buttonRivotril.style["color"] = "red";
			timer();
			break;
	}
}

// Verifica se o usuário ganhou
function verifyWin() {
	let closed = 0;
	for (let i = 0; i < tableDim; i++) {
		for (let j = 0; j < tableDim; j++) {
			if (
				document.getElementById(i + "-" + j).style.backgroundColor !=
				"rgb(48, 48, 48)"
			) {
				closed++;
			}
		}
	}
	if (closed == bombs.length) {
		return true;
	} else {
		return false;
	}
}

// Define o jogo como perdido
async function loss() {
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

	await new Promise((r) => setTimeout(r, 300));
	try {
		const wlGif = document.getElementById("wl-gif");
		wlGif.setAttribute("src", "../assets/loss.gif");
	} catch (error) {
		const wlBox = document.getElementById("wl-box");
		const wlGif = document.createElement("img");
		wlGif.setAttribute("src", "../assets/loss.gif");
		wlGif.setAttribute("id", "wl-gif");
		wlBox.appendChild(wlGif);
	}

	document.getElementById("text-wl").innerHTML = "Você perdeu =(";
	document.getElementById("tempo-wl").innerHTML = `Tempo: ${
		returnData(minute) + " : " + returnData(second)
	}`;
	document.getElementById("pontuacao-wl").innerHTML = "Pontuação: 0";
	document.getElementById(
		"cells-wl"
	).innerHTML = `Células abertas: ${openedCells}`;

	if (rivotril) {
		let tempoInicial = timerRivotril() * 60;
		let tempoPassado = minute * 60 + second;

		// Tempo passado em segundos
		let tmpTempo = tempoInicial - tempoPassado;

		let minutosPassados = Math.floor(tmpTempo / 60);
		let segundosPassados = tmpTempo - minutosPassados * 60;
		document.getElementById("tempo-wl").innerHTML = `Tempo: ${
			returnData(minutosPassados) + ":" + returnData(segundosPassados)
		}`;
	}

	// Adiciona o game no banco
	try {
		xhttp = new XMLHttpRequest();

		if (!xhttp) {
			alert("Não foi possível criar um objeto XMLHttpRequest.");
			return false;
		}

		xhttp.onreadystatechange = function () {
			try {
				if (xhttp.readyState === XMLHttpRequest.DONE) {
					if (xhttp.status === 200) {
						let resposta = xhttp.responseText;
						// alert(resposta);
					} else {
						alert("Um problema ocorreu.");
					}
				}
			} catch (e) {
				alert("Ocorreu uma exceção: " + e.description);
			}
		};

		xhttp.open("POST", "../resources/insert_game.php", true);

		xhttp.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);

		let tempoInicial = timerRivotril() * 60;
		let tempoPassado = minute * 60 + second;

		// Tempo passado em segundos
		let tmpTempo = tempoInicial - tempoPassado;

		let minutosPassados = Math.floor(tmpTempo / 60);
		let segundosPassados = tmpTempo - minutosPassados * 60;

		let params =
			"boardsize=" +
			encodeURIComponent(document.getElementById("grid-size").value) +
			"&numbombs=" +
			encodeURIComponent(document.getElementById("n-bombs").value) +
			"&gamemode=" +
			encodeURIComponent(rivotril == true ? "Rivotril" : "Normal") +
			"&gametime=" +
			(rivotril == true
				? returnData(minutosPassados) * 60 +
				  returnData(segundosPassados)
				: returnData(minute) * 60 + returnData(second)) +
			"&datetime=" +
			encodeURIComponent(today) +
			"&score=" +
			encodeURIComponent('0') +
			"&result=" +
			encodeURIComponent(0);
		xhttp.send(params);
	} catch (e) {
		alert("Ocorreu uma exceção: " + e.description);
	}

	window.location.href = "#popup-wl";
}

// Atualiza os valores dos sliders de acordo com a posição de inicio
function updateSliderValues() {
	const bombSlider = document.getElementById("n-bombs");
	const gridSlider = document.getElementById("grid-size");
	bombSlider.setAttribute("value", bombs.length);
	gridSlider.setAttribute("value", tableDim);
}

// Atualiza o slider de configurações
function updateSlider() {
	const bombSlider = document.getElementById("n-bombs");
	const gridSlider = document.getElementById("grid-size");
	let max = Math.round(gridSlider.value * gridSlider.value * 0.3);

	let prevValue = bombSlider.value;
	if (prevValue > max) {
		bombSlider.setAttribute("value", max);
		const bombBubble = document.getElementById("bomb-bubble");
		bombBubble.innerHTML = max;
	}

	bombSlider.setAttribute("max", max);
}

// Aplica as configurações
function applySettings() {
	const dimension = document.getElementById("grid-size").value;
	const nBombs = document.getElementById("n-bombs").value;
	resetBoard(dimension, nBombs);
	timer();
	window.location.href = "#";
}

// Mostra o valor dos sliders
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
	bubble.innerHTML = val;
}

// Retorna a cor do número
function getColor(n) {
	let dict = {
		1: "blue",
		2: "green",
		3: "red",
		4: "purple",
		5: "orange",
		6: "yellow",
		7: "pink",
		8: "white",
	};
	return dict[n];
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

// Executada quanto iniciado
document.addEventListener("DOMContentLoaded", () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	let startDimension = 6;
	let startBombsNumber = 5;

	// let startDimension = urlParams.get('sd');
	// let startBombsNumber = urlParams.get('sb');
	startBoard(startDimension, startBombsNumber);
});

// Executada para exibir o Popup
function showPopup(id) {
	const popup = document.getElementById(id);
	popup.style["display"] = "block";
}

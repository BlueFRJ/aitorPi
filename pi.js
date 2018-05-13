let settingsExits = 0;

function start() {
	const sizeField = document.querySelector('#size-field');
	totalIterations = sizeField.value;

	if (totalIterations) {
		var elem = document.getElementById('welcomeWrapper');
		elem.parentNode.removeChild(elem);
		// var configElem = document.getElementById('configuration');
		// configElem.parentNode.removeChild(configElem);

		var grid = document.createElement("div");
		grid.id = "grid";
		grid.className = "grid";
		var mainContent = document.getElementById('mainContent');
		mainContent.appendChild(grid);

		var timeToWait;

		for (let index = 1; index <= totalIterations; index++) {
			if (index != 1) {
				(function (index) {
					window.setTimeout(function () {
						resize(index);
					}, ((index - 1) * 2100) + (index * 2100));
				}(index));
			} else {
				resize(index);
			}
		}
	}
}

function createGridElems(size) {

	const body = document.getElementsByName('body');
	let totalGridElements = size ** 2;
	let previousTotalGridElements = (size - 1) ** 2;

	for (let i = previousTotalGridElements; i < totalGridElements; i++) {
		var currentElement = document.createElement("div");
		currentElement.className = "c" + pi.charAt(i);
		currentElement.className += ' gridElem';
		currentElement.style.order = i;
		currentElement.innerHTML = `<p style="font-size: calc(100vh/` + totalIterations + `/3)">` + pi.charAt(i) + `</p>`;

		var gridContainer = document.getElementById('grid');
		gridContainer.appendChild(currentElement);
	}
}

function resize(index) {
	var gridElements = document.getElementsByClassName('gridElem');

	var trainsitionWebkit = "-webkit-transition";

	//Resize previous elements
	for (let i = 0; i < (index - 1) ** 2; i++) {
		if (gridElements[i]) {
			gridElements[i].style.minWidth = "calc(100vw/" + index + ")";
			gridElements[i].style.minHeight = "calc(100vh/" + index + ")";
		}
	}
	setTimeout(function () {
		createGridElems(index);

		console.log("creatingGrid of " + index ** 2);
		gridElements = document.getElementsByClassName('gridElem');
		var minWidth = "min-width";
		var minHeight = "min-height";

		for (let i = (index - 1) ** 2; i < index ** 2; i++) {
			gridElements[i].style.minWidth = "calc(100vw/" + index + ")";
			gridElements[i].style.minHeight = "calc(100vh/" + index + ")";
			gridElements[i].style.visibility = "visible";
		}
	}, 1500);
}

function openSettings() {
	var welcome = document.getElementById('welcomeWrapper');
	welcome.style.opacity = '0';

	if (!settingsExits) {
		var settingsWrapper = document.createElement("div");
		settingsWrapper.className = "Absolute-Center";
		settingsWrapper.id = "settings";
		settingsWrapper.innerHTML = `
	<h1 id="welcomeTitle">Settings</h1>
	<div id="colorSelectors">
		<p>Enter grid size!</p>
		<input type="text" placeholder="Size" id="size-field" onkeydown="if (event.keyCode == 13){start()}">
	</div>
	<div id="settingsButtonsWrappers">
	<button onclick="cancel()" id="cancel"><i class="fas fa-ban"></i></button>
	<button onclick="save()" id="save"><i class="fas fa-check"></i></button>
	</div>`;

		var mainContainer = document.getElementById('mainContent');
		setTimeout(function () {
			mainContainer.appendChild(settingsWrapper);
		}, 1000);
		settingsExits = 1;
	} else {
		var settings = document.getElementById('settings');
		settings.style.opacity = '1';
		settings.style.visibility = 'visible';
	}


}

function cancel() {
	var settings = document.getElementById('settings');
	settings.style.opacity = '0';
	settings.style.visibility = 'hidden';

	var welcome = document.getElementById('welcomeWrapper');
	welcome.style.opacity = '1';
	welcome.style.visibility = 'visible';
}

function save() {
	var settings = document.getElementById('settings');
	settings.style.opacity = '0';
	settings.style.visibility = 'hidden';

	var welcome = document.getElementById('welcomeWrapper');
	welcome.style.opacity = '1';
	welcome.style.visibility = 'visible';
}
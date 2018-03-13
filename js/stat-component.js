
function PlayerStats(dropdownName) {
	this.playerImageEl = document.getElementsByClassName('player-picture')[0];
	this.nameEl = document.getElementsByClassName('player-name')[0];
	this.clubEl = document.getElementsByClassName('player-club')[0];
	this.positionEl = document.getElementsByClassName('player-position')[0];
	this.appearancesEl = document.getElementsByClassName('appearances')[0];
	this.goalsEl = document.getElementsByClassName('goals')[0];
	this.assistsEl = document.getElementsByClassName('assists')[0];
	this.gpmEl = document.getElementsByClassName('gpm')[0];
	this.ppmEl = document.getElementsByClassName('ppm')[0];

	this.dropdownName = dropdownName;
	let dataPromise = this.fetchPlayerData();
	dataPromise.then((responseText) => {
		let playerData = JSON.parse(responseText).players;
		this.players = {};
		for(var i = 0; i < playerData.length; i++) {
			var player = new Player(playerData[i]);
			this.players[player.id] = player;
		}
		
		this.populateDropdown();

	}).catch((error) => {
		console.log(error);
	});
}


PlayerStats.prototype.fetchPlayerData = () => {
	return new Promise((resolve, reject) => {	
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "data/player-stats.json");
		xhr.onload = () => resolve(xhr.responseText);
		xhr.onerror =  () => reject(xhr.statusText);
		xhr.send();
	});
}



PlayerStats.prototype.xhrHandler = function(event) {
	this.data = JSON.parse(event.currentTarget.response);
}

PlayerStats.prototype.populateDropdown = function() {
	var dropdownDiv = document.getElementsByClassName(this.dropdownName)[0];
	var selectEl = dropdownDiv.getElementsByTagName('select')[0];
	for(id in this.players) {
		var player = this.players[id];
		var option = document.createElement('option');
		option.innerHTML = player.name;
		option.value = player.id;
		selectEl.appendChild(option);
	}
	
	dropdownDiv.className = 'player-select slate';
	selectEl.addEventListener('change', this.changeHandler.bind(this));
}

PlayerStats.prototype.changeHandler = function(event) {
	this.updateComponent(event.srcElement.selectedOptions[0].value);
}

PlayerStats.prototype.updateComponent = function(id) {
	this.selectedPlayer = this.players[id];
	this.playerImageEl.src = this.selectedPlayer.image;
	this.nameEl.innerHTML = this.selectedPlayer.name;
	this.positionEl.innerHTML = this.selectedPlayer.position;
	this.appearancesEl.innerHTML = this.selectedPlayer.stats.appearances;
	this.goalsEl.innerHTML = this.selectedPlayer.stats.goals;
	this.assistsEl.innerHTML = this.selectedPlayer.stats.goal_assist;
	this.gpmEl.innerHTML = this.selectedPlayer.stats.goalsPerMatch;
	this.ppmEl.innerHTML = this.selectedPlayer.stats.passesPerMin;

	this.clubEl.style.backgroundPosition = this.selectedPlayer.badgePosition.left + 'px ' + this.selectedPlayer.badgePosition.top + 'px';
}


window.com = window.com || {};
window.com.PlayerStats = new PlayerStats('player-select');
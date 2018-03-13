function Player(data) {
	this.id = data.player.id;
	this.name = data.player.name.first + ' ' + data.player.name.last;
	this.position = this.parsePlayerPosition(data.player.info.positionInfo);
	this.image = this.getImageURL(this.id);
	this.stats = this.setStats(data.stats);
	this.badgePosition = this.determineLogoPosition(data.player.currentTeam.shortName.toLowerCase());
}


Player.prototype.parsePlayerPosition = function(value) {
     let positionParts = value.split(' ');
     return positionParts[positionParts.length -1];
}

Player.prototype.getImageURL = function(id) {
	return 'assets/p'+id+'.png';
} 

Player.prototype.setStats = function(data) {
	let requiredStats = ['goals', 'appearances', 'goal_assist', 'fwd_pass', 'backward_pass', 'mins_played'];
	let stats = {};
	for(var i = 0; i<data.length; i++) {
		if(requiredStats.indexOf(data[i].name) > -1) {
			stats[data[i].name] = data[i].value;
		}
	}
	stats.goalsPerMatch = Math.round((stats.goals / stats.appearances) * 100) / 100;
	stats.passesPerMin = Math.round((stats.fwd_pass + stats.backward_pass) / stats.mins_played * 100) / 100;

	return stats;
}

Player.prototype.badgePositions = {
	"spurs" : {x: 5, y: 10},
	"man city" : {x: 8, y: 7},
	"man utd" : {x: 6, y: 8},
	"arsenal" : {x: 1, y: 1},
	"leicester" : {x: 0, y: 0},
};

Player.prototype.determineLogoPosition = function(teamName) {
	var top = this.badgePositions[teamName].y * -100;
	var left = this.badgePositions[teamName].x * -100;
	return {top: top, left: left};
}
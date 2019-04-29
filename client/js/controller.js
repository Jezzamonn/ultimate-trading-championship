import World from "./world";
import Fight from "./fight/fight";

export default class Controller {

	constructor() {
		this.world = new World(this);
		this.fight = null;

		this.stateCount = 0;
	}

	update(dt) {
		this.stateCount += dt;

		this.world.update(dt);

		if (this.fight) {
			this.fight.update(dt);
			if (this.fight.done) {
				this.fight.endFight();
				this.fight = null;
			}
		}
		else {
			if (this.stateCount >= 1) {
				window.socket.emit('player-update', this.world.player.getUpdateData());
			}
		}

		this.stateCount %= 1;
	}

	worldUpdate(data) {
		this.world.updateCoins(data.coins);
		this.world.updatePlayers(data.players);
	}

	startFight(player1, player2) {
		this.fight = new Fight(this, player1, player2);
		this.fight.start();
	}

	onMouseClick(clickPos) {
		if (this.fight) {
			// Don't pass on input if we're in a fight baby
			return;
		}
		this.world.onMouseClick(clickPos);
	}

	render() {
		this.world.canvasManager.clear();
		this.world.render();

		if (this.fight) {
			this.fight.canvasManager.clear();
			this.fight.render();
		}
	}

	resize() {
		this.world.canvasManager.resize();

		if (this.fight) {
			this.fight.canvasManager.resize();
		}
	}

}

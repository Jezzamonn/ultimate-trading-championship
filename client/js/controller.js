import World from "./world";
import Fight from "./fight/fight";

export default class Controller {

	constructor() {
		this.world = new World(this);
		this.fight = null;
	}

	update(dt) {
		this.world.update(dt);
		if (this.fight) {
			this.fight.update(dt);
			if (this.fight.done) {
				this.fight.endFight();
				this.fight = null;
			}
		}
	}

	startFight(player1, player2) {
		this.fight = new Fight(this, player1, player2);
		document.querySelector('.fight').classList.add('fight-shown');
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

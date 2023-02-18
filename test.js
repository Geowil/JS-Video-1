var globalTest = "Hello World!";
let numTest = 1;
let decimalTest = 3.14;
let boolTest = true;

console.log(numTest === true);

let listTest1 = [
	1,
  2,
  3
];

let listTest2 = [
	4,
  5,
  6
];

let listTest3 = [
	7,
  8,
  9
];

let additionList = [];
additionList = listAdder(listTest1, listTest2, additionList);
additionList = listAdder(listTest2, listTest3, additionList);
additionList = listAdder(listTest1, listTest3, additionList);
console.log(additionList);

//JavaScript Object Notation - JSON
let objectTest1 = {
	Name: "Jane Doe",
  Age: 35,
  Occupation: "Construction"
};

let objectTest2 = {
	Name: "John Doe",
  Age: 25,
  Occupation: "Accountant",
  Years: 10,
	Salary: 34000
};

displayUserData(objectTest1);
displayUserData(objectTest2);

function displayUserData(userData) {
	for (let key in userData) {
  	console.log(key + ": " + userData[key]);
  }
}


test();

function test() {
	let localTest = "World, Hello - Test";
	if (true) {
  	console.log(localTest);
  }
	console.log(globalTest);
  console.log(localTest);
  test2();
}

function test2() {
  console.log(objectTest);
}

function listAdder(list1, list2, outputList) {
	for (let i1 = 0; i1 < list1.length; i1++) {
    outputList.push(list1[i1] + list2[i1]);
  }

  return outputList;
}

class entity {
	#name;
	#weapon;
	#hp;

	constructor(name, weapon, hp) {
		this.#name = name;
		this.#weapon = weapon;
		this.#hp = hp;
	}

	getName() { return this.#name; }
	getHp() { return this.#hp; }
	doDamage() {
		return Math.floor(Math.random(this.#weapon.Atk * 0.45, this.#weapon.Atk) * 100);
	}

	takeDamage(dmg) {
		this.#hp = (this.#hp - dmg < 0 ? 0 : this.#hp - dmg);
	}

	changeWeapon(wep) { this.#weapon = wep;	}
}
class player extends entity {
	#cls;
	#inventory;
	#gold;

	constructor(name, cls, inv, weapon, hp, gold) {
		super(name, weapon, hp);
		this.#cls = cls;
		this.#inventory = inv;
		this.#gold = gold;
	}

	getClass() { return this.#cls; }
	getInventoryIds() {
		let invList = this.#inventory.filter(inv => inv && inv.Amount >= 3)
			.reduce((idList, inv) => {
				idList.push(inv.Id);
				return idList;
			}, []);

		return invList;
	}

	getInventory() { return this.#inventory; }
	getInventoryById(id) {
		let itemData = this.#inventory.find(inv => inv && inv.Id == id);
		if (itemData) {
			return itemData;
		}

		return {Id: 0, Amount: 0};
	}

	addItemToInventory(id, amt) {
		let itemData = this.#inventory.find(inv => inv && inv.Id == id);
		if (itemData) {
			itemData.Amount += amt;
		} else {
			this.#inventory.push({Id: id, Amount: amt});
		}
	}

	removeItemToInventory(id, amt) {
		let itemData = this.#inventory.find(inv => inv && inv.Id == id);
		if (itemData) {
			if (itemData.Amount - amt <= 0) {
				let itemIndex = this.#inventory.findIndex(ele => ele && ele == itemData);
				this.#inventory.splice(itemIndex, 1);
			} else {
				itemData.Amount -= amt;
			}
		}
	}

	getGold() { return this.#gold; }
	changeGold(operation, amt) {
		switch(operation.toLowerCase()) {
			case 'set':
				this.#gold = amt;
				break;

			case 'add':
				this.#gold += amt;
				break;

			case 'sub':
				this.#gold = (this.#gold - amt < 0 ? 0 : this.#gold - amt);
				break;

			default:
				break;
		}
	}
}

class monster extends entity {
	#rewards;

	constructor(name, weapon, hp, rewards) {
		super(name, weapon, hp);
		this.#rewards = rewards;
	}

	getRewards() { return this.#rewards; }
}

let pl = new player("Bob", "Novice", [{Id:1, Amount: 10}], {Name:"Sword", Atk: 5}, 20, 10);
let m = new monster("Bat", {Name:"Claws", Atk: 20}, 10, {Exp: 20});

console.log(pl.getHp());
pl.takeDamage(5)
console.log(pl.getHp());
console.log(pl.getInventoryById(1));
console.log(m.getRewards());
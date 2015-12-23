console.log("Intek main.js up and working!");
$("#title").html("INTEK");
var metal = 150;
var crystal = 150;
var fuel = 250;
var credits = 2000; //I like changing values in JS to give myself money, so you can too! :3
//2: good (w3-green), 1: damaged (w3-orange), 0: might die soon (w3-red), -1: destroyed (w3-black)
var lifesupportstat = 2; //if -1, die
var enginestat = 2; //if -1, cannot move. unless you have repair system and enough metal to repair or you're at a repair station/planet and have enough credits to afford it, end game
var systemSlots = [["Miner", 1], [null, -1]] //Array of [displayedname, status]. Applies to slots 3 and above.
var slotHTMLs = ["#slot3", "#slot4"]
var dam = "(Slightly Damaged)";
var crit = "(Damaged)";
var dest = "(Destroyed)"; 
var planetresources = [2000, 2000, 2000]; //crystals, metal, fuel
var cD = function(systemSlotsItem) {
	if (systemSlotsItem[0]) {
	switch(systemSlotsItem[1]) {
		case 2:
			return systemSlotsItem[0] + " "
		case 1:
			return systemSlotsItem[0] + " " + dam;
		case 0:
			return systemSlotsItem[0] + " " + crit;
		case -1:
			return systemSlotsItem[0] + " " + dest;
	}} else {
		return "Empty System Slot"
	}
};

var tick = function() {
	$("#creditC").html(String(credits));
	$("#fuelC").html(String(metal));
	$("#crystalC").html(String(fuel));
	$("#metalC").html(String(metal));
	for (var i in slotHTMLs) {
		$(slotHTMLs[i]).html(cD(systemSlots[i]))
		switch(systemSlots[i][1]) {
			case 2:
				$(slotHTMLs[i]).attr("class", "tcc w3-green");
				break;
			case 1:
				$(slotHTMLs[i]).attr("class", "tcc w3-orange");
				break;
			case 0:
				$(slotHTMLs[i]).attr("class", "tcc w3-red");
				break;
			case -1:
				if (systemSlots[i][0]) {
					$(slotHTMLs[i]).attr("class", "tcc w3-black");
				} else {
					$(slotHTMLs[i]).attr("class", "tcc w3-grey");
				}
				break;
		}
	}
};
var mine = function() {
	var canMine = false
	var minerslot = null
	for (var i in systemSlots) {
		if (systemSlots[i][0] == "Miner" && systemSlots[i][1] != -1) {
			canMine = true
			minerslot = i
		}
	}
	if (canMine) {
		if (planetresources[0] < 100) {
			metal = metal + planetresources[0];
			planetresources[0] = 0;
		} else {
			var rand = Math.floor((Math.random() * 100) + 1);
			planetresources[0] = planetresources[0] - rand;
				metal = metal + rand;
		}
		if (planetresources[1] < 100) {
			crystal = crystal + planetresources[0];
			planetresources[1] = 0;
		} else {
			rand = Math.floor((Math.random() * 100) + 1);
			planetresources[1] = planetresources[1]- rand;
			crystal = crystal + rand;
		}
		if (planetresources[2] < 50) {
			fuel = fuel + planetresources[0];
			planetresources[2] = 0;
		} else {
			rand = Math.floor((Math.random() * 50) + 1);
			planetresources[2] = planetresources[2] - rand;
			fuel = fuel + rand;
		}
		rand = Math.floor((Math.random() * 6) + 1);
		if (rand == 1) {
			systemSlots[minerslot][1] = systemSlots[minerslot][1] - 1
		}
		tick()
	} else {
		alert("Can't mine, no miner!")
	}
}

tick()
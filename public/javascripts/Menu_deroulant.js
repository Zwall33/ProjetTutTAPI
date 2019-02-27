function actif(str) {
	var active = document.getElementById("active");
	
	active.id = active.className;

	var y = document.getElementById(str);
	y.id = "active";

	if(y.className == "#Releves" && y.id == "active"){
		for (var i = 0; i < 4; i++) {
			document.getElementById("ferme").id = "ouvert";
		}
	} else {
		for (var i = 0; i < 4; i++) {
			document.getElementById("ouvert").id = "ferme";
		}
	}

	return 1;
}
function updateBackground() {
	var dateObj = new Date();
	var hours = dateObj.getHours();
	var minutes = dateObj.getMinutes();
	var seconds = dateObj.getSeconds();
	// check to make sure there is a leading 0
	if (seconds/10 < 1){
		seconds = "0" + seconds.toString();
	}
	if (minutes/10 < 1){
		minutes = "0" + minutes.toString();
	}
	if (hours/10 < 1){
		hours = "0" + hours.toString();
	}
	var hexCode = "#" + hours + minutes + seconds;
	var body = document.getElementById("background");
	body.style.background = hexCode;
	var timeDiv = document.getElementById("time");
	var hexDiv = document.getElementById("hex");
	timeDiv.innerHTML = hours + " : " + minutes + " : " + seconds;
	hexDiv.innerHTML = hexCode;

	setInterval(updateBackground, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
	updateBackground();
});

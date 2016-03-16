function toggleBootstrap() {
	if(document.getElementById("btspidnm") == null) {
		addBootstrap();
	} else {
		removeBootstrap();
	}
}

function addBootstrap() {
	var link  = document.createElement('link');
	link.id   = "btspidnm";
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
	link.media = 'all';
	document.getElementsByTagName('head')[0].appendChild(link);
	document.getElementsByTagName('body')[0].classList.add("container-fluid");
}

function removeBootstrap() {
	var link = document.getElementById("btspidnm");
	link.parentNode.removeChild(link);
	document.getElementsByTagName('body')[0].classList.remove("container-fluid");
}
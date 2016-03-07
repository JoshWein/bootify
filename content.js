function addBootstrap() {
	var link  = document.createElement('link');
	link.id   = "btspidnm";
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
	link.media = 'all';
	document.getElementsByTagName('head')[0].appendChild(link);
}

var url = -1;
	chrome.runtime.sendMessage({method: "getUrl"}, function(response) {			
			url = response;
	});
chrome.storage.sync.get({
	list: "Enter websites here"
}, function(items) {
	var websites = items.list.split(" ");    
	for(var i = 0; i < websites.length; i++) {
		if(url.substring(0, websites[i].length) == websites[i]) {
			addBootstrap();
			break;
		}
	}
});

function addBootstrap() {
	if(document.getElementById("btspidnm") == null) {
		var link  = document.createElement('link');
		link.id   = "btspidnm";
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
		link.media = 'all';	
		document.getElementsByTagName('head')[0].appendChild(link);
		document.getElementsByTagName('body')[0].classList.add("container-fluid");
	}
}

function toggleBootstrap(arg) {
	if(arg == 1) {
		if(document.getElementById("btspidnm") == null) {
			addBootstrap();
		} else {
			removeBootstrap();
		}
	} else { // Check if it's in the saved list of sites
		var url;
		chrome.runtime.sendMessage({method: "getUrl"}, function(response) {			
  			url = response;
		});
		chrome.storage.sync.get({
			list: "Enter websites here"
		}, function(items) {
			var websites = items.list.split(" ");    
			for(var i = 0; i < websites.length; i++) {
				if(websites[i] == url)
					toggleBootstrap(1);
			}
		});
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

toggleBootstrap(2);

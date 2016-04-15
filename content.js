function toggleBootstrap() {
	if(document.getElementById("btspidnm") == null) {
		addBootstrap();				
	} else {
		removeBootstrap();
	}
}

function addBootstrap() {
	if(document.getElementById("btspidnm") == null) {
		var link  = document.createElement('link');
		// Create an element with an id that should never exist so it doesn't conflict with anything
		link.id   = "btspidnm";
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
		link.media = 'all';	
		document.getElementsByTagName('head')[0].appendChild(link);
		document.getElementsByTagName('body')[0].classList.add("container-fluid");
		chrome.runtime.sendMessage({method: "addIcon"}); // Update icon to "on"
	}
}

function removeBootstrap() {
	if(document.getElementById("btspidnm") != null) {
		var link = document.getElementById("btspidnm");
		link.parentNode.removeChild(link);
		document.getElementsByTagName('body')[0].classList.remove("container-fluid");	
		chrome.runtime.sendMessage({method: "disableIcon"}); // Update icon to "off"
	}
}

function addToList() {
	chrome.runtime.sendMessage({method: "getUrl"}, function(response) {	
		chrome.storage.sync.get({
			list: "Enter websites here"
		}, function(items) {
			if(items.list.indexOf(response) == -1) {
				items.list += response + "\n";   
				chrome.storage.sync.set({
				    list: items.list    
				  }, function() {
				  	addBootstrap();
				  });
			}
		});
	});	
}

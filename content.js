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
		if(document.getElementById("btspclid") == null) {
			var oldBodyHtml = document.getElementsByTagName('body')[0].innerHTML;
			var newBodyHtml = "<div class='row' id='btspclid'><div class='col-sm-12 col-md-12 col-lg-12'>" + oldBodyHtml + "</div></div>";
			document.getElementsByTagName('body')[0].innerHTML = newBodyHtml;
		}
		var tables = document.getElementsByTagName('table');
		for(var i = 0; i < tables.length; i++)
			document.getElementsByTagName('table')[i].classList.add("table");
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
			list: ""
		}, function(items) {
			if(items.list.indexOf(response) == -1) {
				items.list += response + "\n";   
				chrome.storage.sync.set({
				    list: items.list    
				  }, function() {
				  	addBootstrap();
				  });
			}
			chrome.runtime.sendMessage({method: "siteNotInList"});
		});
	});	
}

function removeFromList() {
	chrome.runtime.sendMessage({method: "getUrl"}, function(response) {	
		chrome.storage.sync.get({
			list: ""
		}, function(items) {
			if(items.list.indexOf(response) != -1) {
				var temp = items.list.replace(response+"\n", "");
				items.list += response + "\n";   
				chrome.storage.sync.set({
				    list: temp
				}, function() {
					removeBootstrap();
				});
				chrome.runtime.sendMessage({method: "siteNotInList"});
			}
		});
	});	
}

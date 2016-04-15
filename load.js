chrome.runtime.sendMessage({method: "getUrl"}, function(response) {				
		chrome.storage.sync.get({
			list: "Enter websites here"
		}, function(items) {
			var websites = items.list.split("\n");  
			for(var i = 0; i < websites.length; i++) {
				if(websites[i].length != 0 && response.substring(0, websites[i].length) == websites[i]) {
					chrome.runtime.sendMessage({method: "addBootstrap"});
					break;
				}
			}
		});
});

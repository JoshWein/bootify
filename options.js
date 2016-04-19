// Saves options to chrome.storage
function save_options() {
  var list = document.getElementById('websitelist').value;
  var parser = list.split("\n");
  list = "";
  for(var i = 0; i < parser.length; i++) {
    parser[i] = (parser[i].split(" "))[0];
    if(parser[i].length != 0)
      list += parser[i] + "\n";
  }
  chrome.storage.sync.set({
    list: list    
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.innerHTML = '<h3>Options saved.</h3>';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


function restore_options() {
  chrome.storage.sync.get({
    list: ""
  }, function(items) {
    document.getElementById('websitelist').value = items.list;    
  });
}

function clear_options() {
	document.getElementById('websitelist').value = "";
	chrome.storage.sync.set({
    list: document.getElementById('websitelist').value
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.innerHTML = '<h3>Options cleared.</h3>';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('clear').addEventListener('click',
    clear_options);
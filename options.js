// Saves options to chrome.storage
function save_options() {
  var list = document.getElementById('websitelist').value.replace(/ /g,"\n");  
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
    document.getElementById('websitelist').value = items.list.replace(/ /g,"\n");    
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
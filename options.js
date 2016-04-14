// Saves options to chrome.storage
function save_options() {
  var list = document.getElementById('websitelist').value;  
  chrome.storage.sync.set({
    list: list    
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


function restore_options() {
  chrome.storage.sync.get({
    list: "Enter websites here"
  }, function(items) {
    document.getElementById('websitelist').value = items.list;    
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
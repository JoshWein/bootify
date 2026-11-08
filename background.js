// Runs content.js in the tab, then calls one of its functions there.
function runInTab(tabId, fnName) {
  chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["content.js"] }, function () {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message); // e.g. chrome:// pages
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: function (name) { window[name](); },
      args: [fnName]
    });
  });
}

// Called when the user clicks on the toolbar icon.
chrome.action.onClicked.addListener(function (tab) {
  runInTab(tab.id, "toggleBootstrap");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var tabId = sender.tab && sender.tab.id;
  if (request.method == "addIcon") {
    chrome.action.setIcon({ tabId: tabId, path: "icon48.png" });
  } else if (request.method == "disableIcon") {
    chrome.action.setIcon({ tabId: tabId, path: "icon16dis.png" });
  } else if (request.method == "getUrl") {
    sendResponse(sender.url);
  } else if (request.method == "addBootstrap") {
    runInTab(tabId, "addBootstrap");
  }
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "addToList",
    title: "Add current site to website list",
    contexts: ["action", "page"]
  });
  chrome.contextMenus.create({
    id: "removeFromList",
    title: "Remove current site from website list",
    contexts: ["action", "page"]
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "addToList" || info.menuItemId == "removeFromList") {
    runInTab(tab.id, info.menuItemId);
  }
});

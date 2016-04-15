// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.tabs.executeScript(null, {file: "content.js"}, function() {
    chrome.tabs.executeScript(null, {code: "toggleBootstrap();"});
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getStatus")
      sendResponse({status: localStorage['list']});
    else
      sendResponse(sender.url);
});



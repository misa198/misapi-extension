/* global chrome */
const urlRegex = new RegExp(/^https:\/\/shopee.vn\/.+$/);

chrome.tabs.onActivated.addListener(function(info) {
  chrome.tabs.get(info.tabId, function(change) {
    if (change.url === undefined) {
      // Url is null
      chrome.browserAction.setPopup({
        tabId: info.tabId,
        popup: "popup.html"
      });
      chrome.browserAction.setIcon({
        path: "images/icon-16-disabled.png",
        tabId: info.tabId
      });
    } else if (change.url.match(urlRegex) === null) {
      // Url not match
      chrome.browserAction.setPopup({
        tabId: info.tabId,
        popup: "popup.html"
      });
      chrome.browserAction.setIcon({
        path: "images/icon-16-disabled.png",
        tabId: info.tabId
      });
    } else {
      // Url match
      chrome.browserAction.setPopup({
        tabId: info.tabId,
        popup: "index.html"
      });
      chrome.browserAction.setIcon({
        path: "images/icon-16.png",
        tabId: info.tabId
      });
    }
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (tab.url === undefined) {
    return;
  } else if (tab.url.match(urlRegex) === null) {
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: "popup.html"
    });
    chrome.browserAction.setIcon({
      path: "images/icon-16-disabled.png",
      tabId: tabId
    });
  } else {
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: "index.html"
    });
    chrome.browserAction.setIcon({ path: "images/icon-16.png", tabId: tabId });
  }
});

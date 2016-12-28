var converter = new showdown.Converter({tables: true});
// Update the relevant fields with the new data
function parseDOMspans(info) {
  var validatedSpans = info.spans;
  var longStr = validatedSpans.join('');
  var replaced = longStr.replace(/\&nbsp\;/g, '\n');
  $('.rendered-markdown').append(converter.makeHtml(replaced));
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called
        //    from the receiving end (content script)
        parseDOMspans);
  });
});

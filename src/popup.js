var converter = new showdown.Converter({tabls: true});
// Update the relevant fields with the new data
function parseDOMspans(info) {
  var validatedSpans = info.spans;
  $.each(validatedSpans, function(i, val){
    console.log(val);
      let nodeText = val;
      $('.rendered-markdown').append(converter.makeHtml(nodeText));
  });
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

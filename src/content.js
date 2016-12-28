// Inform the background page that
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var spanList = document.querySelectorAll('div.kix-paragraphrenderer span');
    var spanArr = [];
    spanList.forEach(function(foundSpan, i){
      if (foundSpan.childNodes.length > 0 && foundSpan.childNodes[0].childNodes.length ==0 && foundSpan.childNodes[0].data  != undefined){
          if(foundSpan.innerHTML == "&nbsp;"){
            spanArr.push('&nbsp;');
          } else {
            if(foundSpan.innerText.substr(foundSpan.innerText.length - 1) == ' '){
              spanArr.push(foundSpan.innerText.slice(0, -1));
            } else {
              spanArr.push(foundSpan.innerText);
            }
          }
      }
    });
    var domInfo = {
      spans: spanArr
    };

    // Directly respond to the sender (popup),
    // through the specified callback */
    response(domInfo);
  }
});

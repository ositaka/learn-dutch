
// Put following code on the top of head element:

; (function () {
  var pushState = history.pushState;
  var replaceState = history.replaceState;

  history.pushState = function () {
    pushState.apply(history, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
  };

  history.replaceState = function () {
    replaceState.apply(history, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
  };

  window.addEventListener('popstate', function () {
    window.dispatchEvent(new Event('locationchange'))
  });

})();

function getExpressionsOnPage() {
  let allDutchExpressions = document.querySelectorAll('blockquote > p');

  console.log(allDutchExpressions);

  allDutchExpressions.forEach(expression => {
    console.log(expression.innerText);

    var buttonBE = document.createElement('div');
    buttonBE.classList.add('button-speech');
    buttonBE.innerHTML = "<button>🇧🇪</button>";

    expression.parentElement.insertBefore(buttonBE, expression.nextSibling);

    buttonBE.addEventListener('click', () => {
      var s = expression.innerText;
      var n = s.indexOf('\n— ');
      s = s.substring(0, n != -1 ? n : s.length);
      console.log(s);

      var sv = new SpeechSynthesisUtterance(s);
      sv.lang = "nl-BE";
      sv.rate = 0.82;
      sv.pitch = 1;
      window.speechSynthesis.speak(sv);
    })

    var buttonNL = document.createElement('div');
    buttonNL.classList.add('button-speech');
    buttonNL.innerHTML = "<button>🇳🇱</button>";

    expression.parentElement.insertBefore(buttonNL, expression.nextSibling);

    buttonNL.addEventListener('click', () => {
      var s = expression.innerText;
      var n = s.indexOf('\n— ');
      s = s.substring(0, n != -1 ? n : s.length);
      console.log(s);

      var sv = new SpeechSynthesisUtterance(s);
      sv.lang = "nl-NL";
      sv.rate = 0.82;
      sv.pitch = 1;
      window.speechSynthesis.speak(sv);
    })
  })
}

// Usage example:

window.addEventListener('locationchange', function () {
  console.log('onlocationchange event occurred!');

  setTimeout(() => {
    getExpressionsOnPage()

  }, 100);

})

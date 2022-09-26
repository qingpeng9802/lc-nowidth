'use strict';

function contentScript(isFirstTime) {
  //console.log('start');

  const n1 = document.getElementById('app')?.children[0];
  //n1 ?  console.log(n1.style.minWidth): undefined;
  (n1 && n1.style.minWidth !== '0px') ?  n1.style.minWidth = '0px' : undefined;

  const n2 = document.getElementById('discuss-container')?.children[0]?.children[0]?.children[1]?.children[1];
  //n2 ?  console.log(n2.style.minWidth): undefined;
  (n2 && n2.style.minWidth !== '0px') ?  n2.style.minWidth = '0px' : undefined;

  // Only execute above functions when first time call `contentScript()`
  if (isFirstTime) {
    pageMO();
  }

};

/** TimeoutID (must be global) */
let timeoutID = null;

/** Detect mutation in the page */
const pageMO = function () {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  const obNode = document.body;
  const observer = new MutationObserver(function (mutations) {
    // Call when detect a mutation
    //Test
    //console.log(mutations);

    // Wait for finishing DOM tree reconstruct
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }
    timeoutID = setTimeout(function () {
      contentScript(false);
    }, 300);

  });
  const config = { childList: true, subtree: true };
  observer.observe(obNode, config);
};

contentScript(true);
const upsellPaths = [
    '1/index.html',   // Upsell 1
    '2/index.html',   // Upsell 2
    '3/index.html',   // Upsell 3
    '4/index.html',   // Upsell 4
    '5/index.html',   // Upsell 5
    '6/index.html',   // Upsell 6
    '7/index.html',   // Upsell 7
    '8/index.html',   // Upsell 8
    '9/index.html',   // Upsell 9
    '10/index.html',  // Upsell 10
    '11/index.html',  // Upsell 11
    '12/index.html',  // Upsell 12
  ];
  
  const finalDestination = 'https://pt.org.br/';
  
  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    
    return null;
  }
  
  function setCookie(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }
  
  function markUpsellAsVisited(upsellNumber) {
    if (upsellNumber >= 1 && upsellNumber <= 10) {
      setCookie(`visited_upsell_${upsellNumber}`, 'true', 30);
    }
  }
  
  function hasVisitedUpsell(upsellNumber) {
    return getCookie(`visited_upsell_${upsellNumber}`) === 'true';
  }

  function getNextUpsellIndex() {
    for (let i = 0; i < upsellPaths.length; i++) {
      if (!hasVisitedUpsell(i + 1)) {
        return i;
      }
    }
    return -1; 
  }
  
 

  function redirectToNextUpsell() {
    const nextUpsellIndex = getNextUpsellIndex();
    const queryString = window.location.search; // Obtém a query string atual da URL
    
    if (nextUpsellIndex >= 0) {
      // Anexa a query string à URL da próxima upsell
      window.location.href = upsellPaths[nextUpsellIndex] + queryString;
    } else {
      // Anexa a query string à URL de destino final
      window.location.href = finalDestination + queryString;
    }
  }

  function initUpsell(currentUpsellNumber) {
    markUpsellAsVisited(currentUpsellNumber);
    console.log(`Upsell ${currentUpsellNumber} carregado e marcado como visitado.`);
  }
  
  window.redirectToNextUpsell = redirectToNextUpsell;
  window.initUpsell = initUpsell;


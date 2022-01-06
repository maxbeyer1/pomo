import { useState, useEffect } from 'react';

/* Credit to Seth Corker: https://blog.sethcorker.com/harnessing-the-page-visibility-api-with-react/ */
export function getBrowserVisibilityProp() {
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    return 'visibilitychange';
  } if (typeof document.msHidden !== 'undefined') {
    return 'msvisibilitychange';
  } if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitvisibilitychange';
  }

  return 'visibilitychange';
}

export function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== 'undefined') {
    return 'hidden';
  } if (typeof document.msHidden !== 'undefined') {
    return 'msHidden';
  } if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitHidden';
  }

  return 'hidden';
}

export function getIsDocumentHidden() {
  return !document[getBrowserDocumentHiddenProp()];
}

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());

  useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp();

    document.addEventListener(visibilityChange, onVisibilityChange, false);

    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChange);
    };
  });

  return isVisible;
}

import { encodeUrl } from "../utilities/urlUtility.js";
import { decodeUrl } from "../utilities/urlUtility.js";

export const getAppState = () => {
  // Deep link to current path...
  const path = window.location.pathname && window.location.pathname !== "/"
    ? decodeUrl(window.location.pathname)
    : "";

  // TODO: Add deep linking for additional app state...

  return {
    path
  };
};

export const updatePath = (path) => {
  const encodedPath = encodeUrl(path);
  window.history.pushState({ data: path }, "", encodedPath === "" ? "/" : encodedPath);
};

let contentUpdatedCallbacks = [];
export const subscribeToContentUpdate = (handler) => {
  contentUpdatedCallbacks.push(handler);
};

export const unsubscribeFromContentUpdate = (handler) => {
  for (let i = 0; i < contentUpdatedCallbacks.length; i++) {
    if (contentUpdatedCallbacks[i] === handler)
      contentUpdatedCallbacks.splice(i, 1);
  }
};

export const contentUpdated = () => {
  for (let i = 0; i < contentUpdatedCallbacks.length; i++) {
    contentUpdatedCallbacks[i]();
  }
};
import { encodeUrl } from "../utilities/urlUtility.js";
import { decodeUrl } from "../utilities/urlUtility.js";

/**
 * Utility function for returning the current state of the application. It
 * pulls and decodes the URL path, placing any state in a state object and
 * returns it.
 * @returns {object} Returns the object containing all the application's
 * current state.
 */
export const getAppState = () => {
  // Deep link to current path...
  const path = window.location.pathname && window.location.pathname !== "/"
    ? decodeUrl(window.location.pathname)
    : "";

  // TODO: Add deep linking for additional app state...

  return {
    path,
    // TODO: Add additional state
  };
};

/**
 * Utility function for updating the currently viewed directory path.
 */
export const updatePath = (path) => {
  const encodedPath = encodeUrl(path);
  window.history.pushState({ data: path }, "", encodedPath === "" ? "/" : encodedPath);
};

/**
 * Utility function for subscribing to updates to content. E.g. if file is
 * uploaded or deleted, the contentUpdated function should be called to
 * notify all subscribed components that they should re-render.
 * @param {function} handler The handler to add to the callbacks array.
 */
let contentUpdatedCallbacks = [];
export const subscribeToContentUpdate = (handler) => {
  contentUpdatedCallbacks.push(handler);
};

/**
 * Utility function for un-subscribing to updates to content. Each component
 * is responsible for un-subscribing if it is being destroyed.
 * @param {function} handler The handler to remove from the callbacks array.
 */
export const unsubscribeFromContentUpdate = (handler) => {
  for (let i = 0; i < contentUpdatedCallbacks.length; i++) {
    if (contentUpdatedCallbacks[i] === handler)
      contentUpdatedCallbacks.splice(i, 1);
  }
};

/**
 * Utility function for notifying all subscribers that the content
 * has changed. Executes all subscriber callbacks. Any component
 * that updates content should call this method to notify other
 * components that depend on the updated content.
 */
export const contentUpdated = () => {
  for (let i = 0; i < contentUpdatedCallbacks.length; i++) {
    contentUpdatedCallbacks[i]();
  }
};
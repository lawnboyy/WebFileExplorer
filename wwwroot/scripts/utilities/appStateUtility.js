import { encodeUrl } from "../utilities/urlUtility.js";
import { decodeUrl } from "../utilities/urlUtility.js";

export const getAppState = () => {
  // Deep link to current path...
  const path = window.location.pathname && window.location.pathname !== "/" ? decodeUrl(window.location.pathname) : "";

  // TODO: Add deep linking for additional app state...

  return {
    path
  };
};

export const updatePath = (path) => {
  const encodedPath = encodeUrl(path);
  window.history.pushState({ data: path }, "", encodedPath === "" ? "/" : encodedPath);
};
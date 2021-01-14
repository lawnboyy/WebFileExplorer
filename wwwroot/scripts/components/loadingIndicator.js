/**
 * Factory function that creates and returns an HTML loading indicator.
 * @param {string} id This string will be used for the HTML id.
 * @param {string} text This string will be used for the indicator display text.
 * @returns {object} Returns an HTML button element.
 */
export const LoadingIndicator = (id, text) => {
  const indicator = document.createElement("div");
  indicator.id = id;
  indicator.innerHTML = `${text}`;
  indicator.classList.add("loading");

  return indicator;
};
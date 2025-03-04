/**
 * Updates the position and value of the bubble tooltip that shows the current slider value
 *
 * @param {HTMLElement} bubble - The bubble element that displays the current value
 * @param {HTMLInputElement} input - The range input element
 *
 * @description
 * This function calculates the position of the bubble tooltip based on:
 * - The current value of the slider
 * - The step size between values
 * - The min and max range values
 * - The width of the bubble element
 *
 * The bubble position is calculated as a percentage of the slider width,
 * adjusted by the bubble's own width to keep it centered on the slider thumb.
 *
 * Default values:
 * - bubbleWidth: 31px (if getBoundingClientRect fails)
 */
function updateBubble(bubble, input) {
  const max = input.max || 200;
  const min = input.min || 1;
  const value = input.value || 1;
  const current = Math.ceil((value - min));
  const total = Math.ceil((max - min));

  const bubbleWidth = bubble.getBoundingClientRect().width || 16;
  const left = `${(current / total) * 100}% - ${(current / total) * bubbleWidth}px`;
  bubble.innerText = `${value}`;
  bubble.textContent = value;
  bubble.style.left = `calc(${left})`;
}

/**
 * update the color of the slider based on the input value
 * We set the total steps and the current step css variablesbased on the input value
 * the css applies a gradient to the slider based on the total steps and the current step
 * @param {*} input The input element
 * @param {*} element The wrapper div
 */
function updateSlider(input, element) {
  const step = input.step || 1;
  const max = input.max || 200;
  const min = input.min || 1;
  const value = input.value || 1;
  const bubble = element.querySelector('.slider-bubble');
  if (bubble) {
    updateBubble(bubble, input);
  }
  const steps = {
    '--total-steps': Math.ceil((max - min) / step),
    '--current-steps': Math.ceil((value - min) / step),
  };
  const style = Object.entries(steps).map(([varName, varValue]) => `${varName}:${varValue}`).join(';');
  element.setAttribute('style', style);
}

/**
 * Decorates the default rendition of the number input to make it a slider.
 * The default rendition of the number input is a input[type="number"]
 * The fieldJson represents the properties that the author selected.
 * OOTB properties are already applied in the default rendition and we are reusing it
 * @param {*} fieldDiv The default rendition for the component
 * @param {*} fieldJson
 * @returns
 */
export default async function decorate(fieldDiv, fieldJson) {
  const input = fieldDiv.querySelector('input');
  // modify the type in case it is not range.
  input.type = 'range';
  input.min = input.min || 1;
  input.max = input.max || 100;
  // read the increment property set in authoring
  input.step = fieldJson.properties.increment || 1;
  // create a wrapper div and insert the input inside it
  const div = document.createElement('div');
  div.className = 'slider-widget-wrapper decorated';
  div.appendChild(input);
  if (fieldJson.properties.variant === 'show-values') {
    // create a span to display the value of the slider
    const hover = document.createElement('span');
    hover.className = 'slider-bubble';
    div.appendChild(hover);
  }

  fieldDiv.appendChild(div);
  input.addEventListener('input', (e) => {
    updateSlider(e.target, div);
  });
  updateSlider(input, div);
  return fieldDiv;
}

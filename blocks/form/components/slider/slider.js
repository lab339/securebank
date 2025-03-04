/**
 * update the color of the slider based on the input value
 * We set the total steps and the current step css variablesbased on the input value
 * the css applies a gradient to the slider based on the total steps and the current step
 * @param {*} input The input element
 * @param {*} element The wrapper div
 */
function updateSlider(input, element) {
  const step = input.step || 1;
  const max = input.max || 100;
  const min = input.min || 1;
  const value = input.value || 1;
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
  // create a wrapper div and insert the input inside it
  const div = document.createElement('div');
  div.className = 'slider-widget-wrapper decorated';
  div.appendChild(input);
  fieldDiv.appendChild(div);
  input.addEventListener('input', (e) => {
    updateSlider(e.target, div);
  });
  updateSlider(input, div);
  return fieldDiv;
}

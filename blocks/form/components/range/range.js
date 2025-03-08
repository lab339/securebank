function updateBubble(input, element) {
  const step = input.step || 1;
  const max = input.max || 0;
  const min = input.min || 1;
  const value = input.value || 1;
  const current = Math.ceil((value - min) / step);
  const total = Math.ceil((max - min) / step);
  const bubble = element.querySelector('.range-bubble');
  // during initial render the width is 0. Hence using a default here.
  const bubbleWidth = bubble.getBoundingClientRect().width || 31;
  const left = `${(current / total) * 100}% - ${(current / total) * bubbleWidth}px`;
  bubble.innerText = `${value}`;
  const steps = {
    '--total-steps': Math.ceil((max - min) / step),
    '--current-steps': Math.ceil((value - min) / step),
  };
  const style = Object.entries(steps).map(([varName, varValue]) => `${varName}:${varValue}`).join(';');
  bubble.style.left = `calc(${left})`;
  element.setAttribute('style', style);
}

function handleDisplayValueChange(input) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      const displayValue = input.getAttribute('display-value');
      const bubble = input.parentElement.querySelector('.range-bubble');
      bubble.innerText = displayValue;
    });
  });
  observer.observe(input, {
    attributes: true,
    attributeFilter: ['display-value'],
  });
}

export default async function decorate(fieldDiv, fieldJson) {
  const originalInput = fieldDiv.querySelector('input');
  const input = originalInput.cloneNode(true);
  originalInput.replaceWith(input);
  handleDisplayValueChange(input);
  // modify the type in case it is not range.
  input.type = 'range';
  input.min = input.min || 1;
  input.max = input.max || 100;
  input.step = fieldJson.properties.stepValue || 1;
  // create a wrapper div to provide the min/max and current value
  const div = document.createElement('div');
  div.className = 'range-widget-wrapper decorated';
  input.after(div);
  const hover = document.createElement('span');
  hover.className = 'range-bubble';
  const rangeMinEl = document.createElement('span');
  rangeMinEl.className = 'range-min';
  const rangeMaxEl = document.createElement('span');
  rangeMaxEl.className = 'range-max';
  rangeMinEl.innerText = `${input.min}`;
  rangeMaxEl.innerText = `${input.max}`;
  div.appendChild(hover);
  // move the input element within the wrapper div
  div.appendChild(input);
  div.appendChild(rangeMinEl);
  div.appendChild(rangeMaxEl);
  input.addEventListener('input', (e) => {
    updateBubble(e.target, div);
  });
  updateBubble(input, div);
  if (fieldJson.displayValue) {
    hover.innerText = fieldJson.displayValue;
  }
  if (fieldJson.displayFormat && input.min && input.max) {
    import('../../rules/model/afb-formatters.min.js').then(
      ({ formatNumber }) => {
        const minFormatValue = formatNumber(input.min, fieldJson.lang, fieldJson.displayFormat);
        rangeMinEl.innerText = `${minFormatValue}`;
        const maxFormatValue = formatNumber(input.max, fieldJson.lang, fieldJson.displayFormat);
        rangeMaxEl.innerText = `${maxFormatValue}`;
        hover.innerText = formatNumber(input.value, fieldJson.lang, fieldJson.displayFormat);
      },
    );
  }
  return fieldDiv;
}

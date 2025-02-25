import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const mediaWrapper = document.createElement('div');
  mediaWrapper.classList.add('feature-content-media');
  const picture = block.querySelector('picture');
  mediaWrapper.append(picture);

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('feature-content-wrapper');
  let row = block.getElementsByTagName('div')[3];
  row.classList.add('feature-content-container');
  contentWrapper.append(mediaWrapper);
  contentWrapper.append(row);

  const callOutWrapper = document.createElement('div');
  callOutWrapper.classList.add('feature-callout-wrapper');
  /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
  row = block.getElementsByTagName('div')[4];
  const placeholders = await fetchPlaceholders('');
  const { interestrate } = placeholders;
  const interest = document.createElement('p');
  interest.classList.add('feature-interest-rate');
  interest.innerHTML = `<strong>${interestrate}%</strong><sup>APR</sup>`;
  callOutWrapper.appendChild(interest);

  callOutWrapper.append(row);

  block.textContent = '';
  block.append(contentWrapper);
  block.append(callOutWrapper);
}

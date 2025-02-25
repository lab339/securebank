/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate, globals) {
  const start = typeof startDate === 'string' ? globals.toNumber(startDate) : startDate;
  const end = typeof endDate === 'string' ? globals.toNumber(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start) || Number.isNaN(end)) {
    return 0;
  }
  return end - start;
}

// eslint-disable-next-line import/prefer-default-export
export { getFullName, days };

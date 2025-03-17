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
 * @param {scope} globals
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

/**
 * Set the maximum date for a date field.
 * @param {scope} globals
 */
function setMaximumDate(globals) {
  const date1 = new Date();
  // get a date 18 years and 1 day ago
  const minimum = new Date(date1.getFullYear() - 18, date1.getMonth(), date1.getDate() - 1);
  // convert to YYYY-MM-DD
  const stringDate = minimum.toISOString().split('T')[0];
  globals.functions.setProperty(globals.field, { maximum: stringDate });
}

/**
  * Custom submit function
  * @param {scope} globals
  */
function customSubmit(globals) {
  const data = globals.functions.exportData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key]) && data[key].length > 0) {
      const el = data[key][0];
      if (typeof el === 'string' || typeof el === 'number') {
        data[key] = data[key].join(',');
      } else if (typeof el === 'object') {
        Object.keys(el).forEach((subKey) => {
          if (typeof el[subKey] === 'string' || typeof el[subKey] === 'number') {
            data[`${key}-${subKey}`] = data[key].map((item) => item[subKey]).join(',');
          }
        });
      }
    }
  });
  globals.functions.submitForm(data, true, 'application/json');
}
// eslint-disable-next-line import/prefer-default-export
export {
  getFullName, days, setMaximumDate, customSubmit,
};

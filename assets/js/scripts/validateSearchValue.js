/**
 * Return true or false based on whether or not searchValue is valid.
 * @param {String} searchValue - trimmed searchValue to be validated.
 */
export const validateSearchValue = (searchValue) => {
  // Edge case city names
  // Opp
  // Winchester-on-the-Severn
  // Washington-on-the-Brazos
  let isValid = true;
  const hasNumber = /\d/;
  const values = searchValue.split(",");
  const validFormats = [
    "St. Louis",
    "St. Louis, USA",
    "St. Louis, MO, USA",
    "St. Louis, Missouri, USA",
    "St. Louis, MO, United States",
    "St. Louis, Missouri, United States",
  ];

  if (hasNumber.test(searchValue)) {
    isValid = false;
  } else if (searchValue.length > 40) {
    isValid = false;
  } else if (searchValue.length < 3) {
    isValid = false;
  } else if (values.length > 3) {
    isValid = false;
  }

  if (!isValid) {
    const errorMessage = `Invalid search.\n\n- Search should not include numbers.\n- Search should contain no more than 40 characters.\n- Search should contain at least 3 characters.\n\nSearch format should be either:\n"City"\n"City, Country"\n"City, State, Country".\n\nExamples:\n${validFormats.join("\n")}`;

    alert(errorMessage);
  }

  return isValid;
};

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
    // Matches "City", "City City", "City-City", "City City-City", or "City, State, Country".
    const hasValidFormat = /^\w+ ?[A-z-]*$|^[A-z-]+ *, *[A-z-]+ *, *[A-z-]+ *$/; 

    if (hasNumber.test(searchValue)) {
        alert("Invalid search. Search should not include numbers.");
        isValid = false;
    }
    else if (searchValue.length > 40) {
        alert("Invalid search. Search should contain no more than 40 characters.");
        isValid = false;
    }
    else if (searchValue.length < 3) {
        alert("Invalid search. Search should contain at least 3 characters.");
        isValid = false;
    }
    else if (!hasValidFormat.test(searchValue)) {
        alert(`Invalid search. Search format should be either "City" or "City, State, Country".`);
        isValid = false;
    }

    return isValid;
}
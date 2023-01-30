/* eslint-disable no-useless-escape */
module.exports = {
  /**
   * PH Mobile numbers
   * @params Boolean string
   * @params String Prefix
   * @returns regex
   */
  phMobileNumber(strict = false, prefix = "+639") {
    if (strict) {
      return `/^${prefix}\d{9}$/`;
    }
    return /^(\+639|639|09)\d{9}$/;
  },
  /**
   * Letters, and digits
   * @returns regex
   */
  alphaNumeric() {
    return /^[0-9a-zA-Z]+$/;
  },
  /**
   * digits
   * @returns regex
   */ numeric() {
    return /^\d+$/;
  },
  /**
   * Letters, digits and dash
   * @returns regex
   */
  alphaNumericDash() {
    return /^[0-9a-zA-Z-]+$/;
  },
  /**
   * letters, digits and underscore
   * @returns regex
   */
  snakeCaseAlphaNumeric() {
    return /^[a-zA-Z0-9Ññ_]+$/;
  },
  /**
   * Letters
   * @returns regex
   */
  alphabet() {
    return /^[A-Za-z]+$/;
  },
  /**
   * Letters and space
   * @returns regex
   */
  alphabetSpace() {
    return /^[a-zA-Z ]/;
  },
  /**
   * Email address
   * @returns regex
   */
  email() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  },
  strongPassword() {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  },
};

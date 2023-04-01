export const validatePassword = (p) => {
  if (p.length < 8) {
    return {
      message: "Your password must be at least 8 characters",
      isValid: false,
    };
  }
  if (p.search(/[a-z]/i) < 0) {
    return {
      message: "Your password must contain at least one lowecase letter.",
      isValid: false,
    };
  }
  if (p.search(/[A-Z]/i) < 0) {
    return {
      message: "Your password must contain at least one uppercase letter.",
      isValid: false,
    };
  }
  if (p.search(/[0-9]/) < 0) {
    return {
      message: "Your password must contain at least one digit.",
      isValid: false,
    };
  }
  if (p.search(/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/) < 0) {
    return {
      message: "Your password must contain at least one special.",
      isValid: false,
    };
  }
  return { message: "Validated", isValid: true };
};

export const validateEmail = (e) => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!e.match(mailformat)) {
    return {
      message: "Invalid email address.",
      isValid: false,
    };
  }
  return {
    isValid: true,
  };
};

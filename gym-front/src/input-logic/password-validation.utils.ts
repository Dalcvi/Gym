export const isPasswordValid = (password: string) => {
  return getPasswordError(password) === undefined;
};

export const getPasswordError = (password: string) => {
  if (password.length < 6) {
    return 'Password is too short';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Should contain at least 1 uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Should contain at least 1 lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Should contain at least 1 number';
  }
  return undefined;
};

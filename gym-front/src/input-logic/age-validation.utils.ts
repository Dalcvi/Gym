const minAge = 12;
const maxAge = 150;

export const getAgeError = (age: number) => {
  return !isAgeValid(age) ? `Age must be between ${minAge} and ${maxAge}` : undefined;
};

export const isAgeValid = (age: number) => {
  return age >= minAge && age <= maxAge && /^[0-9]+$/.test(age.toString());
};

import { useMemo } from 'react';
import { isAgeValid } from './age-validation.utils';
import { useInputValidation } from './use-input-validation.hook';

export const useAge = (initialValue?: number) => {
  const isValid = useMemo(() => (value: number | null) => value !== null && isAgeValid(value), []);
  const isEmpty = useMemo(() => (value: number | null) => value === null, []);
  return useInputValidation<number | null>({
    checkIsInputValid: isValid,
    checkIsInputEmpty: isEmpty,
    initialValue: initialValue ?? null,
  });
};

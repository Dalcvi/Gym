import { useMemo } from 'react';
import { useInputValidation } from './use-input-validation.hook';

const nameRegex = /^[a-zA-Z'-]+$/;

export const useName = (initialValue?: string) => {
  const isValid = useMemo(() => (value: string) => nameRegex.test(value), []);
  const isEmpty = useMemo(() => (value: string) => value === '', []);
  return useInputValidation({
    checkIsInputValid: isValid,
    checkIsInputEmpty: isEmpty,
    initialValue: initialValue ?? '',
  });
};

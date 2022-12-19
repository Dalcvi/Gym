import { useMemo } from 'react';
import { useInputValidation } from './use-input-validation.hook';

// eslint-disable-next-line no-useless-escape
const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const useEmail = () => {
  const isValid = useMemo(() => (value: string) => emailRegex.test(value), []);
  const isEmpty = useMemo(() => (value: string) => value === '', []);
  return useInputValidation({
    checkIsInputValid: isValid,
    checkIsInputEmpty: isEmpty,
    initialValue: '',
  });
};

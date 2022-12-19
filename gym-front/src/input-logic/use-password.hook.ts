import { useMemo } from 'react';
import { isPasswordValid } from './password-validation.utils';
import { useInputValidation } from './use-input-validation.hook';

export const usePassword = () => {
  const isEmpty = useMemo(() => (value: string) => value === '', []);

  return useInputValidation({
    checkIsInputValid: isPasswordValid,
    checkIsInputEmpty: isEmpty,
    initialValue: '',
  });
};

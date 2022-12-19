import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'debounce';

export const useInputValidation = <T>({
  checkIsInputValid,
  checkIsInputEmpty,
  initialValue,
}: {
  checkIsInputValid: (value: T) => boolean;
  checkIsInputEmpty: (value: T) => boolean;
  initialValue: T;
}) => {
  const [value, setValue] = useState<T>(initialValue);
  const [isEmpty, setIsEmpty] = useState(checkIsInputEmpty(initialValue));
  const [isValid, setIsValid] = useState(checkIsInputValid(initialValue));
  const [isTyping, setIsTyping] = useState(false);

  const debouncedSetIsValid = useMemo(() => debounce(setIsValid, 500), []);
  const debouncedSetIsTyping = useMemo(() => debounce(setIsTyping, 500), []);

  useEffect(() => {
    const isValueEmpty = checkIsInputEmpty(value);
    if (isEmpty !== isValueEmpty) {
      setIsEmpty(isValueEmpty);
    }
  }, [checkIsInputEmpty, isEmpty, value]);

  useEffect(() => {
    const isValueValid = checkIsInputEmpty(value) || checkIsInputValid(value);
    setIsTyping(true);
    debouncedSetIsValid(isValueValid);
    debouncedSetIsTyping(false);
    if (isValueValid) {
      debouncedSetIsValid.flush();
      debouncedSetIsTyping.flush();
    }
  }, [checkIsInputEmpty, checkIsInputValid, debouncedSetIsTyping, debouncedSetIsValid, value]);
  return [value, setValue, isValid, isEmpty, isTyping] as const;
};

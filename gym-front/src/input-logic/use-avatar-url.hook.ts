import { useMemo, useState } from 'react';
import { useInputValidation } from './use-input-validation.hook';

const pattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i',
); // fragment locator

export const useAvatar = (initialValue?: string) => {
  const checkIsInputValid = useMemo(() => (value: string) => pattern.test(value), []);
  const checkIsInputEmpty = useMemo(() => (value: string) => value === '', []);
  const [isUploading, setIsUploading] = useState(false);

  const [value, setValue, isValid, isEmpty] = useInputValidation({
    checkIsInputValid,
    checkIsInputEmpty,
    initialValue: initialValue ?? '',
  });

  const avatarUrlVal = !value ? undefined : value;

  return [avatarUrlVal, setValue, isValid, isEmpty, isUploading, setIsUploading] as const;
};

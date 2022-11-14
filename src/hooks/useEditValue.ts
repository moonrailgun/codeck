import { useCallback, useEffect, useState } from 'react';

/**
 * 编辑模式的状态管理，外部变化会重置内部状态
 */
export const useEditValue = <T = any>(
  value: T,
  onChange: (val: T) => void
): [T, (val: T) => void, () => void, () => void] => {
  const [innerValue, setInnerValue] = useState<T>(value);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const submit = useCallback(() => {
    onChange(innerValue);
  }, [innerValue, onChange]);

  const reset = useCallback(() => {
    setInnerValue(value);
  }, [value]);

  return [innerValue, setInnerValue, submit, reset];
};

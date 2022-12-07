import { Message } from '@arco-design/web-react';
import { useMemoizedFn } from 'ahooks';
import { persist } from 'codeck';
import { useLayoutEffect } from 'react';

export function usePersist() {
  const save = useMemoizedFn(() => {
    persist.saveIntoLocalStorage();
    Message.success('保存成功');
  });

  useLayoutEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 's') {
        e.preventDefault();
        e.stopPropagation();

        save();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { save };
}

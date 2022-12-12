import { useMemoizedFn } from 'ahooks';
import { CodeCompiler } from 'codeck';
import FileSaver from 'file-saver';
import { packRepo } from 'codeck/lib/code/pack';

/**
 * @returns 打包产物相关逻辑
 */
export function usePack() {
  const pack = useMemoizedFn(async () => {
    const compiler = new CodeCompiler();
    const code = compiler.generate();

    const blob = await packRepo({
      code,
      prepares: compiler.prepares,
    });
    FileSaver.saveAs(blob, `codeck-${Date.now()}.zip`);
  });

  return { pack };
}

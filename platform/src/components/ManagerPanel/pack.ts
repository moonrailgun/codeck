import { useMemoizedFn } from 'ahooks';
import { CodeCompiler } from 'codeck';
import FileSaver from 'file-saver';
import { packRepo } from 'codeck/lib/code/pack';

type Options = Pick<Parameters<typeof packRepo>[0], 'platform'> & {
  moduleType: 'commonjs' | 'esmodule';
};

/**
 * @returns 打包产物相关逻辑
 */
export function usePack(options: Options) {
  const pack = useMemoizedFn(async () => {
    const compiler = new CodeCompiler();
    compiler.moduleType = options.moduleType ?? 'esmodule';

    const code = compiler.generate();

    const blob = await packRepo({
      ...options,
      code,
      prepares: compiler.prepares,
    });
    FileSaver.saveAs(blob, `codeck-${Date.now()}.zip`);
  });

  return { pack };
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require('esbuild');

esbuild
  .build({
    platform: 'node',
    target: 'node14',
    entryPoints: ['./src/server.ts'],
    bundle: true,
    minify: true,
    outdir: './bundle',
    format: 'cjs',
    sourcemap: true,
  })
  .catch(() => {
    process.exit(1);
  });

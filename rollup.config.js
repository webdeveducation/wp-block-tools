import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';
// continued
const rollup = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    sass({
      outputStyle: 'compressed',
      output: './dist/css/style.css',
    }),
    typescript({ objectHashIgnoreUnknownHack: true }),
  ],
  external: ['react', 'react-dom'],
};

export default rollup;

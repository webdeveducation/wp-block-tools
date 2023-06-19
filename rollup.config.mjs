import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';
import banner2 from 'rollup-plugin-banner2';

const server = {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/es',
      format: 'es',
      exports: 'named',
      sourcemap: true,
      strict: false,
      preserveModules: true,
    },
  ],
  plugins: [
    typescript(),
    sass({
      outputStyle: 'compressed',
      output: './dist/css/style.css',
    }),
    banner2(
      () => `'use client';
`
    ),
  ],
  external: ['react', 'react-dom'],
};

export default [server];

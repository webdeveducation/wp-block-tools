import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';
import banner2 from 'rollup-plugin-banner2';
// continued
const client = {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/cjs/client',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
      preserveModules: true,
    },
    {
      dir: 'dist/es/client',
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

const server = {
  input: 'src/utils/index.ts',
  output: [
    {
      dir: 'dist/cjs/server',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
      preserveModules: true,
    },
    {
      dir: 'dist/es/server',
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
  ],
  external: ['react', 'react-dom'],
};

export default [client, server];

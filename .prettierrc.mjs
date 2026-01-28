import * as astroPlugin from 'prettier-plugin-astro';

/** @type {import("prettier").Config} */
export default {
  plugins: [astroPlugin], // 文字列ではなくオブジェクトとして渡す
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
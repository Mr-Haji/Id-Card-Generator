import url from '@rollup/plugin-url';

export default {
  plugins: [
    url({
      include: ['**/*.jpeg', '**/*.jpg', '**/*.png'],
      limit: 0 // inline all files
    })
  ]
};
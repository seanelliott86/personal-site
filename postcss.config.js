import postcssImport from 'postcss-import';
import postcssCustomMedia from 'postcss-custom-media';
import cssnano from 'cssnano';

export default {
    plugins: [
        postcssImport,
        postcssCustomMedia,
        ...(process.env.NODE_ENV === 'production' ? [cssnano({ preset: 'default' })] : []),
    ],
};
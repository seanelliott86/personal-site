import postcssImport from 'postcss-import';
import postcssCustomMedia from 'postcss-custom-media';
import cssnano from 'cssnano';

export const getCssPlugins = () => [
    postcssImport,
    postcssCustomMedia,
    ...(process.env.NODE_ENV === 'production' ? [cssnano({ preset: 'default' })] : []),
];

export default {
    plugins: getCssPlugins(),
};
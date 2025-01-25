import Image from "@11ty/eleventy-img";
import path from "path";
import sizeOf from "image-size";

const outputDir = "./public/assets/uploads";

// Configuration object for presets
const presets = {
    "hero-img": [300, 600, 800, 1200],
    "default-img": [300, 600, 800],
    "home-img": [225, 450, 675],
};

function getImageDimensions(src) {
    const dimensions = sizeOf(src);
    return { width: dimensions.width, height: dimensions.height };
}

function generateSrcset(baseName, widths, format) {
    return widths.map(width => `/assets/uploads/${baseName}-${width}w.${format} ${width}w`).join(", ");
}

function generateImageTag(srcUrl, alt, className, sizes, srcset) {
    return `<img src="${srcUrl}" alt="${alt}" class="${className}" sizes="${sizes}" srcset="${srcset}" decoding="async" loading="lazy">`;
}

async function generateImageMetadata(sourcePath, widths) {
    return await Image(sourcePath, {
        widths,
        formats: ["jpeg"],
        outputDir,
        urlPath: "/assets/uploads/",
        filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src);
            const name = path.basename(src, extension);
            return `${name}-${width}w.${format}`;
        }
    });
}

function handleError(src, alt, className, error) {
    console.error(`Error generating image for ${src}:`, error);
    return `<img src="${src}" alt="${alt}" class="${className}">`;
}

function getWidths(maxWidth, className) {
    const defaultWidths = [300, 600, 800];
    const widths = presets[className] || defaultWidths;
    return widths.filter(width => width <= maxWidth);
}

async function generateImageAsync(src, alt, className) {
    const sourcePath = path.join("./src", src);

    if (path.extname(src).toLowerCase() === ".gif") {
        return `<img src="${src}" alt="${alt}" class="${className}" decoding="async" loading="lazy">`;
    }

    try {
        const dimensions = getImageDimensions(sourcePath);
        const maxWidth = dimensions.width;

        let widths = getWidths(maxWidth, className);

        if (maxWidth < 300) {
            return `<img src="${src}" alt="${alt}" class="${className} decoding="async" loading="lazy">`;
        }

        const metadata = await generateImageMetadata(sourcePath, widths);
        const baseName = path.basename(src, path.extname(src));
        const srcset = generateSrcset(baseName, widths, "jpeg");
        const sizes = "100vw";
        const srcUrl = metadata.jpeg[0].url;

        console.log(`Generating image tag for ${src}`);
        console.log(`srcUrl: ${srcUrl}`);
        console.log(`srcset: ${srcset}`);

        return generateImageTag(srcUrl, alt, className, sizes, srcset);
    } catch (error) {
        return handleError(src, alt, className, error);
    }
}

function generateImageSync(src, alt, className) {
    const sourcePath = path.join("./src", src);

    if (path.extname(src).toLowerCase() === ".gif") {
        return `<img src="${src}" alt="${alt}" class="${className}" decoding="async" loading="lazy">`;
    }

    try {
        const dimensions = getImageDimensions(sourcePath);
        const maxWidth = dimensions.width;

        let widths = getWidths(maxWidth, className);

        if (maxWidth < 300) {
            return `<img src="${src}" alt="${alt}" class="${className}" decoding="async" loading="lazy">`;
        }

        const baseName = path.basename(src, path.extname(src));
        const srcset = generateSrcset(baseName, widths, "jpeg");
        const sizes = "100vw";
        const srcUrl = `/assets/uploads/${baseName}-${widths[0]}w.jpeg`;

        console.log(`Generating image tag for ${src}`);
        console.log(`srcUrl: ${srcUrl}`);
        console.log(`srcset: ${srcset}`);

        return generateImageTag(srcUrl, alt, className, sizes, srcset);
    } catch (error) {
        return handleError(src, alt, className, error);
    }
}

export async function imageShortcode(src, alt, className = "") {
    if (alt === undefined) {
        throw new Error(`Missing "alt" attribute for image: ${src}`);
    }
    return await generateImageAsync(src, alt, className);
}

export function imageShortcodeSync(src, alt, className = "") {
    if (alt === undefined) {
        throw new Error(`Missing "alt" attribute for image: ${src}`);
    }
    return generateImageSync(src, alt, className);
}
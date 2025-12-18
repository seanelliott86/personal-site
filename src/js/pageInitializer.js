const addHeaderAnimation = () => {
    const html = document.documentElement;

    const addAnimationClass = () => {
        html.classList.add('is-animated');
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            setTimeout(addAnimationClass, 4000);
        });
    } else {
        setTimeout(addAnimationClass, 4000);
    }
};

const initializePrefetching = () => {
    if (typeof prefetchList === 'undefined' || prefetchList.length === 0) {
        return; // Exit early if no prefetch list
    }

    const prefetched = new Set();

    const prefetch = url => {
        if (prefetched.has(url)) return;
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = url;
        document.head.appendChild(link);
        prefetched.add(url);
    };

    const startPrefetching = () => {
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const href = entry.target.getAttribute("href");
                    if (prefetchList.includes(href)) {
                        prefetch(href);
                        observer.unobserve(entry.target);
                    }
                }
            }
        }, { rootMargin: "200px" });

        for (const a of document.querySelectorAll("a[href]")) {
            if (prefetchList.includes(a.getAttribute("href"))) {
                observer.observe(a);
            }
        }
    };

    setTimeout(startPrefetching, 2000);
};

// Single load event listener that handles both features
window.addEventListener("load", () => {
    addHeaderAnimation();
    initializePrefetching();
});
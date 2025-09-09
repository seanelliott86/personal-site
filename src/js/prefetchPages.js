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

// Wait until everything is loaded, then start prefetching
window.addEventListener("load", () => {
    setTimeout(startPrefetching, 2000); // optional small delay for smoother load
});
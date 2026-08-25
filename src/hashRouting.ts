export const initialHash = window.location.hash;
export const shouldSkipLanding = initialHash.length > 0;

export const scrollToInitialHash = () => {
    if (!shouldSkipLanding) return;

    const encodedTargetId = initialHash.slice(1);
    let targetId = encodedTargetId;

    try {
        targetId = decodeURIComponent(encodedTargetId);
    } catch {
        // Keep the encoded value when the hash is not a valid URI component.
    }

    const target = document.getElementById(targetId);

    if (!target) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = 'auto';
    target.scrollIntoView();
    root.style.scrollBehavior = previousScrollBehavior;
};

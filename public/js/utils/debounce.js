export function debounceGatherMap1(fn, mapper, ms) {
    let timeoutId;
    let cachedArgs = [];
    return function(...args) {
        cachedArgs = [...cachedArgs, ...args.map(mapper)];
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.call(this, cachedArgs)
            cachedArgs = [];
        }, ms);
    };
}

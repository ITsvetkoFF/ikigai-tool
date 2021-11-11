export function on(el, evt, cb) {
    el.addEventListener(evt, cb);
    return () => {
        el.removeEventListener(evt, cb);
    }
}
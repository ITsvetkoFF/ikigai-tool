export const createSvgElement = element => document.createElementNS('http://www.w3.org/2000/svg',element);

export const createSvgG = () => createSvgElement("g");

export const setElementAttributes = (element, attrs) => {
    for (const [key, value] of Object.entries(attrs)) {
        element.setAttribute(key, value);
    }
}
export const setElementStyles = (element, attrs) => {
    for (const [key, value] of Object.entries(attrs)) {
        element.style.setProperty(key, value);
    }
}
import {createSvgElement, setElementAttributes} from "../../utils/dom.js";
import {pillars, paletteDark1} from "../../model/pillars.js";
import {intersections} from "../../model/intersections.js";

export const renderDiagram = () => {
    fetch("./js/components/diagram/diagram.html")
        .then(stream => stream.text())
        .then(text => define(text));
}

function define(html) {

    // POSITIONS
    // 1 | 2
    // -----
    // 3 | 4

    const positionIsLeft = p => p === 1 || p === 3;
    const positionIsTop = p => p === 1 || p === 2;
    const mapPositionToEllipsisParams = (position, CENTER_OFFSET_PERCENT = 30, RADIUS_PERCENT = 29) => ({
        cx: `${positionIsLeft(position) ? CENTER_OFFSET_PERCENT : 100 - CENTER_OFFSET_PERCENT}%`,
        cy: `${positionIsTop(position) ? CENTER_OFFSET_PERCENT : 100 - CENTER_OFFSET_PERCENT}%`,
        rx: `${RADIUS_PERCENT}%`,
        ry: `${RADIUS_PERCENT}%`,
    });

    const mainEllipsisTextBlocks = (position) => ({
        left: `${positionIsLeft(position) ? 10 : 60}%`,
        top: `${positionIsTop(position) ? 10 : 60}%`,
        width: "30%",
        height: "30%"
    });



    // INTERSECTION POSITIONS
    //   1
    // -----
    // 2 | 3
    // -----
    //   4
    const isVertical = p => p === 1 || p === 4;
    const isFirstInGroup = p => p === 1 || p === 2;
    const intersectionTextBlocks = (position) => {
        const isVerticalPosition = isVertical(position);
        const dimensionInGroup = isFirstInGroup(position) ? 15 : 55;

        const left = `${isVerticalPosition ? 45 : dimensionInGroup}%`;
        const top = `${!isVerticalPosition ? 45 : dimensionInGroup}%`;
        const width = `${isVerticalPosition ? 10 : 30}%`;
        const height = `${isVerticalPosition ? 30 : 10}%`;
        return {
            left,
            top,
            width,
            height,
        }
    };


    // POSITIONS
    //   1
    // -----
    // 2 | 3
    // -----
    //   4

    //
    // const mapPositionToEllipsisParams = (position, CENTER_OFFSET_PERCENT = 27, RADIUS_PERCENT = 25) => {
    //     const xPos = p => p === 2 ? CENTER_OFFSET_PERCENT : p === 3 ? 100 - CENTER_OFFSET_PERCENT : 50;
    //     const yPos = p => p === 1 ? CENTER_OFFSET_PERCENT : p === 4 ? 100 - CENTER_OFFSET_PERCENT : 50;
    //     return {
    //         cx: `${xPos(position)}%`,
    //         cy: `${yPos(position)}%`,
    //         rx: `${RADIUS_PERCENT}%`,
    //         ry: `${RADIUS_PERCENT}%`,
    //     };
    // }

    const mapColorIndexToEllipsisParams = (colorIndex, palette = paletteDark1) => ({
        style: `fill: ${palette[colorIndex - 1]};mix-blend-mode: hard-light;`,
    });

    class IkiDiagram extends HTMLElement {

        constructor() {
            super();

            let shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = html;

            const diagram = shadow.getElementById("diagram");

            const createPillarEllipse = (attrs) => {
                const ellipsis = createSvgElement("ellipse")
                setElementAttributes(ellipsis, attrs)
                return ellipsis;
            }

            const createAndAppendElements = (p, parentElement) => {
                const span = document.createElement("span");
                span.innerText = p.title;
                parentElement.appendChild(span);

                const input = document.createElement("textarea");
                setElementAttributes(input, {required: true})
                parentElement.appendChild(input);
                return input;
            };

            pillars.forEach(p => {
                const attrs = {
                    ...mapPositionToEllipsisParams(p.position),
                    ...mapColorIndexToEllipsisParams(p.colorIndex),
                    // tabindex: p.tabindex
                };
                const ellipsis = createPillarEllipse(attrs);

                // const g = createSvgG();
                // const maskName = `${p.name}_MASK`;
                // const hoverShape = createPillarEllipse({
                //     ...mapPositionToEllipsisParams(p.position),
                //     id: `${p.name}_HOVER_AREA`,
                //     class: `pillar-hover-area`,
                //     mask: `url(#${maskName})`,
                //     style: `opacity: 0.1;`});
                //
                // const mask = createSvgElement("mask");
                // setElementAttributes(mask, {id: maskName});
                //
                // pillars.forEach(maskPillar => {
                //     const maskPillarAttrs = {
                //         ...mapPositionToEllipsisParams(maskPillar.position),
                //         fill: p.name === maskPillar.name ? "white" : "black"
                //     }
                //     const maskPillarElement = createPillarEllipse(maskPillarAttrs);
                //     mask.appendChild(maskPillarElement);
                // })
                //
                // const defs = createSvgElement("defs");
                // defs.appendChild(mask);
                // g.appendChild(defs);
                // g.appendChild(hoverShape);

                diagram.appendChild(ellipsis);
                // diagram.appendChild(g);
            });

            const diagramTexts = shadow.getElementById("diagram-texts");

            pillars.forEach(p => {
                const header = document.createElement("div");
                header.classList.add("pillar-header")
                const attrs = {...mainEllipsisTextBlocks(p.position), position: "absolute"};
                for (const [key, value] of Object.entries(attrs)) {
                    header.style.setProperty(key, value);
                }
                setElementAttributes(header, {id: `pillar-header-${p.position}`});

                const input = createAndAppendElements(p, header);
                diagramTexts.appendChild(header);


                header.addEventListener("click", () => {
                    document.body.classList.add(`zoomed-${p.position}`);
                    document.body.classList.add(`zoomed-in-1`);
                    input.focus();
                })
            });

            intersections.forEach(p => {
                const intersection = document.createElement("div");
                intersection.classList.add("pillar-intersection")
                const intersectionAttrs = {...intersectionTextBlocks(p.position), position: "absolute"};
                for (const [key, value] of Object.entries(intersectionAttrs)) {
                    intersection.style.setProperty(key, value);
                }
                setElementAttributes(intersection, {id: `pillar-intersection-${p.position}`});
                const intersectionInput = createAndAppendElements(p, intersection);

                diagramTexts.appendChild(intersection);
                intersection.addEventListener("click", () => {
                    document.body.classList.add(`zoomed-inter-${p.position}`);
                    document.body.classList.add(`zoomed-in-1`);
                    intersectionInput.focus();
                })
            });

            const zoomer = shadow.getElementById("zoomer1");
            zoomer.addEventListener("click", () => {
                document.body.classList.add("zoomed-in-center-1")
            });

        }
    }

    customElements.define('iki-diagram', IkiDiagram);
}

import {createSvgElement, setElementAttributes} from "../../utils/dom.js";
import {pillars, paletteDark1} from "../../model/pillars.js";

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
                const span = document.createElement("span");
                span.innerText = p.title;
                header.appendChild(span);
                const input = document.createElement("textarea");
                setElementAttributes(input, {required: true})
                header.appendChild(input);
                diagramTexts.appendChild(header);

                header.addEventListener("click", () => {
                    document.body.classList.add(`zoomed-${p.position}`);
                    document.body.classList.add(`zoomed-in-1`);
                    input.focus();
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

import {createSvgElement, setElementAttributes} from "../../utils/dom.js";
import {pillars, paletteDark1} from "../../model/pillars.js";
import {on} from "../../utils/events.js";

export const renderDiagram = (pillars) => {
    fetch("./js/components/diagram/diagram.html")
        .then(stream => stream.text())
        .then(text => define(text, pillars));
}

function define(html, initialPillars) {

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

    const mapColorIndexToEllipsisParams = (colorIndex, palette = paletteDark1) => ({
        style: `fill: ${palette[colorIndex - 1]};mix-blend-mode: hard-light;`,
    });

    class IkiDiagram extends HTMLElement {

        constructor() {
            super();

            let shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = html;
        }

        connectedCallback() {
            const diagramWrapper = this.shadowRoot.getElementById("diagram-wrapper");

            this._onChange = on(diagramWrapper, 'change', evt => {
                if (evt.target.hasAttribute('pillar')) {
                    diagramWrapper.dispatchEvent(new CustomEvent('PILLAR_TEXT_CHANGE', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            pillar: evt.target.getAttribute('pillar'),
                            value: evt.target.value
                        }
                    }));
                }
            })

            this._offKeyup = on(diagramWrapper, 'keyup', evt => {

                if (evt.target.hasAttribute('pillar')) {
                    diagramWrapper.dispatchEvent(new CustomEvent('PILLAR_TEXT_KEYBOARD_EVENT', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            pillar: evt.target.getAttribute('pillar'),
                            value: evt.key
                        }
                    }));
                }

                evt.stopPropagation(); // Prevent the event from leaving this element

            });

            const diagram = this.shadowRoot.getElementById("diagram");

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

                diagram.appendChild(ellipsis);
            });

            const diagramTexts = this.shadowRoot.getElementById("diagram-texts");

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
                input.value = initialPillars[p.name] || ""
                setElementAttributes(input, {required: true, pillar: p.name})
                header.appendChild(input);
                diagramTexts.appendChild(header);

                header.addEventListener("click", () => {
                    document.body.classList.add(`zoomed-${p.position}`);
                    document.body.classList.add(`zoomed-in-1`);
                    input.focus();
                })
            });

            const zoomer = this.shadowRoot.getElementById("zoomer1");
            zoomer.addEventListener("click", () => {
                document.body.classList.add("zoomed-in-center-1")
            });

        }

        disconnectedCallback() {
            this._offKeyup();
            this._onChange();
        }
    }

    customElements.define('iki-diagram', IkiDiagram);
}

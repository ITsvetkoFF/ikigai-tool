const paletteDark1 = [
    "#4b5d67",
    "#322f3d",
    "#59405c",
    "#87556f"
]

const pillars = [
    {name: "LOVE", title: "Things you love", short: "love", tabindex: "3", colorIndex: "1", position: 1},
    {name: "GOOD_AT", title: "You're good at", short: "good", tabindex: "2", colorIndex: "2", position: 2},
    {name: "WORLD_NEEDS", title: "World needs", short: "global", tabindex: "1", colorIndex: "3", position: 3},
    {name: "PAID_FOR", title: "You can be paid for", short: "paid", tabindex: "4", colorIndex: "4", position: 4},
];

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

const diagram = document.getElementById("diagram");

const createSvgElement = element => document.createElementNS('http://www.w3.org/2000/svg',element);

const createSvgG = () => createSvgElement("g");

const setElementAttributes = (element, attrs) => {
    for (const [key, value] of Object.entries(attrs)) {
        element.setAttribute(key, value);
    }
}

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

const diagramTexts = document.getElementById("diagram-texts");

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


const zoomer = document.getElementById("zoomer1");
zoomer.addEventListener("click", () => {
    document.body.classList.add("zoomed-in-center-1")
});

const zoomout = document.getElementById("zoom-out");
zoomout.addEventListener("click", () => {
    document.body.className = "";
});

document.onkeydown = function(evt) {
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        document.body.className = "";
    }
};
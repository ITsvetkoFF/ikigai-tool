export const intersections = [
    {name: "PASSION", title: "Your passion", description: "Love and what you're good at", position: 1},
    {name: "MISSION", title: "Your mission", description: "Love and world's need", position: 2},
    {name: "PROFESSION", title: "Your profession", description: "Good at and paid for", position: 3},
    {name: "VOCATION", title: "Your vocation", description: "World's need and paid for", position: 4},
];

export const intersectionToPillarRelation = {
    1: [3, 4],
    2: [2, 4],
    3: [1, 3],
    4: [1, 2],
};
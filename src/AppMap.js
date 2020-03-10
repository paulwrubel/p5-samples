import ChainballApp from "sketches/chainball/ChainballApp"
import OrbiterApp from "sketches/orbiter/OrbiterApp"
import InteractiveHistogramApp from "sketches/interactivehistogram/InteractiveHistogramApp"

const appMap = new Map([
    ["chainball", {
        name: "chainball",
        displayName: "Chainball",
        component: ChainballApp,
        version: "1.0",
        description: "2D kinematic demonstration"
    }],
    ["orbiter", {
        name: "orbiter",
        displayName: "Orbiter",
        component: OrbiterApp,
        version: "0.2a",
        description: "Orbiter simulation"
    }],
    ["interactivehistogram", {
        name: "interactivehistogram",
        displayName: "Interactive Histogram",
        component: InteractiveHistogramApp,
        version: "1.0",
        description: "An Interactive Histogram (2016)"
    }]
]);

export default appMap;
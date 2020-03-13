import ChainballApp from "sketches/chainball/ChainballApp"
import OrbiterApp from "sketches/orbiter/OrbiterApp"
import InteractiveHistogramApp from "sketches/interactivehistogram/InteractiveHistogramApp"
import CubeGridApp from "sketches/cubegrid/CubeGridApp"
import TrailsApp from "sketches/trails/TrailsApp"
import TrianglesApp from "sketches/triangles/TrianglesApp"

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
    }],
    ["cubegrid", {
        name: "cubegrid",
        displayName: "CubeGrid",
        component: CubeGridApp,
        version: "0.9b",
        description: "3D customizable grid of cubes (2016)"
    }],
    ["trails", {
        name: "trails",
        displayName: "Trails",
        component: TrailsApp,
        version: "0.7b",
        description: "Trail art creator (2017)"
    }],
    ["triangles", {
        name: "triangles",
        displayName: "Triangles",
        component: TrianglesApp,
        version: "0.2a",
        description: "Triangles (2018)"
    }]
]);

export default appMap;
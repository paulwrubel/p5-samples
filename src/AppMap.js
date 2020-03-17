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
        description: "2D kinematic demonstration",
        creationDate: "2020-02-09",
    }],
    ["orbiter", {
        name: "orbiter",
        displayName: "Orbiter",
        component: OrbiterApp,
        version: "0.2a",
        description: "Orbiter simulation",
        creationDate: "March 8, 2020 00:00:00",
    }],
    ["interactivehistogram", {
        name: "interactivehistogram",
        displayName: "Interactive Histogram",
        component: InteractiveHistogramApp,
        version: "1.0",
        description: "An Interactive Histogram",
        creationDate: "January 1, 2016 00:00:00",
    }],
    ["cubegrid", {
        name: "cubegrid",
        displayName: "CubeGrid",
        component: CubeGridApp,
        version: "0.9b",
        description: "3D customizable grid of cubes",
        creationDate: "January 1, 2016 00:00:00",
    }],
    ["trails", {
        name: "trails",
        displayName: "Trails",
        component: TrailsApp,
        version: "0.7b",
        description: "Trail art creator",
        creationDate: "January 1, 2016 00:00:00",
    }],
    ["triangles", {
        name: "triangles",
        displayName: "Triangles",
        component: TrianglesApp,
        version: "0.8.2b",
        description: "Triangles",
        creationDate: "November 5, 2017 00:00:00",
    }]
]);

export default appMap;
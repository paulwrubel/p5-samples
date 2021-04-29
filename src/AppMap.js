import ChainballApp from "sketches/chainball/ChainballApp";
import OrbiterApp from "sketches/orbiter/OrbiterApp";
import InteractiveHistogramApp from "sketches/interactivehistogram/InteractiveHistogramApp";
import CubeGridApp from "sketches/cubegrid/CubeGridApp";
import TrailsApp from "sketches/trails/TrailsApp";
import TrianglesApp from "sketches/triangles/TrianglesApp";
import ArtGenerator5App from "sketches/artgenerator5/ArtGenerator5App";
import LasersApp from "sketches/lasers/LasersApp";

const appMap = new Map([
    ["chainball", {
        name: "chainball",
        displayName: "Chainball",
        component: ChainballApp,
        version: "v1.0",
        description: "2D kinematic demonstration",
        creationDate: "February 9, 2020 00:00:00",
    }],
    ["orbiter", {
        name: "orbiter",
        displayName: "Orbiter",
        component: OrbiterApp,
        version: "v0.2-alpha",
        description: "Orbiter simulation",
        creationDate: "March 8, 2020 00:00:00",
    }],
    ["interactivehistogram", {
        name: "interactivehistogram",
        displayName: "Interactive Histogram",
        component: InteractiveHistogramApp,
        version: "v1.0",
        description: "An Interactive Histogram",
        creationDate: "January 1, 2016 00:00:00",
    }],
    ["cubegrid", {
        name: "cubegrid",
        displayName: "CubeGrid",
        component: CubeGridApp,
        version: "v0.9-beta",
        description: "3D customizable grid of cubes",
        creationDate: "January 1, 2016 00:00:00",
    }],
    ["trails", {
        name: "trails",
        displayName: "Trails",
        component: TrailsApp,
        version: "v0.7-beta",
        description: "Trail art creator",
        creationDate: "January 1, 2016 00:00:00",
    }],
    ["triangles", {
        name: "triangles",
        displayName: "Triangles",
        component: TrianglesApp,
        version: "v0.8.2-beta",
        description: "Triangles",
        creationDate: "November 5, 2017 00:00:00",
    }],
    ["artgenerator5", {
        name: "artgenerator5",
        displayName: "Art Generator 5",
        component: ArtGenerator5App,
        version: "v0.3-alpha",
        description: "Procedural art generator, pixel by pixel",
        creationDate: "March 17, 2020 00:00:00",
    }],
    ["lasers", {
        name: "lasers",
        displayName: "Lasers",
        component: LasersApp,
        version: "v0.1-alpha",
        description: "Laser simulator hello",
        creationDate: "April 27, 2021 16:11:00",
    }]
]);

export default appMap;
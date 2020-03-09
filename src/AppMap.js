import React from 'react';
import ChainballApp from "sketches/chainball/ChainballApp"
import OrbiterApp from "sketches/orbiter/OrbiterApp"

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
        version: "0.1a",
        description: "Orbiter simulation"
    }]
]);

export default appMap;
/* eslint-disable import/no-webpack-loader-syntax */
import * as THREE from 'three'

import sFragment from '!!raw-loader!../shaders/water/fragment.glsl'
import sVertex from '!!raw-loader!../shaders/water/vertex.glsl'

export default function() {
    const uniforms = {
        time: { value: 0 }
    };
    // console.log(sVertex)
    const material = new THREE.ShaderMaterial({
        wireframe: true,
        transparent: false,
        uniforms,
        vertexShader: sVertex,
        fragmentShader: sFragment
    });

    return material
}
import * as THREE from 'three';
import {Shape, extend, Loop} from 'whitestormjs';
import * as Physijs from 'whitestormjs/physics/index';

class <%= component %> extends Shape {
  constructor(params = {}) {
    super(params, 'sphere');

    extend(params.geometry, {
      radius: 1,
      segmentA: 32,
      segmentB: 32
    });

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    const _Mesh = this.physics ? Physijs.SphereMesh : THREE.Mesh,
      material = new THREE.MeshLambertMaterial({color: 0x00ff00}),
      geometry = new THREE.SphereGeometry(
        params.geometry.radius,
        params.geometry.segmentA * 2,
        params.geometry.segmentB * 2
      ),
      gShape = geometry.clone();

    const anim = new Loop((t) => {
      const timeA = Math.sin(t.getElapsedTime() / 1.5 * 180 * Math.PI / 180);

      for (let i = 0; i < gShape.vertices.length; i++) {
        const v1 = gShape.vertices[i];
        const v2 = geometry.vertices[i];

        const c = Math.sqrt(v1.x * v1.x + v1.z * v1.z);
        const d = c + Math.sin(Math.abs(Math.asin(v1.z / c) / 2 * Math.PI * 180)) / 4 * timeA;

        v2.x = v1.x * d / c;
        v2.z = v1.z * d / c;
      }

      geometry.verticesNeedUpdate = true;
    });

    this.run = () => {
      anim.start(this.parent);
    };

    setInterval(() => {
      anim.clock.elapsedTime = 0;
    }, 3000);

    return new Promise((resolve) => {
      this.native = new _Mesh(
        geometry,
        material,
        this.params
      );

      resolve();
    });
  }

  clone() {
    return new <%= component %>(this.params).copy(this);
  }
}

export {
  <%= component %> as default
};

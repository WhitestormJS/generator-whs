var THREE = require('three');
var WHS = require('whitestormjs');
var Physijs = require('whitestormjs/physics/index');

function <%= component %>(params) {
  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  WHS.Shape.call(this, params, 'sphere');

  WHS.extend(params.geometry, {
    radius: 1,
    segmentA: 32,
    segmentB: 32
  });

  this.build(params);
  this.wrap();
}

<%= component %>.prototype = Object.create(WHS.Shape.prototype);

<%= component %>.prototype.build = function(params) {
  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _Mesh = this.physics ? Physijs.SphereMesh : THREE.Mesh,
    material = new THREE.MeshLambertMaterial({color: 0x00ff00}),
    geometry = new THREE.SphereGeometry(
      params.geometry.radius,
      params.geometry.segmentA * 2,
      params.geometry.segmentB * 2
    ),
    gShape = geometry.clone();

  var anim = new WHS.Loop(function (t) {
    var timeA = Math.sin(t.getElapsedTime() / 1.5 * 180 * Math.PI / 180);

    for (let i = 0; i < gShape.vertices.length; i++) {
      var v1 = gShape.vertices[i];
      var v2 = geometry.vertices[i];

      var c = Math.sqrt(v1.x * v1.x + v1.z * v1.z);
      var d = c + Math.sin(Math.abs(Math.asin(v1.z / c) / 2 * Math.PI * 180)) / 4 * timeA;

      v2.x = v1.x * d / c;
      v2.z = v1.z * d / c;
    }

    geometry.verticesNeedUpdate = true;
  });

  this.run = function () {
    anim.start(this.parent);
  };

  setInterval(function () {
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
};

<%= component %>.prototype.clone = function() {
  return new <%= component %>(this.params).copy(this);
}

module.exports = <%= component %>;

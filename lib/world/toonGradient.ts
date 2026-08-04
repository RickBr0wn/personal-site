import * as THREE from 'three'

export const toonGradientMap = (() => {
  const map = new THREE.DataTexture(new Uint8Array([75, 180]), 2, 1, THREE.RedFormat)
  map.needsUpdate = true
  return map
})()

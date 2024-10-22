import * as THREE from 'three'


export default function getRandomPointsOnRing(R, r, count = 1000){
	return new Array(count).fill(0).map(p => {
        let rand = Math.random();
        let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
        return new THREE.Vector3().setFromSphericalCoords(radius, Math.PI * 0.5, Math.random() * 2 * Math.PI);
    });
}
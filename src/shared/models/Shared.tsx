import {useLayoutEffect, useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {Box3, Vector3} from 'three';

export const Centered = ({children}) => {
	const groupRef = useRef(null);

	useLayoutEffect(() => {
		if (!groupRef.current) return;

		const box = new Box3().setFromObject(groupRef.current);
		const center = new Vector3();
		box.getCenter(center);

		groupRef.current.position.sub(center);
	}, []);

	return <group ref={groupRef}>{children}</group>;
};

export const Controls = ({orbitRef, isIdle}) => {
	useFrame(() => {
		if (orbitRef.current) {
			orbitRef.current.autoRotate = isIdle;
			orbitRef.current.update();
		}
	});
	return null;
};

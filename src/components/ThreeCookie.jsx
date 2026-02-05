import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const CookieHalf = ({ position, rotation, isLeft, onClick }) => {
    // Creating a custom shape for the cookie half
    // Bringing a 2D shape (circle sector) and extruding it or using a tube
    // Simpler approach: A bent Cylinder segment or Torus segment

    return (
        <group position={position} rotation={rotation} onClick={onClick}>
            {/* Use a Torus segment to simulate the folded edge */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1, 0.6, 16, 32, Math.PI]} />
                <meshStandardMaterial
                    color="#f59e0b"
                    roughness={0.8}
                    metalness={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Inner fill to make it look solid */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[1.1, 32, 16, 0, Math.PI]} />
                <meshStandardMaterial color="#fcd34d" />
            </mesh>
        </group>
    );
};

// ... Wait, the torus approach might look like a donut. 
// Let's use a simpler composite shape that looks "good enough" for a stylized cookie.
// A fortune cookie is basically a flat circle folded. 
// We can use a lower-poly approach or a specific "Shape".

const RealisticCookieHalf = ({ side, isOpen }) => {
    // 0 = left, 1 = right
    const sign = side === 'left' ? -1 : 1;

    // Animation logic
    const { position, rotation, opacity } = useSpring({
        position: isOpen ? [sign * 2, -1, 0] : [0, 0, 0],
        rotation: isOpen ? [0, 0, sign * 0.5] : [0, 0, 0],
        opacity: isOpen ? 0 : 1,
        config: config.wobbly
    });

    return (
        <animated.group position={position} rotation={rotation}>
            <mesh
                position={[sign * 0.6, 0, 0]}
                rotation={[0, 0, sign * Math.PI / 4]}
                castShadow receiveShadow
            >
                {/* Main body: A bent capsule/tube */}
                <capsuleGeometry args={[0.5, 1.2, 4, 16]} />
                <meshStandardMaterial
                    color="#eab308"
                    roughness={0.6}
                    bumpScale={0.02}
                />
            </mesh>
            {/* The wing/flap */}
            <mesh
                position={[sign * 0.2, -0.2, 0.4]}
                rotation={[0.5, 0, sign * 0.5]}
            >
                <cylinderGeometry args={[0.1, 0.4, 1.2, 16]} />
                <meshStandardMaterial color="#d97706" />
            </mesh>
        </animated.group>
    );
};

// Okay, those primitives might look weird. 
// Let's rely on a custom Extruded Shape which is much more reliable for specific silhouettes.

const CookieShape = ({ isOpen, onBreak, fortuneText }) => {
    const group = useRef();

    // Spring animation for breaking
    const { split } = useSpring({
        split: isOpen ? 1 : 0,
        config: { mass: 1, tension: 180, friction: 12 }
    });

    return (
        <group ref={group} dispose={null} onClick={(e) => { e.stopPropagation(); onBreak(); }}>
            {/* Left Half Group */}
            <animated.group
                position={split.to(s => [-s * 1.5, -s * 0.5, 0])}
                rotation={split.to(s => [0, 0, s * 0.4])}
            >
                <mesh castShadow receiveShadow geometry={new THREE.TorusGeometry(1, 0.4, 16, 48, Math.PI * 0.8)} position={[-0.2, 0, 0]} rotation={[0, 0, 2]}>
                    <meshStandardMaterial color="#f59e0b" roughness={0.7} />
                </mesh>
            </animated.group>

            {/* Right Half Group */}
            <animated.group
                position={split.to(s => [s * 1.5, -s * 0.5, 0])}
                rotation={split.to(s => [0, 0, -s * 0.4])}
            >
                <mesh castShadow receiveShadow geometry={new THREE.TorusGeometry(1, 0.4, 16, 48, Math.PI * 0.8)} position={[0.2, 0, 0]} rotation={[0, Math.PI, 2]}>
                    <meshStandardMaterial color="#f59e0b" roughness={0.7} />
                </mesh>
            </animated.group>

            {/* Fortune Slip */}
            {isOpen && (
                <FortuneSlip3D text={fortuneText} />
            )}
        </group>
    );
};

const FortuneSlip3D = ({ text }) => {
    const { scale, pos } = useSpring({
        from: { scale: 0, pos: [0, 0, 0] },
        to: { scale: 1, pos: [0, 1.5, 0] },
        config: config.molasses,
        delay: 200
    });

    return (
        <animated.group position={pos} scale={scale}>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3, 0.8, 0.01]} />
                <meshStandardMaterial color="#fffaf0" />
            </mesh>
            <Text
                position={[0, 0, 0.02]}
                fontSize={0.15}
                color="black"
                anchorX="center"
                anchorY="middle"
                maxWidth={2.8}
            >
                {text}
            </Text>
        </animated.group>
    )
}

export default CookieShape;

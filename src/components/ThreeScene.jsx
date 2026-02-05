import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import ThreeCookie from './ThreeCookie';

const ThreeScene = ({ cookies, onCookieClick, revealedId, fortune }) => {
    return (
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Background/Environment */}
            <Environment preset="sunset" />

            <group position={[0, -1, 0]}>
                {cookies.map((id, index) => {
                    // Position 3 cookies in a row
                    const xPos = (index - 1) * 3.5;
                    const isRevealed = revealedId === id;

                    return (
                        <group key={id} position={[xPos, 0, 0]}>
                            <ThreeCookie
                                isOpen={isRevealed}
                                onBreak={() => onCookieClick(id)}
                                fortuneText={isRevealed ? fortune : ""}
                            />
                            <ContactShadows opacity={0.4} scale={5} blur={2.4} far={4} />
                        </group>
                    );
                })}
            </group>

            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
            />
        </Canvas>
    );
};

export default ThreeScene;

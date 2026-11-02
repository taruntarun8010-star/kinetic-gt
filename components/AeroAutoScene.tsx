'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
  MeshReflectorMaterial,
  Html,
} from '@react-three/drei';
import * as THREE from 'three';
import { VehicleSpec } from './catalog';
import { BrandEmblem } from './BrandEmblems';

useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

export interface StudioSettings {
  exposure: number;
  keyLight: number;
  envIntensity: number;
  paintGloss: number;
}

// -------------------------------------------------------------
// Working Mechanical Engine, Pulleys & Coilovers
// -------------------------------------------------------------
function MechanicalPowertrain({
  dynoActive,
  suspensionLift,
}: {
  dynoActive: boolean;
  suspensionLift: boolean;
}) {
  const pulley1Ref = useRef<THREE.Mesh>(null);
  const pulley2Ref = useRef<THREE.Mesh>(null);
  const turboLRef = useRef<THREE.Mesh>(null);
  const turboRRef = useRef<THREE.Mesh>(null);
  const driveshaftRef = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    const spd = dynoActive ? 22 : 1.2;
    if (pulley1Ref.current) pulley1Ref.current.rotation.z += spd * 18 * dt;
    if (pulley2Ref.current) pulley2Ref.current.rotation.z += spd * 24 * dt;
    if (turboLRef.current) turboLRef.current.rotation.x += spd * 32 * dt;
    if (turboRRef.current) turboRRef.current.rotation.x += spd * 32 * dt;
    if (driveshaftRef.current) driveshaftRef.current.rotation.z += spd * 20 * dt;
  });

  return (
    <group position={[0, -0.06, 0]}>
      {/* Driveshaft */}
      <mesh ref={driveshaftRef} position={[0, -0.06, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.038, 0.038, 1.85, 16]} />
        <meshPhysicalMaterial color="#0f172a" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Rear Transaxle Gearbox & Differential */}
      <mesh position={[0, -0.04, 0.95]}>
        <boxGeometry args={[0.44, 0.28, 0.48]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* V12 Twin-Turbo Engine Block */}
      <group position={[0, 0.22, 0.45]} scale={0.88}>
        <mesh>
          <boxGeometry args={[0.62, 0.44, 0.82]} />
          <meshStandardMaterial color="#27272a" metalness={0.92} roughness={0.22} />
        </mesh>
        <mesh position={[-0.22, 0.24, 0]}>
          <boxGeometry args={[0.16, 0.08, 0.78]} />
          <meshStandardMaterial color="#dc2626" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0.22, 0.24, 0]}>
          <boxGeometry args={[0.16, 0.08, 0.78]} />
          <meshStandardMaterial color="#dc2626" metalness={0.5} roughness={0.3} />
        </mesh>

        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.26, 0.12, 0.72]} />
          <meshPhysicalMaterial color="#18181b" metalness={0.4} roughness={0.4} clearcoat={1.0} />
        </mesh>

        {/* Serpentine Pulleys */}
        <group position={[0, 0, -0.42]}>
          <mesh ref={pulley1Ref} position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 20]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.98} roughness={0.1} />
          </mesh>
          <mesh ref={pulley2Ref} position={[-0.14, 0.1, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.03, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.98} roughness={0.1} />
          </mesh>
          <mesh position={[0.14, 0.1, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.03, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.98} roughness={0.1} />
          </mesh>
        </group>

        {/* Turbos */}
        <group position={[-0.38, 0.05, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.14, 0.18, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh ref={turboLRef} position={[0, 0.09, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.02, 12]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
        <group position={[0.38, 0.05, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.14, 0.18, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh ref={turboRRef} position={[0, 0.09, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.02, 12]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Exhaust Manifolds */}
        <mesh position={[-0.32, -0.12, 0.12]}>
          <cylinderGeometry args={[0.05, 0.05, 0.65, 12]} />
          <meshStandardMaterial color="#ea580c" emissive="#f97316" emissiveIntensity={dynoActive ? 6.0 : 1.5} toneMapped={false} />
        </mesh>
        <mesh position={[0.32, -0.12, 0.12]}>
          <cylinderGeometry args={[0.05, 0.05, 0.65, 12]} />
          <meshStandardMaterial color="#ea580c" emissive="#f97316" emissiveIntensity={dynoActive ? 6.0 : 1.5} toneMapped={false} />
        </mesh>
      </group>

      {/* 4x Coilovers */}
      {[
        [-0.64, 0.05 + (suspensionLift ? 0.08 : 0), -1.35],
        [0.64, 0.05 + (suspensionLift ? 0.08 : 0), -1.35],
        [-0.66, 0.05 + (suspensionLift ? 0.08 : 0), 1.35],
        [0.66, 0.05 + (suspensionLift ? 0.08 : 0), 1.35],
      ].map(([sx, sy, sz], i) => (
        <group key={i} position={[sx, sy, sz]}>
          <mesh rotation={[0, 0, sx < 0 ? -0.35 : 0.35]}>
            <cylinderGeometry args={[0.042, 0.042, 0.32, 12]} />
            <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[sx < 0 ? 0.12 : -0.12, 0.08, 0]} rotation={[0, 0, sx < 0 ? 0.2 : -0.2]}>
            <boxGeometry args={[0.28, 0.025, 0.04]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// -------------------------------------------------------------
// Interactive Aircraft Model
// -------------------------------------------------------------
function InteractiveAircraft({
  vehicle,
  currentColor,
  explodeProgress,
}: {
  vehicle: VehicleSpec;
  currentColor: string;
  explodeProgress: number;
}) {
  const gltf = useGLTF('/cesium_air.glb');
  const clonedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(currentColor),
          metalness: 0.85,
          roughness: 0.18,
          clearcoat: 1.0,
        });
      }
    });
  }, [clonedScene, currentColor]);

  return (
    <group
      scale={vehicle.proportions.scale}
      position={vehicle.proportions.positionOffset || [0, 0, 0]}
    >
      <primitive object={clonedScene} />
      {/* Brand Emblem */}
      <group position={[0, 0.35, -2.1]}>
        <Html transform scale={0.06} pointerEvents="none">
          <BrandEmblem brand={vehicle.brand} className="w-8 h-8 text-amber-500" />
        </Html>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Interactive Car Model
// -------------------------------------------------------------
function InteractiveRealCar({
  vehicle,
  currentColor,
  explodeProgress,
  doorsOpen,
  hoodOpen,
  bootOpen,
  headlightsOn,
  hazardBlinkers,
  dynoActive,
  suspensionLift,
  steeringAngle,
  paintGloss,
  onToggleDoors,
  onToggleHood,
  onToggleBoot,
}: {
  vehicle: VehicleSpec;
  currentColor: string;
  explodeProgress: number;
  doorsOpen: boolean;
  hoodOpen: boolean;
  bootOpen: boolean;
  headlightsOn: boolean;
  hazardBlinkers: boolean;
  dynoActive: boolean;
  suspensionLift: boolean;
  steeringAngle: number;
  paintGloss: number;
  onToggleDoors: () => void;
  onToggleHood: () => void;
  onToggleBoot: () => void;
}) {
  const gltf = useGLTF('/ferrari.glb');
  const clonedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  const carRootRef = useRef<THREE.Group>(null);
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const frontHoodRef = useRef<THREE.Group>(null);
  const rearBootRef = useRef<THREE.Group>(null);

  // Wheel spin & steer groups
  const wheelFLRef = useRef<THREE.Group>(null);
  const wheelFRRef = useRef<THREE.Group>(null);
  const wheelRLRef = useRef<THREE.Group>(null);
  const wheelRRRef = useRef<THREE.Group>(null);

  const steerFLRef = useRef<THREE.Group>(null);
  const steerFRRef = useRef<THREE.Group>(null);

  const [blinkState, setBlinkState] = useState(false);

  useEffect(() => {
    if (!hazardBlinkers) {
      setBlinkState(false);
      return;
    }
    const iv = setInterval(() => setBlinkState((b) => !b), 450);
    return () => clearInterval(iv);
  }, [hazardBlinkers]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = (mesh.name || '').toLowerCase();

        // Hide default Ferrari horse when selecting Bugatti, Porsche, Lambo, etc.
        if (
          !vehicle.brand.toLowerCase().includes('ferrari') &&
          (name.includes('horse') ||
            name.includes('badge') ||
            name.includes('emblem') ||
            name.includes('logo') ||
            name.includes('cavallino'))
        ) {
          mesh.visible = false;
          return;
        }

        // Tires
        if (name.includes('tire') || name.includes('rubber')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#141416'),
            roughness: 0.85,
            metalness: 0.05,
          });
        }
        // Diamond-cut rims
        else if (name.includes('rim') || name.includes('wheel') || name.includes('spoke')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#27272a'),
            metalness: 0.95,
            roughness: 0.18,
          });
        }
        // Brake calipers
        else if (name.includes('caliper') || name.includes('brake')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#dc2626'),
            metalness: 0.85,
            roughness: 0.25,
          });
        }
        // Smoked tinted glass
        else if (name.includes('glass') || name.includes('window') || name.includes('windshield')) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#0f172a'),
            transparent: true,
            opacity: 0.5,
            metalness: 0.9,
            roughness: 0.04,
            ior: 1.52,
          });
        }
        // Body paint
        else {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(currentColor),
            metalness: THREE.MathUtils.lerp(0.68, 0.94, paintGloss),
            roughness: THREE.MathUtils.lerp(0.28, 0.06, paintGloss),
            clearcoat: 1.0,
            clearcoatRoughness: 0.03,
          });
        }
      }
    });
  }, [clonedScene, currentColor, paintGloss, vehicle.brand]);

  // Brand kinematics
  const brand = vehicle.brand.toLowerCase();
  const isLambo = brand.includes('lamborghini');
  const isKoenigsegg = brand.includes('koenigsegg');
  const isRolls = brand.includes('rolls');

  useFrame((_, dt) => {
    // 1. Wheel Dyno Spin
    if (dynoActive) {
      const spd = 22 * dt;
      if (wheelFLRef.current) wheelFLRef.current.rotation.x -= spd;
      if (wheelFRRef.current) wheelFRRef.current.rotation.x -= spd;
      if (wheelRLRef.current) wheelRLRef.current.rotation.x -= spd;
      if (wheelRRRef.current) wheelRRRef.current.rotation.x -= spd;
    }

    // 2. Front Wheel Steering
    const targetSteerRad = (steeringAngle * Math.PI) / 180;
    if (steerFLRef.current) steerFLRef.current.rotation.y = THREE.MathUtils.lerp(steerFLRef.current.rotation.y, targetSteerRad, 0.12);
    if (steerFRRef.current) steerFRRef.current.rotation.y = THREE.MathUtils.lerp(steerFRRef.current.rotation.y, targetSteerRad, 0.12);

    // 3. Air Suspension Ride Height
    if (carRootRef.current) {
      const targetY = suspensionLift ? -0.38 : -0.48;
      carRootRef.current.position.y = THREE.MathUtils.lerp(carRootRef.current.position.y, targetY, 0.08);
    }

    // 4. Doors Opening
    if (leftDoorRef.current && rightDoorRef.current) {
      if (isLambo) {
        const rotX = doorsOpen ? -1.25 : 0;
        leftDoorRef.current.rotation.x = THREE.MathUtils.lerp(leftDoorRef.current.rotation.x, rotX, 0.08);
        rightDoorRef.current.rotation.x = THREE.MathUtils.lerp(rightDoorRef.current.rotation.x, rotX, 0.08);
      } else if (isKoenigsegg) {
        const posX = doorsOpen ? -0.25 : 0;
        const rotZ = doorsOpen ? 1.45 : 0;
        leftDoorRef.current.position.x = THREE.MathUtils.lerp(leftDoorRef.current.position.x, posX, 0.08);
        leftDoorRef.current.rotation.z = THREE.MathUtils.lerp(leftDoorRef.current.rotation.z, rotZ, 0.08);
        rightDoorRef.current.position.x = THREE.MathUtils.lerp(rightDoorRef.current.position.x, -posX, 0.08);
        rightDoorRef.current.rotation.z = THREE.MathUtils.lerp(rightDoorRef.current.rotation.z, -rotZ, 0.08);
      } else if (isRolls) {
        const rotY = doorsOpen ? -1.15 : 0;
        leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(leftDoorRef.current.rotation.y, rotY, 0.08);
        rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(rightDoorRef.current.rotation.y, -rotY, 0.08);
      } else {
        const rotZ = doorsOpen ? 0.65 : 0;
        const rotY = doorsOpen ? -0.45 : 0;
        leftDoorRef.current.rotation.z = THREE.MathUtils.lerp(leftDoorRef.current.rotation.z, rotZ, 0.08);
        leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(leftDoorRef.current.rotation.y, -0.45, 0.08);
        rightDoorRef.current.rotation.z = THREE.MathUtils.lerp(rightDoorRef.current.rotation.z, -rotZ, 0.08);
        rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(rightDoorRef.current.rotation.y, 0.45, 0.08);
      }
    }

    // 5. Front Hood
    if (frontHoodRef.current) {
      const rotX = hoodOpen ? 0.75 : 0;
      const posY = hoodOpen ? 0.25 : 0;
      frontHoodRef.current.rotation.x = THREE.MathUtils.lerp(frontHoodRef.current.rotation.x, rotX, 0.08);
      frontHoodRef.current.position.y = THREE.MathUtils.lerp(frontHoodRef.current.position.y, posY, 0.08);
    }

    // 6. Rear Boot
    if (rearBootRef.current) {
      const rotX = bootOpen ? -0.85 : 0;
      const posY = bootOpen ? 0.32 : 0;
      rearBootRef.current.rotation.x = THREE.MathUtils.lerp(rearBootRef.current.rotation.x, rotX, 0.08);
      rearBootRef.current.position.y = THREE.MathUtils.lerp(rearBootRef.current.position.y, posY, 0.08);
    }
  });

  const ep = explodeProgress;

  return (
    <group
      ref={carRootRef}
      scale={vehicle.proportions.scale}
      position={vehicle.proportions.positionOffset || [0, -0.48, 0]}
    >
      <primitive
        object={clonedScene}
        onDoubleClick={(e: { stopPropagation: () => void; object: THREE.Object3D }) => {
          e.stopPropagation();
          const name = ((e.object as THREE.Mesh).name || '').toLowerCase();
          if (name.includes('door') || name.includes('side')) onToggleDoors();
          else if (name.includes('hood') || name.includes('frunk')) onToggleHood();
          else onToggleBoot();
        }}
      />

      <MechanicalPowertrain dynoActive={dynoActive} suspensionLift={suspensionLift} />

      {/* FRONT HOOD */}
      <group
        ref={frontHoodRef}
        position={[0, 0.38 + ep * 1.4, -1.2 - ep * 1.5]}
        onClick={(e) => {
          e.stopPropagation();
          onToggleHood();
        }}
      >
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.04, 1.25]} />
          <meshPhysicalMaterial color={currentColor} metalness={0.9} roughness={0.12} clearcoat={1.0} />
        </mesh>
      </group>

      {/* REAR BOOT */}
      <group
        ref={rearBootRef}
        position={[0, 0.48 + ep * 1.4, 1.35 + ep * 1.5]}
        onClick={(e) => {
          e.stopPropagation();
          onToggleBoot();
        }}
      >
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 0.04, 1.15]} />
          <meshPhysicalMaterial color={currentColor} metalness={0.9} roughness={0.12} clearcoat={1.0} />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[1.1, 0.22, 0.85]} />
          <meshStandardMaterial color="#1e2229" roughness={0.7} />
        </mesh>
      </group>

      {/* LEFT DOOR */}
      <group
        ref={leftDoorRef}
        position={[-0.86 - ep * 1.6, 0.28, isRolls ? 0.65 : -0.45]}
        onClick={(e) => {
          e.stopPropagation();
          onToggleDoors();
        }}
      >
        <mesh position={[-0.05, 0.18, 0]}>
          <boxGeometry args={[0.08, 0.52, 1.35]} />
          <meshPhysicalMaterial color={currentColor} metalness={0.88} roughness={0.15} clearcoat={1.0} />
        </mesh>
        <mesh position={[-0.06, 0.52, -0.05]}>
          <boxGeometry args={[0.02, 0.28, 0.95]} />
          <meshPhysicalMaterial color="#0f172a" transparent opacity={0.5} roughness={0.04} />
        </mesh>
      </group>

      {/* RIGHT DOOR */}
      <group
        ref={rightDoorRef}
        position={[0.86 + ep * 1.6, 0.28, isRolls ? 0.65 : -0.45]}
        onClick={(e) => {
          e.stopPropagation();
          onToggleDoors();
        }}
      >
        <mesh position={[0.05, 0.18, 0]}>
          <boxGeometry args={[0.08, 0.52, 1.35]} />
          <meshPhysicalMaterial color={currentColor} metalness={0.88} roughness={0.15} clearcoat={1.0} />
        </mesh>
        <mesh position={[0.06, 0.52, -0.05]}>
          <boxGeometry args={[0.02, 0.28, 0.95]} />
          <meshPhysicalMaterial color="#0f172a" transparent opacity={0.5} roughness={0.04} />
        </mesh>
      </group>

      {/* 4x WHEELS */}
      <group position={[-0.88 - ep * 1.8, -0.22, -1.35]}>
        <group ref={steerFLRef}>
          <group ref={wheelFLRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.34, 0.13, 16, 32]} />
              <meshStandardMaterial color="#141416" roughness={0.85} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.14, 24]} />
              <meshStandardMaterial color="#27272a" metalness={0.95} roughness={0.18} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.025, 24]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.98} roughness={0.15} />
            </mesh>
          </group>
          <mesh position={[0, 0.16, 0.06]}>
            <boxGeometry args={[0.08, 0.12, 0.06]} />
            <meshStandardMaterial color="#dc2626" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      </group>

      <group position={[0.88 + ep * 1.8, -0.22, -1.35]}>
        <group ref={steerFRRef}>
          <group ref={wheelFRRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.34, 0.13, 16, 32]} />
              <meshStandardMaterial color="#141416" roughness={0.85} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.14, 24]} />
              <meshStandardMaterial color="#27272a" metalness={0.95} roughness={0.18} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.025, 24]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.98} roughness={0.15} />
            </mesh>
          </group>
          <mesh position={[0, 0.16, 0.06]}>
            <boxGeometry args={[0.08, 0.12, 0.06]} />
            <meshStandardMaterial color="#dc2626" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      </group>

      <group position={[-0.9 - ep * 1.8, -0.22, 1.38]}>
        <group ref={wheelRLRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35, 0.14, 16, 32]} />
            <meshStandardMaterial color="#141416" roughness={0.85} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.27, 0.27, 0.16, 24]} />
            <meshStandardMaterial color="#27272a" metalness={0.95} roughness={0.18} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.23, 0.23, 0.025, 24]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.98} roughness={0.15} />
          </mesh>
        </group>
        <mesh position={[0, 0.16, 0.06]}>
          <boxGeometry args={[0.08, 0.12, 0.06]} />
          <meshStandardMaterial color="#dc2626" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      <group position={[0.9 + ep * 1.8, -0.22, 1.38]}>
        <group ref={wheelRRRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35, 0.14, 16, 32]} />
            <meshStandardMaterial color="#141416" roughness={0.85} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.27, 0.27, 0.16, 24]} />
            <meshStandardMaterial color="#27272a" metalness={0.95} roughness={0.18} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.23, 0.23, 0.025, 24]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.98} roughness={0.15} />
          </mesh>
        </group>
        <mesh position={[0, 0.16, 0.06]}>
          <boxGeometry args={[0.08, 0.12, 0.06]} />
          <meshStandardMaterial color="#dc2626" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* HEADLIGHTS */}
      <group position={[0, 0.18, -2.18]}>
        <mesh position={[-0.65, 0, 0]}>
          <boxGeometry args={[0.32, 0.07, 0.04]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={headlightsOn ? '#ffffff' : '#334155'}
            emissiveIntensity={headlightsOn ? 14 : 0.5}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0.65, 0, 0]}>
          <boxGeometry args={[0.32, 0.07, 0.04]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={headlightsOn ? '#ffffff' : '#334155'}
            emissiveIntensity={headlightsOn ? 14 : 0.5}
            toneMapped={false}
          />
        </mesh>

        {headlightsOn && (
          <>
            <spotLight
              position={[-0.65, 0, 0.1]}
              target-position={[-0.65, -0.8, -18]}
              intensity={18}
              distance={28}
              color="#f0f9ff"
              angle={0.48}
              penumbra={0.5}
              castShadow
            />
            <spotLight
              position={[0.65, 0, 0.1]}
              target-position={[0.65, -0.8, -18]}
              intensity={18}
              distance={28}
              color="#f0f9ff"
              angle={0.48}
              penumbra={0.5}
              castShadow
            />
          </>
        )}
      </group>

      {/* TAILLIGHT */}
      <group position={[0, 0.22, 2.18]}>
        <mesh>
          <boxGeometry args={[1.68, 0.055, 0.04]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={6} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 0, 0.4]} intensity={5} distance={7} color="#ef4444" />
      </group>

      {/* HAZARDS */}
      {hazardBlinkers && blinkState && (
        <>
          <pointLight position={[-0.85, 0.18, -2.1]} intensity={8} distance={6} color="#f59e0b" />
          <pointLight position={[0.85, 0.18, -2.1]} intensity={8} distance={6} color="#f59e0b" />
          <pointLight position={[-0.85, 0.22, 2.1]} intensity={8} distance={6} color="#f59e0b" />
          <pointLight position={[0.85, 0.22, 2.1]} intensity={8} distance={6} color="#f59e0b" />
        </>
      )}

      {/* BRAND EMBLEMS */}
      <group position={[0, 0.32, -2.12]}>
        <Html transform scale={0.06} position={[0, 0, 0]} pointerEvents="none">
          <BrandEmblem brand={vehicle.brand} className="w-8 h-8 text-amber-500" />
        </Html>
      </group>
      <group position={[0, 0.48, 2.08]} rotation={[0, Math.PI, 0]}>
        <Html transform scale={0.06} position={[0, 0, 0]} pointerEvents="none">
          <BrandEmblem brand={vehicle.brand} className="w-7 h-7 text-slate-700" />
        </Html>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Showroom Environment (Dark or Light Theme)
// -------------------------------------------------------------
function ShowroomEnvironment({ isDarkMode }: { isDarkMode: boolean }) {
  if (isDarkMode) {
    return (
      <>
        <color attach="background" args={['#060606']} />
        <Environment preset="night" environmentIntensity={0.7} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[6, 12, 6]} intensity={2.2} castShadow color="#ffffff" />
        <directionalLight position={[-6, 8, -4]} intensity={1.2} color="#38bdf8" />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, 0]}>
          <planeGeometry args={[60, 60]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={35}
            roughness={0.15}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#080808"
            metalness={0.8}
            mirror={0.65}
          />
        </mesh>
      </>
    );
  }

  return (
    <>
      <color attach="background" args={['#f8fafc']} />
      <Environment preset="city" environmentIntensity={1.3} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 12, 6]} intensity={2.8} castShadow color="#ffffff" shadow-bias={-0.0001} />
      <directionalLight position={[-6, 8, -4]} intensity={1.6} color="#e2e8f0" />
      <directionalLight position={[0, 6, -8]} intensity={1.2} color="#ffffff" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, 0]}>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={35}
          roughness={0.12}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#f1f5f9"
          metalness={0.3}
          mirror={0.55}
        />
      </mesh>
    </>
  );
}

// -------------------------------------------------------------
// Master Aero-Auto Scene Export
// -------------------------------------------------------------
export interface AeroAutoSceneProps {
  vehicle: VehicleSpec;
  currentColor: string;
  scrollProgress: number;
  doorsOpen: boolean;
  hoodOpen: boolean;
  bootOpen: boolean;
  headlightsOn: boolean;
  hazardBlinkers: boolean;
  dynoActive: boolean;
  suspensionLift: boolean;
  steeringAngle: number;
  isDarkMode: boolean;
  studio: StudioSettings;
  onToggleDoors: () => void;
  onToggleHood: () => void;
  onToggleBoot: () => void;
}

export default function AeroAutoScene({
  vehicle,
  currentColor,
  scrollProgress,
  doorsOpen,
  hoodOpen,
  bootOpen,
  headlightsOn,
  hazardBlinkers,
  dynoActive,
  suspensionLift,
  steeringAngle,
  isDarkMode,
  studio,
  onToggleDoors,
  onToggleHood,
  onToggleBoot,
}: AeroAutoSceneProps) {
  const isAviation = vehicle.category === 'aviation';

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: isDarkMode ? 0.9 : 1.15,
      }}
      camera={{ position: [0, 1.35, 5.5], fov: 48 }}
      style={{ background: isDarkMode ? '#060606' : '#f8fafc' }}
    >
      <ShowroomEnvironment isDarkMode={isDarkMode} />

      <React.Suspense fallback={null}>
        {isAviation ? (
          <InteractiveAircraft
            vehicle={vehicle}
            currentColor={currentColor}
            explodeProgress={scrollProgress}
          />
        ) : (
          <InteractiveRealCar
            vehicle={vehicle}
            currentColor={currentColor}
            explodeProgress={scrollProgress}
            doorsOpen={doorsOpen}
            hoodOpen={hoodOpen}
            bootOpen={bootOpen}
            headlightsOn={headlightsOn}
            hazardBlinkers={hazardBlinkers}
            dynoActive={dynoActive}
            suspensionLift={suspensionLift}
            steeringAngle={steeringAngle}
            paintGloss={studio.paintGloss}
            onToggleDoors={onToggleDoors}
            onToggleHood={onToggleHood}
            onToggleBoot={onToggleBoot}
          />
        )}
      </React.Suspense>

      <ContactShadows
        position={[0, -0.51, 0]}
        opacity={isDarkMode ? 0.85 : 0.65}
        scale={14}
        blur={2.0}
        far={5}
        color={isDarkMode ? '#000000' : '#0f172a'}
      />

      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={14}
        minPolarAngle={Math.PI * 0.12}
        maxPolarAngle={Math.PI * 0.82}
        target={[0, 0.1, 0]}
      />
    </Canvas>
  );
}

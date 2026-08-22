"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Navigation, Waves } from "lucide-react";
import React, { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { soundFx } from "@/utils/soundEffects";

// =========================================================================
// 🌍 EXTENSIVE GLOBAL CITIES & COUNTRIES DATASET
// =========================================================================
export interface LocationPin {
  id: string;
  name: string;
  country: string;
  region: "India" | "Asia" | "Europe" | "Americas" | "Middle East" | "Oceania" | "Africa" | "Ocean";
  lat: number;
  lon: number;
  type: "city" | "ocean" | "sea";
  role: string;
  status: string;
  badgeColor: string;
  isHome?: boolean;
}

const LOCATIONS: LocationPin[] = [
  // --- INDIA MAJOR HUBS ---
  {
    id: "india-delhi",
    name: "New Delhi",
    country: "India",
    region: "India",
    lat: 28.6139,
    lon: 77.209,
    type: "city",
    role: "Lead Developer & Base Station",
    status: "🟢 Base Station Active",
    badgeColor: "#fbbf24",
    isHome: true,
  },
  {
    id: "india-blr",
    name: "Bengaluru",
    country: "India",
    region: "India",
    lat: 12.9716,
    lon: 77.5946,
    type: "city",
    role: "Silicon Valley of India · Software Hub",
    status: "⚡ High-Speed Node",
    badgeColor: "#34d399",
    isHome: true,
  },
  {
    id: "india-mumbai",
    name: "Mumbai",
    country: "India",
    region: "India",
    lat: 19.076,
    lon: 72.8777,
    type: "city",
    role: "Financial Capital & Enterprise Tech",
    status: "⚡ Connected",
    badgeColor: "#22e1ff",
  },
  {
    id: "india-hyd",
    name: "Hyderabad",
    country: "India",
    region: "India",
    lat: 17.385,
    lon: 78.4867,
    type: "city",
    role: "Cyberabad · Cloud & AI Engineering",
    status: "⚡ Connected",
    badgeColor: "#8b5cf6",
  },
  {
    id: "india-pune",
    name: "Pune",
    country: "India",
    region: "India",
    lat: 18.5204,
    lon: 73.8567,
    type: "city",
    role: "Automotive & IT Innovation Hub",
    status: "⚡ Active",
    badgeColor: "#38bdf8",
  },
  {
    id: "india-chennai",
    name: "Chennai",
    country: "India",
    region: "India",
    lat: 13.0827,
    lon: 80.2707,
    type: "city",
    role: "SaaS Capital & Deep Tech Center",
    status: "⚡ Connected",
    badgeColor: "#2dd4bf",
  },
  {
    id: "india-kolkata",
    name: "Kolkata",
    country: "India",
    region: "India",
    lat: 22.5726,
    lon: 88.3639,
    type: "city",
    role: "Eastern Tech & Digital Gateway",
    status: "⚡ Active",
    badgeColor: "#a855f7",
  },
  {
    id: "india-jaipur",
    name: "Jaipur",
    country: "India",
    region: "India",
    lat: 26.9124,
    lon: 75.7873,
    type: "city",
    role: "Software & IT Services Center",
    status: "⚡ Active",
    badgeColor: "#fbbf24",
  },
  {
    id: "india-ahmedabad",
    name: "Ahmedabad",
    country: "India",
    region: "India",
    lat: 23.0225,
    lon: 72.5714,
    type: "city",
    role: "Fintech City & Industrial Tech",
    status: "⚡ Active",
    badgeColor: "#4ade80",
  },

  // --- AMERICAS ---
  {
    id: "us-sf",
    name: "San Francisco",
    country: "United States",
    region: "Americas",
    lat: 37.7749,
    lon: -122.4194,
    type: "city",
    role: "Silicon Valley Tech Ecosystem",
    status: "🌐 Remote Ready",
    badgeColor: "#8b5cf6",
  },
  {
    id: "us-nyc",
    name: "New York",
    country: "United States",
    region: "Americas",
    lat: 40.7128,
    lon: -74.006,
    type: "city",
    role: "Global Fintech & Enterprise HQ",
    status: "🌐 Remote Ready",
    badgeColor: "#38bdf8",
  },
  {
    id: "us-seattle",
    name: "Seattle",
    country: "United States",
    region: "Americas",
    lat: 47.6062,
    lon: -122.3321,
    type: "city",
    role: "Cloud Infrastructure Center",
    status: "🌐 Available",
    badgeColor: "#60a5fa",
  },
  {
    id: "us-austin",
    name: "Austin",
    country: "United States",
    region: "Americas",
    lat: 30.2672,
    lon: -97.7431,
    type: "city",
    role: "Silicon Hills · Startup Tech",
    status: "🌐 Available",
    badgeColor: "#34d399",
  },
  {
    id: "ca-toronto",
    name: "Toronto",
    country: "Canada",
    region: "Americas",
    lat: 43.6532,
    lon: -79.3832,
    type: "city",
    role: "Canadian AI & Quantum Tech Corridor",
    status: "🌐 Available",
    badgeColor: "#fb7185",
  },
  {
    id: "ca-vancouver",
    name: "Vancouver",
    country: "Canada",
    region: "Americas",
    lat: 49.2827,
    lon: -123.1207,
    type: "city",
    role: "Pacific Northwest Software Hub",
    status: "🌐 Available",
    badgeColor: "#22e1ff",
  },
  {
    id: "br-saopaulo",
    name: "São Paulo",
    country: "Brazil",
    region: "Americas",
    lat: -23.5505,
    lon: -46.6333,
    type: "city",
    role: "Latin America Financial & Tech Capital",
    status: "🌐 Available",
    badgeColor: "#fbbf24",
  },

  // --- EUROPE ---
  {
    id: "uk-london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    lat: 51.5074,
    lon: -0.1278,
    type: "city",
    role: "European Tech & Digital Innovation",
    status: "✨ Collaboration",
    badgeColor: "#c084fc",
  },
  {
    id: "de-berlin",
    name: "Berlin",
    country: "Germany",
    region: "Europe",
    lat: 52.52,
    lon: 13.405,
    type: "city",
    role: "European Startup & Open Source Hub",
    status: "✨ Available",
    badgeColor: "#38bdf8",
  },
  {
    id: "de-frankfurt",
    name: "Frankfurt",
    country: "Germany",
    region: "Europe",
    lat: 50.1109,
    lon: 8.6821,
    type: "city",
    role: "European Financial & Internet Backbone",
    status: "✨ Connected",
    badgeColor: "#34d399",
  },
  {
    id: "fr-paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    lat: 48.8566,
    lon: 2.3522,
    type: "city",
    role: "AI Research & Digital Creative Hub",
    status: "✨ Available",
    badgeColor: "#fb7185",
  },
  {
    id: "nl-amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    region: "Europe",
    lat: 52.3676,
    lon: 4.9041,
    type: "city",
    role: "High-Speed Internet Exchange Node",
    status: "✨ Connected",
    badgeColor: "#22e1ff",
  },
  {
    id: "ch-zurich",
    name: "Zurich",
    country: "Switzerland",
    region: "Europe",
    lat: 47.3769,
    lon: 8.5417,
    type: "city",
    role: "Precision Engineering & Fintech Hub",
    status: "✨ Available",
    badgeColor: "#fbbf24",
  },

  // --- ASIA PACIFIC & MIDDLE EAST ---
  {
    id: "jp-tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    lat: 35.6762,
    lon: 139.6503,
    type: "city",
    role: "Creative Tech, Robotics & Gaming",
    status: "⚡ High-Speed Node",
    badgeColor: "#fb7185",
  },
  {
    id: "ae-dubai",
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    lat: 25.2048,
    lon: 55.2708,
    type: "city",
    role: "MENA Global Digital Hub & Web3",
    status: "✨ Available",
    badgeColor: "#fbbf24",
  },
  {
    id: "sg-singapore",
    name: "Singapore",
    country: "Singapore",
    region: "Asia",
    lat: 1.3521,
    lon: 103.8198,
    type: "city",
    role: "Southeast Asia AI & Financial Gateway",
    status: "🌐 Connected",
    badgeColor: "#2dd4bf",
  },
  {
    id: "au-sydney",
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    lat: -33.8688,
    lon: 151.2093,
    type: "city",
    role: "APAC Innovation Network",
    status: "🌐 Available",
    badgeColor: "#60a5fa",
  },
  {
    id: "au-melbourne",
    name: "Melbourne",
    country: "Australia",
    region: "Oceania",
    lat: -37.8136,
    lon: 144.9631,
    type: "city",
    role: "Australia Creative Tech Center",
    status: "🌐 Available",
    badgeColor: "#34d399",
  },

  // --- OCEANS & SEAS ---
  {
    id: "ocean-indian",
    name: "Indian Ocean",
    country: "International Waters",
    region: "Ocean",
    lat: -10.0,
    lon: 80.0,
    type: "ocean",
    role: "Subsea Fiber Optic Cable Highway",
    status: "🌊 Global Oceanic Route",
    badgeColor: "#0ea5e9",
  },
  {
    id: "ocean-arabian",
    name: "Arabian Sea",
    country: "Indian Subcontinent Coast",
    region: "Ocean",
    lat: 16.0,
    lon: 65.0,
    type: "sea",
    role: "Western Maritime & Trade Conduits",
    status: "🌊 Regional Sea Highway",
    badgeColor: "#38bdf8",
  },
  {
    id: "ocean-bengal",
    name: "Bay of Bengal",
    country: "Eastern Indian Coast",
    region: "Ocean",
    lat: 15.0,
    lon: 88.0,
    type: "sea",
    role: "South Asian Subsea Telemetry",
    status: "🌊 High-Bandwidth Line",
    badgeColor: "#38bdf8",
  },
  {
    id: "ocean-pacific",
    name: "Pacific Ocean",
    country: "International Waters",
    region: "Ocean",
    lat: 0.0,
    lon: -160.0,
    type: "ocean",
    role: "Trans-Pacific Terabit Data Cables",
    status: "🌊 World Largest Ocean",
    badgeColor: "#0284c7",
  },
  {
    id: "ocean-atlantic",
    name: "Atlantic Ocean",
    country: "International Waters",
    region: "Ocean",
    lat: 25.0,
    lon: -40.0,
    type: "ocean",
    role: "Trans-Atlantic Fiber Backbones",
    status: "🌊 Intercontinental Link",
    badgeColor: "#0284c7",
  },
  {
    id: "ocean-mediterranean",
    name: "Mediterranean Sea",
    country: "Southern Europe / North Africa",
    region: "Ocean",
    lat: 35.0,
    lon: 18.0,
    type: "sea",
    role: "Euro-African Digital Gateway",
    status: "🌊 Historic Maritime Basin",
    badgeColor: "#38bdf8",
  },
];

// Helper: Convert Lat/Long to 3D Cartesian Vector
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Helper: Create 3D Curved Arc Path between two Lat/Lon points
function createCurvedArc(
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number,
  globeRadius: number
): THREE.Vector3[] {
  const p1 = latLonToVector3(startLat, startLon, globeRadius);
  const p2 = latLonToVector3(endLat, endLon, globeRadius);

  // Midpoint with height elevation
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  const distance = p1.distanceTo(p2);
  const maxAltitude = globeRadius + Math.min(distance * 0.28, 0.65);
  mid.normalize().multiplyScalar(maxAltitude);

  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  return curve.getPoints(40);
}

// =========================================================================
// ✈️ 3D GLOBAL DATA ARCS (Connecting India Base to Worldwide Hubs)
// =========================================================================
const FLIGHT_CONNECTIONS = [
  { from: [28.6139, 77.209], to: [37.7749, -122.4194], color: "#22e1ff" }, // Delhi -> SF
  { from: [28.6139, 77.209], to: [51.5074, -0.1278], color: "#a855f7" },  // Delhi -> London
  { from: [12.9716, 77.5946], to: [35.6762, 139.6503], color: "#fb7185" }, // BLR -> Tokyo
  { from: [12.9716, 77.5946], to: [1.3521, 103.8198], color: "#2dd4bf" },  // BLR -> Singapore
  { from: [19.076, 72.8777], to: [25.2048, 55.2708], color: "#fbbf24" },   // Mumbai -> Dubai
  { from: [28.6139, 77.209], to: [-33.8688, 151.2093], color: "#60a5fa" }, // Delhi -> Sydney
  { from: [51.5074, -0.1278], to: [40.7128, -74.006], color: "#38bdf8" },  // London -> NYC
];

function GlobalFlightArcs() {
  const arcs = useMemo(() => {
    return FLIGHT_CONNECTIONS.map((conn) => {
      const points = createCurvedArc(conn.from[0], conn.from[1], conn.to[0], conn.to[1], 2.0);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return { geometry, color: conn.color };
    });
  }, []);

  return (
    <group>
      {arcs.map((arc, i) => (
        <primitive key={i} object={new THREE.Line(arc.geometry, new THREE.LineBasicMaterial({ color: arc.color, transparent: true, opacity: 0.55, linewidth: 1.5 }))} />
      ))}
    </group>
  );
}

// =========================================================================
// 📍 3D LOCATION PIN & OCEAN BEACON
// =========================================================================
function PinMarker({
  location,
  onSelect,
  isSelected,
}: {
  location: LocationPin;
  onSelect: (loc: LocationPin) => void;
  isSelected: boolean;
}) {
  const pinRef = useRef<THREE.Group>(null);
  const isOcean = location.type === "ocean" || location.type === "sea";
  const pos = useMemo(() => latLonToVector3(location.lat, location.lon, isOcean ? 2.02 : 2.035), [location, isOcean]);

  useFrame((state) => {
    if (pinRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3.5 + location.lat) * 0.18;
      pinRef.current.scale.setScalar(isSelected ? 1.7 : pulse);
    }
  });

  return (
    <group
      ref={pinRef}
      position={pos}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(location);
      }}
    >
      {isOcean ? (
        // Subtle Oceanic / Sea Hydro-Beacon
        <mesh>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={2.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ) : (
        // City Tech Pin
        <>
          <mesh>
            <sphereGeometry args={[0.042, 16, 16]} />
            <meshStandardMaterial
              color={location.isHome ? "#fbbf24" : location.badgeColor}
              emissive={location.isHome ? "#fbbf24" : location.badgeColor}
              emissiveIntensity={3.8}
            />
          </mesh>

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.055, 0.085, 20]} />
            <meshBasicMaterial
              color={location.isHome ? "#fbbf24" : location.badgeColor}
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

// =========================================================================
// 🌐 REALISTIC EARTH GLOBE SPHERE WITH SATELLITE MAPS
// =========================================================================
function RealisticGlobeSphere({
  onSelectLocation,
  selectedLocation,
}: {
  onSelectLocation: (loc: LocationPin) => void;
  selectedLocation: LocationPin | null;
}) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Load NASA Satellite Textures
  const [colorMap, bumpMap, waterMap] = useLoader(TextureLoader, [
    "/textures/earth-blue-marble.jpg",
    "/textures/earth-topology.png",
    "/textures/earth-water.png",
  ]);

  // Smooth realistic slow rotation
  useFrame((_, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.065;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group>
      {/* Main Rotating Earth Group */}
      <group ref={globeGroupRef}>
        {/* Realistic Satellite Earth Surface with Water Reflections */}
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            map={colorMap}
            bumpMap={bumpMap}
            bumpScale={0.06}
            roughnessMap={waterMap}
            roughness={0.65}
            metalness={0.12}
            emissive="#020818"
            emissiveIntensity={0.35}
          />
        </mesh>

        {/* Global Tech Flight Arcs */}
        <GlobalFlightArcs />

        {/* All Worldwide Cities, Countries & Ocean Nodes */}
        {LOCATIONS.map((loc) => (
          <PinMarker
            key={loc.id}
            location={loc}
            onSelect={onSelectLocation}
            isSelected={selectedLocation?.id === loc.id}
          />
        ))}
      </group>

      {/* Atmospheric Glowing Blue Halo */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.14, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// =========================================================================
// 🚀 MAIN INTERACTIVE 3D EARTH GLOBE COMPONENT
// =========================================================================
export default function InteractiveGlobe() {
  const [selectedLocation, setSelectedLocation] = useState<LocationPin | null>(
    LOCATIONS[0] // Default: New Delhi (Base Station)
  );

  const handleSelectLocation = (loc: LocationPin) => {
    soundFx.playClick();
    setSelectedLocation(loc);
  };

  return (
    <div className="relative flex h-[380px] w-full max-w-[480px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#050a18]/85 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(34,225,255,0.15)] backdrop-blur-xl sm:h-[440px]">
      {/* 3D Canvas with Zoom Enabled */}
      <div className="h-full w-full cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0.3, 4.5], fov: 46 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 3, 5]} intensity={2.2} color="#ffffff" />
          <pointLight position={[-4, -2, -3]} intensity={1.2} color="#38bdf8" />

          <Suspense fallback={null}>
            <RealisticGlobeSphere
              onSelectLocation={handleSelectLocation}
              selectedLocation={selectedLocation}
            />
          </Suspense>

          {/* OrbitControls with Zoom In/Out to view countries and cities */}
          <OrbitControls
            enableZoom={true}
            minDistance={2.4}
            maxDistance={6.2}
            enablePan={false}
            autoRotate={false}
            rotateSpeed={0.65}
            zoomSpeed={0.8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(Math.PI * 3) / 4}
          />
        </Canvas>
      </div>

      {/* Selected Location / Ocean Bottom Popover */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
            className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/15 bg-[#030612]/95 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.95)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="rounded-lg p-1.5"
                  style={{
                    backgroundColor: `${selectedLocation.badgeColor}25`,
                    color: selectedLocation.badgeColor,
                  }}
                >
                  {selectedLocation.type === "ocean" || selectedLocation.type === "sea" ? (
                    <Waves size={15} />
                  ) : (
                    <MapPin size={15} />
                  )}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-white leading-none">
                    {selectedLocation.name}
                    <span className="ml-1 text-xs text-slate-400 font-normal">
                      ({selectedLocation.country})
                    </span>
                  </p>
                  <p className="mt-1 font-mono text-[10.5px] text-slate-300">
                    {selectedLocation.role}
                  </p>
                </div>
              </div>

              <span
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] font-bold"
                style={{ color: selectedLocation.badgeColor }}
              >
                {selectedLocation.status}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

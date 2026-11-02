export interface PartAnnotation {
  name: string;
  category: string;
  position: [number, number, number];
  spec: string;
}

export interface VehicleSpec {
  id: string;
  name: string;
  brand: string;
  category: 'cars' | 'aviation';
  subCategory: string;
  year: number;
  type: 'hypercar' | 'supercar' | 'f1' | 'luxury' | 'airliner' | 'fighter' | 'stealth';
  color: string;
  palette: string[];
  modelUrl: string;
  proportions: {
    scale: [number, number, number];
    rotation?: [number, number, number];
    positionOffset?: [number, number, number];
  };
  specs: {
    power: string;
    topSpeed: string;
    accelerationOrRange: string;
    weightOrCeiling: string;
    engineOrTurbine: string;
    aeroOrWingspan: string;
  };
  annotations: PartAnnotation[];
  description: string;
}

const CAR_GLB = '/ferrari.glb';
const TOY_CAR_GLB = '/toycar.glb';
const AIR_GLB = '/cesium_air.glb';

export const CATALOG: VehicleSpec[] = [
  // --- CARS: HYPERCARS ---
  {
    id: 'bugatti-tourbillon',
    name: 'Tourbillon',
    brand: 'Bugatti',
    category: 'cars',
    subCategory: 'Hypercars',
    year: 2026,
    type: 'hypercar',
    color: '#0d2b59',
    palette: ['#0d2b59', '#111827', '#b38f4d', '#c0c0c0'],
    modelUrl: CAR_GLB,
    proportions: {
      scale: [1.02, 0.94, 1.06],
      positionOffset: [0, -0.48, 0],
    },
    specs: {
      power: '1,800 HP Hybrid',
      topSpeed: '445 km/h (276 mph)',
      accelerationOrRange: '0-100 in 2.0s',
      weightOrCeiling: '1,995 kg Carbon Tub',
      engineOrTurbine: '8.3L Naturally Aspirated V16 (Cosworth) + 3 e-Motors',
      aeroOrWingspan: 'Active Rear Airbrake & Venturi Underfloor Diffusers',
    },
    annotations: [
      { name: 'Cosworth V16 Hybrid', category: 'Powertrain', position: [0, 0.4, 0.6], spec: '8.3L N/A 9,000 RPM + triple e-drive' },
      { name: 'Horseshoe Intake', category: 'Aero', position: [0, 0.2, -2.1], spec: 'Direct ram-air cooling radiator tunnels' },
      { name: 'Active Airbrake Wing', category: 'Aero', position: [0, 0.7, 1.8], spec: 'Variable angle of attack inverted foil' },
      { name: 'Carbon Monocoque', category: 'Chassis', position: [0, -0.1, 0], spec: 'T1000 aeronautical carbon composite' },
    ],
    description: 'An analog horology-inspired 1,800-horsepower hybrid hypercar engineered around an 8.3-liter Cosworth V16.',
  },
  {
    id: 'koenigsegg-jesko',
    name: 'Jesko Absolut',
    brand: 'Koenigsegg',
    category: 'cars',
    subCategory: 'Hypercars',
    year: 2025,
    type: 'hypercar',
    color: '#d4d8dd',
    palette: ['#d4d8dd', '#ff6200', '#111111', '#2f4f4f'],
    modelUrl: CAR_GLB,
    proportions: {
      scale: [0.98, 0.9, 1.12],
      positionOffset: [0, -0.48, 0],
    },
    specs: {
      power: '1,600 HP (E85 Fuel)',
      topSpeed: '531 km/h (330 mph theoretical)',
      accelerationOrRange: '0-100 in 2.5s',
      weightOrCeiling: '1,390 kg Curb Weight',
      engineOrTurbine: '5.0L Twin-Turbo Flat-Plane V8 (LST 9-Speed)',
      aeroOrWingspan: 'Ultra-low Cd 0.278 Drag Profile with Twin Rear Fins',
    },
    annotations: [
      { name: 'Twin-Turbo V8', category: 'Engine', position: [0, 0.45, 0.5], spec: '180-degree flat-plane crankshaft' },
      { name: 'Light Speed Transmission', category: 'Drivetrain', position: [0, 0.1, 0.9], spec: '9-speed multi-clutch simultaneous shifts' },
      { name: 'Twin Strakes / Tail', category: 'Aero', position: [0, 0.65, 1.9], spec: 'High-speed yaw stability fins' },
      { name: 'AirCore Wheels', category: 'Wheels', position: [0.95, -0.2, 1.3], spec: 'Hollow one-piece carbon fiber rims' },
    ],
    description: 'The fastest Koenigsegg conceived, stripped of high-downforce wings for slippery top-speed aerodynamic efficiency.',
  },
  {
    id: 'pagani-huayra',
    name: 'Huayra Roadster BC',
    brand: 'Pagani',
    category: 'cars',
    subCategory: 'Hypercars',
    year: 2024,
    type: 'hypercar',
    color: '#5e1914',
    palette: ['#5e1914', '#1f2937', '#e5e7eb', '#ca8a04'],
    modelUrl: CAR_GLB,
    proportions: {
      scale: [1.0, 0.92, 1.04],
      positionOffset: [0, -0.48, 0],
    },
    specs: {
      power: '802 HP / 1,050 Nm',
      topSpeed: '380 km/h (236 mph)',
      accelerationOrRange: '0-100 in 2.8s',
      weightOrCeiling: '1,250 kg (Carbo-Triax HP62)',
      engineOrTurbine: '6.0L Mercedes-AMG Twin-Turbo 60° V12',
      aeroOrWingspan: 'Quad Active Aerodynamic Flaps & Full Carbon Wing',
    },
    annotations: [
      { name: 'AMG Twin-Turbo V12', category: 'Engine', position: [0, 0.45, 0.5], spec: 'Hand-assembled bespoke AMG M158 unit' },
      { name: 'Active Front Flaps', category: 'Aero', position: [0.6, 0.1, -1.9], spec: 'Independent micro-second roll trim' },
      { name: 'Titanium Exhaust Organ', category: 'Exhaust', position: [0, 0.5, 1.7], spec: 'Hydroformed 4-pipe ceramic coated titanium' },
    ],
    description: 'A bespoke rolling sculpture blending aeronautical carbon-titanium composite architecture with twin-turbo V12 fury.',
  },

  // --- CARS: SUPERCARS ---
  {
    id: 'ferrari-sf90',
    name: 'SF90 XX Stradale',
    brand: 'Ferrari',
    category: 'cars',
    subCategory: 'Supercars',
    year: 2025,
    type: 'supercar',
    color: '#d90429',
    palette: ['#d90429', '#f8fafc', '#0f172a', '#eab308'],
    modelUrl: CAR_GLB,
    proportions: {
      scale: [1.0, 0.96, 1.0],
      positionOffset: [0, -0.48, 0],
    },
    specs: {
      power: '1,030 cv (PHEV)',
      topSpeed: '320 km/h (199 mph)',
      accelerationOrRange: '0-100 in 2.3s',
      weightOrCeiling: '1,560 kg dry',
      engineOrTurbine: '3.99L Twin-Turbo 90° V8 + 3 Electric Motors',
      aeroOrWingspan: 'Fixed Dual-Profile Rear Wing (530kg downforce @ 250km/h)',
    },
    annotations: [
      { name: 'RAC-e Dual Front Motors', category: 'EV System', position: [0, -0.1, -1.5], spec: 'Torque vectoring electronic differential' },
      { name: 'Fixed XX Carbon Wing', category: 'Aero', position: [0, 0.8, 1.7], spec: 'Shut-off Gurney active rear profile' },
      { name: 'Twin-Turbo V8 Block', category: 'Engine', position: [0, 0.4, 0.4], spec: 'F154FB 90° flat-crank turbocharged V8' },
    ],
    description: 'The most extreme street-legal iteration of Maranello’s flagship hybrid platform with fixed race wing aero.',
  },
  {
    id: 'porsche-911-gt3rs',
    name: '911 GT3 RS (992)',
    brand: 'Porsche',
    category: 'cars',
    subCategory: 'Supercars',
    year: 2024,
    type: 'supercar',
    color: '#00703c',
    palette: ['#00703c', '#e11d48', '#f8fafc', '#18181b'],
    modelUrl: CAR_GLB,
    proportions: {
      scale: [0.95, 0.98, 0.96],
      positionOffset: [0, -0.48, 0],
    },
    specs: {
      power: '525 PS (518 HP)',
      topSpeed: '296 km/h (184 mph)',
      accelerationOrRange: '0-100 in 3.2s',
      weightOrCeiling: '1,450 kg DIN',
      engineOrTurbine: '4.0L High-Revving Boxer-6 (9,000 RPM N/A)',
      aeroOrWingspan: 'Formula 1-style Active DRS Swan-Neck Rear Wing',
    },
    annotations: [
      { name: 'DRS Swan-Neck Wing', category: 'Aero', position: [0, 0.9, 1.6], spec: 'Hydraulic F1-style Drag Reduction System' },
      { name: 'Central Nose Radiator', category: 'Cooling', position: [0, 0.2, -1.8], spec: 'Single race radiator replacing frunk storage' },
      { name: '4.0L Flat-Six Engine', category: 'Engine', position: [0, 0.3, 1.2], spec: 'Rigid valve drive with individual throttle bodies' },
    ],
    description: 'A street-legal homologation weapon with active DRS, central radiator architecture, and massive swan-neck rear wing.',
  },
  {
    id: 'lamborghini-revuelto',
    name: 'Revuelto',
    brand: 'Lamborghini',
    category: 'cars',
    subCategory: 'Supercars',
    year: 2025,
    type: 'supercar',
    color: '#ff7700',
    palette: ['#ff7700', '#10b981', '#09090b', '#3b82f6'],
    modelUrl: CAR_GLB,
    proportions: {
      scale: [1.04, 0.92, 1.05],
      positionOffset: [0, -0.48, 0],
    },
    specs: {
      power: '1,015 CV Total Output',
      topSpeed: '> 350 km/h (217 mph)',
      accelerationOrRange: '0-100 in 2.5s',
      weightOrCeiling: '1,772 kg',
      engineOrTurbine: '6.5L Mid-Mounted Naturally Aspirated V12 + 3 Motors',
      aeroOrWingspan: 'Active Y-Shaped Aero & Carbon Monofuselage',
    },
    annotations: [
      { name: 'L545 6.5L V12', category: 'Engine', position: [0, 0.45, 0.5], spec: 'Rotated 180° layout, 9,500 RPM rev limit' },
      { name: '3.8 kWh Battery Tunnel', category: 'Battery', position: [0, -0.05, 0], spec: 'Pouch lithium-ion cells in transmission tunnel' },
      { name: 'Y-Shape Matrix Aero', category: 'Aero', position: [0.65, 0.2, -1.9], spec: 'Integrated front diffuser and air curtains' },
    ],
    description: 'The premier HPEV from Sant’Agata Bolognese, pairing iconic naturally-aspirated V12 acoustics with triple e-motors.',
  },

  // --- CARS: F1 & TRACK ---
  {
    id: 'redbull-rb20',
    name: 'RB20 Formula 1',
    brand: 'Red Bull Racing',
    category: 'cars',
    subCategory: 'F1 & Track',
    year: 2024,
    type: 'f1',
    color: '#06132b',
    palette: ['#06132b', '#ea0029', '#fec300', '#f8fafc'],
    modelUrl: CAR_GLB,
    proportions: {
      scale: [0.88, 0.78, 1.3],
      positionOffset: [0, -0.48, 0],
    },
    specs: {
      power: '1,000+ HP Hybrid Power Unit',
      topSpeed: '360 km/h (224 mph)',
      accelerationOrRange: '0-100 in ~1.7s',
      weightOrCeiling: '798 kg (FIA Minimum Weight)',
      engineOrTurbine: 'Honda RBPTH002 1.6L 90° V6 Turbo + MGU-K (120 kW)',
      aeroOrWingspan: 'Radical Inverted Sidepod Gulleys & Venturi Floor Tunnels',
    },
    annotations: [
      { name: 'Inverted Sidepod Gulley', category: 'Aero', position: [0.55, 0.15, -0.2], spec: 'Vertical inlet feeding cooling cannons' },
      { name: 'Halo Safety Structure', category: 'Chassis', position: [0, 0.45, 0.1], spec: 'Grade 5 titanium 125 kN load capacity' },
      { name: 'Ground-Effect Venturis', category: 'Floor Aero', position: [0, -0.15, 0.3], spec: 'Generates 60%+ of total car downforce' },
    ],
    description: 'Adrian Newey’s crowning ground-effect aerodynamic masterclass featuring vertical inlet cooling cannons and razor-sharp floor edges.',
  },

  // --- CARS: LUXURY & CONCEPT ---
  {
    id: 'rollsroyce-spectre',
    name: 'Spectre Super-Coupe',
    brand: 'Rolls-Royce',
    category: 'cars',
    subCategory: 'Luxury & EV',
    year: 2025,
    type: 'luxury',
    color: '#31102b',
    palette: ['#31102b', '#d1d5db', '#1e293b', '#b45309'],
    modelUrl: TOY_CAR_GLB,
    proportions: {
      scale: [0.038, 0.038, 0.038],
      positionOffset: [0, -0.48, 0],
    },
    specs: {
      power: '584 HP / 900 Nm Instant Torque',
      topSpeed: '250 km/h (155 mph limited)',
      accelerationOrRange: '530 km (329 miles) WLTP',
      weightOrCeiling: '2,975 kg Curb Weight',
      engineOrTurbine: 'Dual Separately Excited Synchronous Motors (102 kWh)',
      aeroOrWingspan: 'Cd 0.25 Aero Spirit of Ecstasy Illuminated Pantheon Grille',
    },
    annotations: [
      { name: 'Pantheon Aero Grille', category: 'Design', position: [0, 0.3, -1.9], spec: 'Illuminated 22-vane low-drag grille' },
      { name: 'Planar Suspension', category: 'Suspension', position: [0.8, -0.1, 0.2], spec: 'Decoupling anti-roll bars for magic carpet ride' },
      { name: '102 kWh Floor Battery', category: 'EV System', position: [0, -0.2, 0], spec: 'Ribbed acoustic deadening battery housing' },
    ],
    description: 'The ultra-luxury electric super-coupe with whisper-silent planar suspension and coach doors.',
  },
  {
    id: 'rimac-nevera',
    name: 'Nevera Time Attack',
    brand: 'Rimac',
    category: 'cars',
    subCategory: 'Luxury & EV',
    year: 2024,
    type: 'hypercar',
    color: '#0891b2',
    palette: ['#0891b2', '#18181b', '#22c55e', '#f8fafc'],
    modelUrl: CAR_GLB,
    proportions: {
      scale: [1.02, 0.94, 1.05],
      positionOffset: [0, -0.48, 0],
    },
    specs: {
      power: '1,914 HP / 2,360 Nm',
      topSpeed: '412 km/h (256 mph)',
      accelerationOrRange: '0-100 in 1.81s (0-400 in 21.3s)',
      weightOrCeiling: '2,300 kg Carbon Monocoque',
      engineOrTurbine: '4 Bespoke Surface-Mounted Permanent-Magnet Motors',
      aeroOrWingspan: 'All-Wheel Torque Vectoring 2 & Quad Active Aerodynamic Flaps',
    },
    annotations: [
      { name: 'Quad Inverter e-Motors', category: 'Powertrain', position: [0, 0.1, 0], spec: 'Independent 100-Hz wheel torque recalculation' },
      { name: 'Active Rear Wing & Diffuser', category: 'Aero', position: [0, 0.7, 1.7], spec: 'Low-drag track mode to maximum downforce' },
      { name: '120 kWh H-Cell Battery', category: 'Battery', position: [0, -0.05, 0.2], spec: '6,960 cylindrical cells in carbon battery pack' },
    ],
    description: 'Croatian hyper-EV record breaker engineered from a carbon-fiber monocoque housing a 120 kWh liquid-cooled battery.',
  },

  // --- AVIATION: COMMERCIAL JETS ---
  {
    id: 'boeing-787',
    name: '787-9 Dreamliner',
    brand: 'Boeing',
    category: 'aviation',
    subCategory: 'Commercial Jets',
    year: 2025,
    type: 'airliner',
    color: '#0284c7',
    palette: ['#0284c7', '#f8fafc', '#1e293b', '#0369a1'],
    modelUrl: AIR_GLB,
    proportions: {
      scale: [0.08, 0.08, 0.08],
      positionOffset: [0, -0.1, 0],
    },
    specs: {
      power: '2x 71,000 lbf High-Bypass Thrust',
      topSpeed: 'Mach 0.85 (903 km/h)',
      accelerationOrRange: '14,010 km (7,565 nmi)',
      weightOrCeiling: 'FL430 (43,000 ft) / MTOW 254,000 kg',
      engineOrTurbine: '2x GEnx-1B / Rolls-Royce Trent 1000 Turbofans',
      aeroOrWingspan: '60.1 m Supercritical Raked Wingtips (50% Composites)',
    },
    annotations: [
      { name: 'Supercritical Swept Wings', category: 'Aerodynamics', position: [-2.2, 0.1, 0], spec: 'Carbon laminate wing with raked wingtips' },
      { name: 'GEnx-1B Engine Pods', category: 'Propulsion', position: [-1.2, -0.4, 0.3], spec: 'Chevron serrated nacelles for 60% noise cut' },
      { name: 'Composite Fuselage Barrel', category: 'Structure', position: [0, 0.2, -0.5], spec: 'One-piece carbon fiber wound barrel sections' },
      { name: 'Cockpit Avionics HUD', category: 'Avionics', position: [0, 0.3, -2.1], spec: 'Rockwell Collins dual head-up flight displays' },
    ],
    description: 'Revolutionary long-range wide-body airliner constructed of 50% composite materials with swept wingtips and quiet chevrons.',
  },
  {
    id: 'airbus-a350',
    name: 'A350-1000 XWB',
    brand: 'Airbus',
    category: 'aviation',
    subCategory: 'Commercial Jets',
    year: 2025,
    type: 'airliner',
    color: '#1d4ed8',
    palette: ['#1d4ed8', '#f8fafc', '#0f172a', '#38bdf8'],
    modelUrl: AIR_GLB,
    proportions: {
      scale: [0.086, 0.086, 0.086],
      positionOffset: [0, -0.1, 0],
    },
    specs: {
      power: '2x 97,000 lbf Turbofan Thrust',
      topSpeed: 'Mach 0.89 (945 km/h)',
      accelerationOrRange: '16,100 km (8,700 nmi)',
      weightOrCeiling: 'FL431 (43,100 ft) / MTOW 319,000 kg',
      engineOrTurbine: '2x Rolls-Royce Trent XWB-97 Turbofans',
      aeroOrWingspan: '64.75 m Morphing Sharklet Composite Wings',
    },
    annotations: [
      { name: 'Adaptive Morphing Wings', category: 'Aero', position: [-2.4, 0.1, 0], spec: 'Variable camber and differential flap deployment' },
      { name: 'Trent XWB-97 Turbofans', category: 'Propulsion', position: [-1.3, -0.4, 0.3], spec: 'World’s most efficient large aero-engine' },
      { name: 'Sharklet Wingtips', category: 'Aero', position: [-3.2, 0.5, 0.8], spec: 'Gracefully curved carbon aerodynamic sharklets' },
    ],
    description: 'Extra Wide Body flagship engineered with intelligent adaptive wings that continuously optimize load distribution in flight.',
  },
  {
    id: 'concorde-supersonic',
    name: 'Concorde SST',
    brand: 'Aérospatiale / BAC',
    category: 'aviation',
    subCategory: 'Commercial Jets',
    year: 2003,
    type: 'airliner',
    color: '#f8fafc',
    palette: ['#f8fafc', '#0369a1', '#dc2626', '#1e293b'],
    modelUrl: AIR_GLB,
    proportions: {
      scale: [0.065, 0.065, 0.095],
      positionOffset: [0, -0.1, 0],
    },
    specs: {
      power: '4x 38,050 lbf with Reheat Afterburners',
      topSpeed: 'Mach 2.04 (2,179 km/h Supercruise)',
      accelerationOrRange: '7,222 km (3,900 nmi)',
      weightOrCeiling: 'FL600 (60,000 ft Edge of Space)',
      engineOrTurbine: '4x Rolls-Royce/Snecma Olympus 593 Mk 610',
      aeroOrWingspan: '25.6 m Ogival Gothic Delta Wing & Droop Nose',
    },
    annotations: [
      { name: 'Ogival Gothic Delta Wing', category: 'Aero', position: [-1.6, 0.1, 0.4], spec: 'Vortex lift generation for supersonic cruise' },
      { name: 'Olympus 593 Turbojets', category: 'Propulsion', position: [-0.7, -0.3, 1.1], spec: 'Variable ramp air intakes with afterburning' },
      { name: 'Articulated Droop Nose', category: 'Cockpit', position: [0, 0.1, -2.4], spec: 'Drops 12.5° for runway visibility upon landing' },
    ],
    description: 'The supersonic airliner capable of supercruising at twice the speed of sound along the curve of the Earth.',
  },

  // --- AVIATION: FIGHTERS & STEALTH ---
  {
    id: 'lockheed-f22',
    name: 'F-22 Raptor',
    brand: 'Lockheed Martin',
    category: 'aviation',
    subCategory: 'Fighters & Stealth',
    year: 2024,
    type: 'fighter',
    color: '#475569',
    palette: ['#475569', '#1e293b', '#94a3b8', '#0f172a'],
    modelUrl: AIR_GLB,
    proportions: {
      scale: [0.075, 0.068, 0.078],
      positionOffset: [0, -0.1, 0],
    },
    specs: {
      power: '2x 35,000 lbf 2D Thrust-Vectoring Engines',
      topSpeed: 'Mach 2.25 (Supercruise Mach 1.82)',
      accelerationOrRange: '2,960 km (1,600 nmi Combat Radius)',
      weightOrCeiling: 'FL650 (> 65,000 ft Ceiling)',
      engineOrTurbine: '2x Pratt & Whitney F119-PW-100 Afterburning',
      aeroOrWingspan: '13.56 m Clipped Diamond Delta Stealth Wing',
    },
    annotations: [
      { name: '2D Thrust-Vectoring Nozzles', category: 'Propulsion', position: [0, 0.1, 1.8], spec: 'Pitch vectoring ±20° at 60 deg/sec' },
      { name: 'Clipped Diamond Delta Wings', category: 'Aero', position: [-1.7, 0.1, 0], spec: 'Planform edge alignment for stealth cross-section' },
      { name: 'Internal Weapons Bay', category: 'Stealth', position: [0, -0.3, -0.2], spec: 'Concealed AIM-120D and AIM-9X air-to-air missiles' },
    ],
    description: '5th-generation air-dominance stealth fighter pairing supercruise, radar invisibility, and thrust vectoring agility.',
  },
  {
    id: 'northrop-b2',
    name: 'B-2 Spirit Stealth',
    brand: 'Northrop Grumman',
    category: 'aviation',
    subCategory: 'Fighters & Stealth',
    year: 2025,
    type: 'stealth',
    color: '#18181b',
    palette: ['#18181b', '#27272a', '#52525b', '#09090b'],
    modelUrl: AIR_GLB,
    proportions: {
      scale: [0.12, 0.045, 0.06],
      positionOffset: [0, -0.1, 0],
    },
    specs: {
      power: '4x 17,300 lbf Non-Afterburning Turbofans',
      topSpeed: 'High Subsonic Mach 0.95',
      accelerationOrRange: '11,100 km (6,000 nmi unrefueled)',
      weightOrCeiling: 'FL500 (50,000 ft Ceiling)',
      engineOrTurbine: '4x General Electric F118-GE-100 Turbofans',
      aeroOrWingspan: '52.4 m Continuous Flying Wing Planform (Zero Vertical Fins)',
    },
    annotations: [
      { name: 'Continuous Flying Wing', category: 'Stealth', position: [-2.8, 0, 0], spec: 'Zero vertical tail surfaces to deflect radar pulses' },
      { name: 'S-Duct Buried Inlets', category: 'Propulsion', position: [-0.6, 0.1, -0.5], spec: 'Shields hot turbine blades from enemy radar line-of-sight' },
      { name: 'Split Drag Rudders', category: 'Flight Control', position: [-3.4, 0, 1.1], spec: 'Differential clamshell airbrakes for yaw control' },
    ],
    description: 'Iconic all-wing stealth strategic aircraft engineered without vertical tail fins using radar-absorbent faceted composites.',
  },
  {
    id: 'sr71-blackbird',
    name: 'SR-71 Blackbird',
    brand: 'Lockheed Skunk Works',
    category: 'aviation',
    subCategory: 'Fighters & Stealth',
    year: 1998,
    type: 'stealth',
    color: '#09090b',
    palette: ['#09090b', '#dc2626', '#3f3f46', '#e4e4e7'],
    modelUrl: AIR_GLB,
    proportions: {
      scale: [0.06, 0.055, 0.11],
      positionOffset: [0, -0.1, 0],
    },
    specs: {
      power: '2x 32,500 lbf Continuous Afterburner',
      topSpeed: 'Mach 3.32 (3,540+ km/h / 2,193 mph)',
      accelerationOrRange: '5,400 km (2,900 nmi unrefueled)',
      weightOrCeiling: 'FL850 (85,000 ft Astronaut Horizon)',
      engineOrTurbine: '2x Pratt & Whitney J58 Continuous-Bleed Turbojets',
      aeroOrWingspan: '16.94 m Double-Delta with Corrugated Titanium Skin',
    },
    annotations: [
      { name: 'Pratt & Whitney J58 Nacelles', category: 'Propulsion', position: [-1.4, 0, 0.4], spec: 'Movable spike inlet transforming into ramjet at Mach 3+' },
      { name: 'Chine Lifting Body', category: 'Aerodynamics', position: [-0.7, 0, -1.2], spec: 'Blends fuselage into leading edge creating aerodynamic lift' },
      { name: 'Titanium Thermal Skin', category: 'Materials', position: [0, 0.15, -0.2], spec: 'Withstands 300°C friction expansion at supersonic speeds' },
    ],
    description: 'The fastest air-breathing manned aircraft ever built, crafted from titanium to cruise at Mach 3+ at the frontier of space.',
  },
];

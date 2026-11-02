'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Car,
  Plane,
  Gauge,
  Zap,
  Wind,
  Shield,
  Layers,
  ChevronDown,
  Sparkles,
  DoorOpen,
  Wrench,
  Sun,
  Moon,
  AlertTriangle,
  Flame,
  ArrowUp,
  ChevronRight,
  ChevronLeft,
  Compass,
  Package,
} from 'lucide-react';
import { CATALOG, VehicleSpec } from '@/components/catalog';
import { BrandEmblem } from '@/components/BrandEmblems';
import { StudioSettings } from '@/components/AeroAutoScene';

const AeroAutoScene = dynamic(() => import('@/components/AeroAutoScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-900">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 border-2 border-slate-700 border-t-amber-400 rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 mono text-xs tracking-widest uppercase font-semibold">
          Loading 3D Car & Showroom Environment
        </p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<'cars' | 'aviation'>('cars');
  const [activeVehicleId, setActiveVehicleId] = useState<string>('bugatti-tourbillon');
  const [activeColor, setActiveColor] = useState<string>('#0d2b59');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);

  // Dark or Light Mode Toggle
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Real Working Mechanical Controls
  const [doorsOpen, setDoorsOpen] = useState<boolean>(false);
  const [hoodOpen, setHoodOpen] = useState<boolean>(false);
  const [bootOpen, setBootOpen] = useState<boolean>(false);
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);
  const [hazardBlinkers, setHazardBlinkers] = useState<boolean>(false);
  const [dynoActive, setDynoActive] = useState<boolean>(false);
  const [suspensionLift, setSuspensionLift] = useState<boolean>(false);
  const [steeringAngle, setSteeringAngle] = useState<number>(0);

  const [studio, setStudio] = useState<StudioSettings>({
    exposure: 1.15,
    keyLight: 3.5,
    envIntensity: 1.2,
    paintGloss: 0.9,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const fpsRef = useRef({ frames: 0, last: performance.now() });

  const categoryVehicles = useMemo(
    () => CATALOG.filter((v) => v.category === selectedCategory),
    [selectedCategory]
  );

  const activeVehicle: VehicleSpec = useMemo(
    () => CATALOG.find((v) => v.id === activeVehicleId) || categoryVehicles[0],
    [activeVehicleId, categoryVehicles]
  );

  const handleSelectCategory = (cat: 'cars' | 'aviation') => {
    setSelectedCategory(cat);
    const first = CATALOG.find((v) => v.category === cat);
    if (first) {
      setActiveVehicleId(first.id);
      setActiveColor(first.color);
    }
    setDoorsOpen(false);
    setHoodOpen(false);
    setBootOpen(false);
  };

  const handleSelectVehicle = (v: VehicleSpec) => {
    setActiveVehicleId(v.id);
    setActiveColor(v.color);
    setDoorsOpen(false);
    setHoodOpen(false);
    setBootOpen(false);
  };

  useEffect(() => {
    let animId: number;
    const tick = () => {
      fpsRef.current.frames++;
      const now = performance.now();
      const delta = now - fpsRef.current.last;
      if (delta >= 500) {
        setFps(Math.round((fpsRef.current.frames / delta) * 1000));
        fpsRef.current.frames = 0;
        fpsRef.current.last = now;
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: scrollRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#060606] text-slate-100 selection:bg-amber-400 selection:text-black'
          : 'bg-[#f8fafc] text-slate-800 selection:bg-amber-400 selection:text-black'
      }`}
    >
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md px-4 md:px-8 h-16 flex items-center justify-between transition-colors duration-300 ${
          isDarkMode
            ? 'glass border-b border-white/10'
            : 'bg-white/80 border-b border-slate-200/80 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-amber-500/20">
            AV
          </div>
          <div>
            <span
              className={`font-bold tracking-widest text-sm uppercase flex items-center gap-1.5 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              AERO-AUTO VAULT
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                  isDarkMode
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                SHOWROOM 3D
              </span>
            </span>
            <p className="text-[10px] text-slate-500 mono tracking-wider hidden sm:block">
              Interactive Doors · Hood · Boot · Wheels · Dark/Light Mode
            </p>
          </div>
        </div>

        {/* CATEGORY SWITCHER */}
        <div
          className={`flex items-center p-1 rounded-full border transition-colors ${
            isDarkMode ? 'bg-black/60 border-white/10' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            onClick={() => handleSelectCategory('cars')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'cars'
                ? isDarkMode
                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-500/10 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Car size={14} className={isDarkMode ? 'text-amber-400' : 'text-amber-500'} />
            <span>Supercars & Hypercars</span>
          </button>
          <button
            onClick={() => handleSelectCategory('aviation')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'aviation'
                ? isDarkMode
                  ? 'bg-gradient-to-r from-sky-500/20 to-sky-500/10 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plane size={14} className="text-sky-500" />
            <span>Aviation & Jets</span>
          </button>
        </div>

        {/* DARK / LIGHT THEME TOGGLE & FPS */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsDarkMode((d) => !d)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs mono font-semibold border transition-all ${
              isDarkMode
                ? 'bg-white/10 text-amber-300 border-white/10 hover:bg-white/20'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 shadow-sm'
            }`}
            title="Toggle Dark / Light Theme"
          >
            {isDarkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-slate-700" />}
            <span className="hidden sm:inline">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <div
            className={`px-3 py-1.5 rounded-lg text-xs mono flex items-center gap-1.5 font-semibold ${
              isDarkMode
                ? 'glass text-emerald-400 border border-emerald-500/20'
                : 'bg-white/90 text-emerald-600 border border-slate-200 shadow-sm'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {fps} FPS
          </div>
        </div>
      </header>

      {/* STICKY 3D SCENE CANVAS */}
      <div ref={scrollRef} className="relative h-[480vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <AeroAutoScene
              vehicle={activeVehicle}
              currentColor={activeColor}
              scrollProgress={scrollProgress}
              doorsOpen={doorsOpen}
              hoodOpen={hoodOpen}
              bootOpen={bootOpen}
              headlightsOn={headlightsOn}
              hazardBlinkers={hazardBlinkers}
              dynoActive={dynoActive}
              suspensionLift={suspensionLift}
              steeringAngle={steeringAngle}
              isDarkMode={isDarkMode}
              studio={studio}
              onToggleDoors={() => setDoorsOpen((v) => !v)}
              onToggleHood={() => setHoodOpen((v) => !v)}
              onToggleBoot={() => setBootOpen((v) => !v)}
            />
          </div>

          {/* ACTIVE MODEL BADGE (TOP LEFT) */}
          <div
            className={`absolute top-20 left-4 md:left-8 z-10 p-4 rounded-2xl max-w-xs shadow-lg pointer-events-none transition-colors ${
              isDarkMode
                ? 'glass border border-white/10'
                : 'bg-white/85 backdrop-blur-md border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs mono uppercase mb-1 font-semibold">
              <BrandEmblem brand={activeVehicle.brand} className="w-4 h-4 text-amber-500" />
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>{activeVehicle.brand}</span>
              <span>•</span>
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>{activeVehicle.year}</span>
            </div>
            <h1 className={`text-xl md:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeVehicle.name}
            </h1>
            <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {activeVehicle.description}
            </p>
          </div>

          {/* PAINT PALETTE (TOP RIGHT) */}
          <div
            className={`absolute top-20 right-4 md:right-8 z-10 p-3.5 rounded-2xl flex flex-col gap-2 min-w-[140px] shadow-lg transition-colors ${
              isDarkMode
                ? 'glass border border-white/10'
                : 'bg-white/85 backdrop-blur-md border border-slate-200'
            }`}
          >
            <span className={`text-[10px] mono uppercase tracking-widest block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              OEM Paint
            </span>
            <div className="flex items-center gap-1.5">
              {activeVehicle.palette.map((hex) => (
                <button
                  key={hex}
                  onClick={() => setActiveColor(hex)}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    activeColor === hex
                      ? 'scale-125 border-slate-900 shadow-md ring-2 ring-amber-400'
                      : 'border-slate-300 hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
            </div>
          </div>

          {/* MECHANICAL INTERACTIVE CONTROLS (TOP CENTER) */}
          {selectedCategory === 'cars' && (
            <div
              className={`absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl max-w-2xl shadow-xl transition-colors ${
                isDarkMode
                  ? 'bg-black/75 backdrop-blur-md border border-white/10'
                  : 'bg-white/90 backdrop-blur-md border border-slate-200'
              }`}
            >
              <button
                onClick={() => setDoorsOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs mono font-semibold transition-all ${
                  doorsOpen
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                    : isDarkMode
                    ? 'bg-white/5 text-slate-400 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <DoorOpen size={13} />
                <span>{doorsOpen ? 'Close Doors' : 'Open Doors'}</span>
              </button>

              <button
                onClick={() => setHoodOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs mono font-semibold transition-all ${
                  hoodOpen
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                    : isDarkMode
                    ? 'bg-white/5 text-slate-400 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Wrench size={13} />
                <span>{hoodOpen ? 'Close Hood' : 'Open Engine Hood'}</span>
              </button>

              <button
                onClick={() => setBootOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs mono font-semibold transition-all ${
                  bootOpen
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                    : isDarkMode
                    ? 'bg-white/5 text-slate-400 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Package size={13} />
                <span>{bootOpen ? 'Close Boot' : 'Open Boot Space'}</span>
              </button>

              <button
                onClick={() => setHeadlightsOn((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs mono font-semibold transition-all ${
                  headlightsOn
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                    : isDarkMode
                    ? 'bg-white/5 text-slate-400 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Sun size={13} />
                <span>{headlightsOn ? 'Beams ON' : 'Beams OFF'}</span>
              </button>

              <button
                onClick={() => setHazardBlinkers((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs mono font-semibold transition-all ${
                  hazardBlinkers
                    ? 'bg-amber-500/30 text-amber-400 border border-amber-500/50'
                    : isDarkMode
                    ? 'bg-white/5 text-slate-400 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <AlertTriangle size={13} />
                <span>Hazards</span>
              </button>

              <button
                onClick={() => setDynoActive((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs mono font-semibold transition-all ${
                  dynoActive
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm animate-pulse'
                    : isDarkMode
                    ? 'bg-white/5 text-slate-400 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Flame size={13} />
                <span>Spin Wheels</span>
              </button>

              <button
                onClick={() => setSuspensionLift((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs mono font-semibold transition-all ${
                  suspensionLift
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40'
                    : isDarkMode
                    ? 'bg-white/5 text-slate-400 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <ArrowUp size={13} />
                <span>{suspensionLift ? 'Ride: HIGH' : 'Ride: TRACK'}</span>
              </button>

              {/* Front Wheel Steering */}
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-xl border ${
                  isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  onClick={() => setSteeringAngle((a) => Math.max(-25, a - 12))}
                  className="p-0.5 text-slate-400 hover:text-white"
                  title="Steer Left"
                >
                  <ChevronLeft size={13} />
                </button>
                <span className={`mono text-[10px] min-w-[28px] text-center font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {steeringAngle}°
                </span>
                <button
                  onClick={() => setSteeringAngle((a) => Math.min(25, a + 12))}
                  className="p-0.5 text-slate-400 hover:text-white"
                  title="Steer Right"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}

          {/* BOTTOM VEHICLE CAROUSEL */}
          <div className="absolute bottom-6 left-0 right-0 z-20 px-4 md:px-8">
            <div
              className={`max-w-6xl mx-auto p-2 rounded-2xl border shadow-xl transition-colors ${
                isDarkMode
                  ? 'glass border-white/10'
                  : 'bg-white/90 backdrop-blur-md border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
                {categoryVehicles.map((v) => {
                  const isSelected = v.id === activeVehicle.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => handleSelectVehicle(v)}
                      className={`flex-shrink-0 flex items-center gap-3 px-3.5 py-2 rounded-xl text-left transition-all border ${
                        isSelected
                          ? isDarkMode
                            ? 'bg-white/10 border-amber-400/50 text-white shadow-lg'
                            : 'bg-slate-900 border-slate-900 text-white shadow-md'
                          : isDarkMode
                          ? 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <BrandEmblem
                        brand={v.brand}
                        className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}
                      />
                      <div>
                        <div
                          className={`text-[10px] mono uppercase leading-tight font-semibold ${
                            isSelected ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {v.brand}
                        </div>
                        <div className="text-xs font-bold whitespace-nowrap">
                          {v.name}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL-LINKED STORY PANELS OVERLAY */}
        {/* ACT 01 */}
        <div className="absolute top-[30vh] left-4 md:left-12 pointer-events-none z-10 max-w-sm">
          <div
            className={`p-6 rounded-2xl space-y-3 shadow-xl transition-colors ${
              isDarkMode
                ? 'glass border border-white/10'
                : 'bg-white/85 backdrop-blur-md border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-amber-500 text-xs mono font-bold">
              <Sparkles size={14} />
              <span>ACT 01 // INTERACTIVE SHOWROOM</span>
            </div>
            <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeVehicle.brand} {activeVehicle.name}
            </h2>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Open doors, engine hood, rear boot space, steer the wheels, and click on individual part components directly in 3D.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] mono text-slate-500 font-semibold">
              <ChevronDown size={14} className="animate-bounce" />
              <span>Scroll down to separate all parts in Exploded View</span>
            </div>
          </div>
        </div>

        {/* ACT 02 */}
        <div className="absolute top-[160vh] right-4 md:right-12 pointer-events-none z-10 max-w-md">
          <div
            className={`p-6 rounded-2xl space-y-4 shadow-xl transition-colors ${
              isDarkMode
                ? 'glass border border-white/10'
                : 'bg-white/85 backdrop-blur-md border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-sky-500 text-xs mono font-bold">
              <Layers size={14} />
              <span>ACT 02 // WORKING CAD POWERTRAIN</span>
            </div>
            <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Twin-Turbos, Carbon Driveshaft & Coilovers
            </h3>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Real internal mechanical parts operating simultaneously: spinning serpentine pulleys, rotating central driveshaft, limited-slip differential, and active suspension geometry.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs mono font-semibold">
              <div className={`p-2 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-500 text-[10px] block">AERO SPEC</span>
                <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{activeVehicle.specs.aeroOrWingspan}</span>
              </div>
              <div className={`p-2 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-500 text-[10px] block">WEIGHT / CEILING</span>
                <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{activeVehicle.specs.weightOrCeiling}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACT 03 */}
        <div className="absolute top-[280vh] left-4 md:left-12 pointer-events-none z-10 max-w-md">
          <div
            className={`p-6 rounded-2xl space-y-4 shadow-xl transition-colors ${
              isDarkMode
                ? 'glass border border-white/10'
                : 'bg-white/85 backdrop-blur-md border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-emerald-500 text-xs mono font-bold">
              <Gauge size={14} />
              <span>ACT 03 // ENGINEERING TELEMETRY</span>
            </div>
            <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Propulsion & Performance Spec
            </h3>
            <div className="space-y-2 text-xs">
              <div className={`flex justify-between items-center py-1.5 border-b ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
                <span className="flex items-center gap-2 font-medium text-slate-500">
                  <Zap size={14} className="text-amber-500" />
                  {selectedCategory === 'cars' ? 'Output' : 'Thrust'}
                </span>
                <span className={`mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeVehicle.specs.power}</span>
              </div>
              <div className={`flex justify-between items-center py-1.5 border-b ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
                <span className="flex items-center gap-2 font-medium text-slate-500">
                  <Wind size={14} className="text-sky-500" />
                  Top Speed
                </span>
                <span className={`mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeVehicle.specs.topSpeed}</span>
              </div>
              <div className={`flex justify-between items-center py-1.5 border-b ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
                <span className="flex items-center gap-2 font-medium text-slate-500">
                  <Compass size={14} className="text-emerald-500" />
                  {selectedCategory === 'cars' ? '0-100 km/h' : 'Max Range'}
                </span>
                <span className={`mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeVehicle.specs.accelerationOrRange}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="flex items-center gap-2 font-medium text-slate-500">
                  <Shield size={14} className="text-rose-500" />
                  Engine / Turbine
                </span>
                <span className={`mono font-bold text-right text-[11px] max-w-[200px] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {activeVehicle.specs.engineOrTurbine}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

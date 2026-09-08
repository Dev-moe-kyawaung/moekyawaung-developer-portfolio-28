import MatrixRain from "./MatrixRain";
import MatrixGrid from "./MatrixGrid";
import ParticleField from "./ParticleField";

/**
 * Ambient — the Quantum Matrix background stack, ordered back to front:
 * 1. MatrixGrid   (z-0) shifting lattice + perspective horizon
 * 2. MatrixRain   (z-1) cascading data streams
 * 3. ParticleField(z-2) quantum vortex simulation
 */
export default function Ambient() {
  return (
    <>
      <MatrixGrid />
      <MatrixRain />
      <ParticleField />
    </>
  );
}

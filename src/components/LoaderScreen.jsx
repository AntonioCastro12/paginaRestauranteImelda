import { motion } from "framer-motion";

export function LoaderScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950"
    >
      <div className="relative text-center">
        <div className="absolute inset-0 -z-10 rounded-full bg-brand-gradient blur-3xl" />
        <div className="mx-auto mb-6 h-24 w-24 animate-pulseSoft rounded-full border-4 border-amber-300/70 bg-brand-gradient shadow-glow" />
        <p className="font-display text-3xl font-black text-white">
          Doña Imelda
        </p>
        <p className="mt-2 text-sm uppercase tracking-[0.35em] text-orange-100/80">
          Patitas de puerco
        </p>
      </div>
    </motion.div>
  );
}

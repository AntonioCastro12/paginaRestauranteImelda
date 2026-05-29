import { motion } from "framer-motion";

export function HeroSection() {
  const goToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.28),transparent_25%)]" />
      <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900/70 shadow-glow backdrop-blur md:grid-cols-[1.1fr,0.9fr]">
        <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex w-fit rounded-full border border-amber-300/30 bg-amber-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200"
          >
            Receta tradicional
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl font-display text-4xl font-black leading-none text-white sm:text-5xl lg:text-6xl"
          >
            <span className="block text-amber-300">🔥 Las mejores</span>
            <span className="block">patitas de puerco caseras</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-lg text-lg leading-8 text-orange-50/85"
          >
            Hechas al estilo tradicional - Doña Imelda. Pide rápido, personaliza
            tus extras favoritos y manda tu orden por WhatsApp en segundos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={goToMenu}
              className="min-h-14 rounded-2xl bg-brand-gradient px-7 py-4 text-base font-bold text-white shadow-card transition duration-300 hover:scale-[1.02] active:scale-[0.99]"
            >
              Ordenar ahora
            </button>
            <a
              href="#testimonios"
              className="flex min-h-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-orange-50 transition duration-300 hover:border-amber-300/40 hover:bg-white/10"
            >
              Ver opiniones
            </a>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-orange-50/75">
            {["Hechas al momento", "Sabor casero", "Entrega por WhatsApp"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="relative min-h-[360px] md:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80"
            alt="Patitas de puerco servidas con estilo casero"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-stone-950/70 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
              Platillo estrella
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              Orden completa desde $100
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

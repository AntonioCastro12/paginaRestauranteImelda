import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { menuItems } from "./data/menu";
import { useCartStore } from "./store/useCartStore";
import { HeroSection } from "./components/HeroSection";
import { SectionTitle } from "./components/SectionTitle";
import { MenuCard } from "./components/MenuCard";
import { CustomizerPanel } from "./components/CustomizerPanel";
import { FloatingCart } from "./components/FloatingCart";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FooterSection } from "./components/FooterSection";
import { LoaderScreen } from "./components/LoaderScreen";

function App() {
  const addItem = useCartStore((state) => state.addItem);
  const hydrated = useCartStore((state) => state.hydrated);

  const [showLoader, setShowLoader] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(menuItems[0]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!feedback) return undefined;

    const timer = window.setTimeout(() => setFeedback(""), 2200);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const activeSummary = useMemo(
    () => ({
      base: selectedProduct.price,
      extras: selectedExtras.length,
    }),
    [selectedExtras.length, selectedProduct.price],
  );

  const toggleExtra = (extra) => {
    setSelectedExtras((current) => {
      const exists = current.some((item) => item.id === extra.id);
      const isTostada = selectedProduct.id === "tostada";
      const isContainer = selectedProduct.id === "contenedor";

      if (exists) {
        return current.filter((item) => item.id !== extra.id);
      }

      if (isTostada) {
        return [extra];
      }

      if (isContainer && current.length >= 4) {
        setFeedback("Solo puedes elegir hasta 4 ingredientes en el contenedor.");
        return current;
      }

      return [...current, extra];
    });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSelectedExtras([]);
  };

  const handleAddToCart = (config) => {
    addItem(config);
    setFeedback("Producto agregado al carrito.");
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <AnimatePresence>{showLoader && <LoaderScreen />}</AnimatePresence>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#1c0d09_0%,#250d08_12%,#33130c_30%,#120f10_100%)]" />
        <div className="relative z-10">
          <HeroSection />

          <section id="menu" className="px-4 py-12 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <SectionTitle
                eyebrow="Menu interactivo"
                title="Elige tu platillo o arma tu contenedor combinable"
                description="La orden de pata entera y la media orden son platillos diferentes. Solo los contenedores se combinan: $70 con 3 ingredientes y $100 con 4. El envio se cobra aparte."
              />

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,380px]">
                <div className="grid gap-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {menuItems.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        isActive={selectedProduct.id === item.id}
                        onSelect={handleSelectProduct}
                      />
                    ))}
                  </div>

                  <motion.div
                    layout
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                      Resumen rapido
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-[1.4rem] bg-white/5 p-4">
                        <p className="text-sm text-orange-100/70">Base activa</p>
                        <p className="mt-2 text-lg font-bold text-white">
                          {selectedProduct.name}
                        </p>
                      </div>
                      <div className="rounded-[1.4rem] bg-white/5 p-4">
                        <p className="text-sm text-orange-100/70">Precio base</p>
                        <p className="mt-2 text-lg font-bold text-white">
                          {selectedProduct.id === "contenedor"
                            ? "$70 / $100"
                            : `$${activeSummary.base}`}
                        </p>
                      </div>
                      <div className="rounded-[1.4rem] bg-white/5 p-4">
                        <p className="text-sm text-orange-100/70">
                          {selectedProduct.id === "contenedor"
                            ? "Ingredientes elegidos"
                            : selectedProduct.id === "tostada"
                              ? "Ingrediente elegido"
                            : "Servicio incluido"}
                        </p>
                        <p className="mt-2 text-lg font-bold text-white">
                          {selectedProduct.id === "contenedor"
                            ? `${activeSummary.extras}/4`
                            : selectedProduct.id === "tostada"
                              ? `${activeSummary.extras}/1`
                            : "Completo"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <CustomizerPanel
                  selectedProduct={selectedProduct}
                  selectedExtras={selectedExtras}
                  onToggleExtra={toggleExtra}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </section>

          <TestimonialsSection />
          <FooterSection />
        </div>
      </main>

      <FloatingCart />

      <AnimatePresence>
        {feedback && hydrated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-1/2 top-4 z-[60] -translate-x-1/2 rounded-full border border-white/10 bg-stone-900/90 px-5 py-3 text-sm font-semibold text-white shadow-card backdrop-blur"
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

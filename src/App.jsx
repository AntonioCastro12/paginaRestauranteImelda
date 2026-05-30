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
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [quantity, setQuantity] = useState(1);
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

  const resetSelections = () => {
    setSelectedExtras([]);
    setRemovedIngredients([]);
    setSelectedAddOns({});
    setQuantity(1);
  };

  const toggleExtra = (extra) => {
    setSelectedExtras((current) => {
      const exists = current.some((item) => item.id === extra.id);
      const isTostada = selectedProduct.id === "tostada";
      const isDoubleTostada = selectedProduct.id === "tostada-doble";
      const isContainer = selectedProduct.id === "contenedor";

      if (exists) {
        return current.filter((item) => item.id !== extra.id);
      }

      if (isTostada) {
        return [extra];
      }

      if (isDoubleTostada && current.length >= 2) {
        setFeedback("La tostada especial solo lleva 2 ingredientes.");
        return current;
      }

      if (isContainer && current.length >= 4) {
        setFeedback("Solo puedes elegir hasta 4 ingredientes en el contenedor.");
        return current;
      }

      return [...current, extra];
    });
  };

  const toggleRemovedIngredient = (ingredientName) => {
    setRemovedIngredients((current) =>
      current.includes(ingredientName)
        ? current.filter((item) => item !== ingredientName)
        : [...current, ingredientName],
    );
  };

  const handleAddOnQuantityChange = (id, value) => {
    setSelectedAddOns((current) => ({
      ...current,
      [id]: Math.max(0, value),
    }));
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    resetSelections();
  };

  const handleAddToCart = (config) => {
    addItem(config);
    resetSelections();
    setFeedback("Pedido agregado al carrito.");
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <AnimatePresence>{showLoader && <LoaderScreen />}</AnimatePresence>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#1c0d09_0%,#250d08_12%,#33130c_30%,#120f10_100%)]" />
        <div className="relative z-10">
          <HeroSection />

          <section id="menu" className="px-4 py-10 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-6xl">
              <SectionTitle
                eyebrow="Menu interactivo"
                title="Elige tu platillo o arma tu contenedor combinable"
                description="Ya incluye tostada preparada de $30 y tostada especial de $60 con 2 ingredientes. Tambien mejoramos la experiencia para celulares con controles mas compactos y faciles de tocar."
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
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                      Resumen rapido
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-[1.4rem] bg-white/5 p-4">
                        <p className="text-sm text-orange-100/70">Base activa</p>
                        <p className="mt-2 text-base font-bold text-white sm:text-lg">
                          {selectedProduct.name}
                        </p>
                      </div>
                      <div className="rounded-[1.4rem] bg-white/5 p-4">
                        <p className="text-sm text-orange-100/70">Precio base</p>
                        <p className="mt-2 text-base font-bold text-white sm:text-lg">
                          {selectedProduct.id === "contenedor"
                            ? "$70 / $100"
                            : `$${activeSummary.base}`}
                        </p>
                      </div>
                      <div className="rounded-[1.4rem] bg-white/5 p-4">
                        <p className="text-sm text-orange-100/70">
                          {selectedProduct.id === "contenedor"
                            ? "Ingredientes elegidos"
                            : selectedProduct.id === "tostada-doble"
                              ? "Ingredientes elegidos"
                              : selectedProduct.id === "tostada"
                                ? "Ingrediente elegido"
                                : "Servicio incluido"}
                        </p>
                        <p className="mt-2 text-base font-bold text-white sm:text-lg">
                          {selectedProduct.id === "contenedor"
                            ? `${activeSummary.extras}/4`
                            : selectedProduct.id === "tostada-doble"
                              ? `${activeSummary.extras}/2`
                              : selectedProduct.id === "tostada"
                                ? `${activeSummary.extras}/1`
                                : "Completo"}
                        </p>
                      </div>
                      <div className="rounded-[1.4rem] bg-white/5 p-4">
                        <p className="text-sm text-orange-100/70">Cantidad</p>
                        <p className="mt-2 text-base font-bold text-white sm:text-lg">
                          {quantity}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <CustomizerPanel
                  selectedProduct={selectedProduct}
                  selectedExtras={selectedExtras}
                  removedIngredients={removedIngredients}
                  selectedAddOns={selectedAddOns}
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  onToggleExtra={toggleExtra}
                  onToggleRemovedIngredient={toggleRemovedIngredient}
                  onAddOnQuantityChange={handleAddOnQuantityChange}
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
            className="fixed left-1/2 top-4 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-white/10 bg-stone-900/90 px-5 py-3 text-center text-sm font-semibold text-white shadow-card backdrop-blur"
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

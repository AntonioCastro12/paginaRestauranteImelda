import { AnimatePresence, motion } from "framer-motion";
import { businessInfo } from "../data/menu";
import { useCartStore } from "../store/useCartStore";
import { formatCurrency } from "../utils/format";
import { buildWhatsAppUrl } from "../utils/whatsapp";

export function FloatingCart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.getTotal());

  const openWhatsApp = () => {
    if (!items.length) return;

    window.open(
      buildWhatsAppUrl({
        number: businessInfo.whatsappNumber,
        items,
        total,
      }),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-50 px-4 sm:bottom-6">
      <div className="mx-auto max-w-md">
        <AnimatePresence>
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              className="pointer-events-auto overflow-hidden rounded-[2rem] border border-white/10 bg-stone-950/95 shadow-glow backdrop-blur"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-300">
                    Tu pedido
                  </p>
                  <p className="mt-1 text-lg font-black text-white">
                    {items.length} producto{items.length > 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-50/70 transition hover:border-rose-400/50 hover:text-white"
                >
                  Vaciar
                </button>
              </div>

              <div className="max-h-56 space-y-3 overflow-y-auto px-5 py-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="mt-1 text-sm text-orange-50/70">
                          {item.extras.length
                            ? `Ingredientes: ${item.extras
                                .map((extra) => extra.name)
                                .join(", ")}`
                            : "Sin seleccion adicional"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-amber-300">
                          {formatCurrency(item.total)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-rose-300"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 px-5 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-orange-50/75">Total</span>
                  <span className="text-2xl font-black text-white">
                    {formatCurrency(total)}
                  </span>
                </div>
                <p className="mb-4 text-sm text-orange-50/70">
                  {businessInfo.shippingNote}
                </p>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="w-full rounded-2xl bg-brand-gradient px-5 py-4 text-base font-black text-white transition duration-300 hover:scale-[1.01]"
                >
                  Finalizar pedido
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { useMemo } from "react";
import { motion } from "framer-motion";
import { extras, businessInfo } from "../data/menu";
import { formatCurrency } from "../utils/format";

const TOSTADA_PRICE = 30;
const CONTAINER_THREE_PRICE = 70;
const CONTAINER_FOUR_PRICE = 100;

function getProductMode(productId) {
  if (productId === "tostada") return "single";
  if (productId === "contenedor") return "multi";
  return "fixed";
}

export function CustomizerPanel({
  selectedProduct,
  selectedExtras,
  onToggleExtra,
  onAddToCart,
}) {
  const mode = getProductMode(selectedProduct.id);
  const isTostada = mode === "single";
  const isContainer = mode === "multi";
  const maxSelections = isTostada ? 1 : isContainer ? 4 : 0;

  const total = useMemo(() => {
    if (isTostada) {
      return selectedExtras.length === 1 ? TOSTADA_PRICE : 0;
    }

    if (isContainer) {
      if (selectedExtras.length === 3) return CONTAINER_THREE_PRICE;
      if (selectedExtras.length === 4) return CONTAINER_FOUR_PRICE;
      return 0;
    }

    return selectedProduct.price;
  }, [isContainer, isTostada, selectedExtras.length, selectedProduct.price]);

  const canAdd = isTostada
    ? selectedExtras.length === 1
    : isContainer
      ? selectedExtras.length === 3 || selectedExtras.length === 4
      : true;

  return (
    <motion.aside
      layout
      className="sticky top-4 rounded-[2rem] border border-white/10 bg-stone-900/80 p-5 shadow-glow backdrop-blur"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
            Personalizador
          </p>
          <h3 className="mt-2 font-display text-2xl font-black text-white">
            {selectedProduct.name}
          </h3>
        </div>
        <div className="rounded-2xl bg-white/10 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-100/70">
            Total
          </p>
          <p className="text-2xl font-black text-amber-300">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white">
          {isTostada
            ? "Elige 1 ingrediente para tu tostada"
            : isContainer
              ? "Selecciona 3 o 4 ingredientes para tu contenedor"
              : "Este platillo ya incluye su servicio completo"}
        </p>
        <p className="mt-1 text-sm text-orange-50/70">
          {isTostada
            ? `Cada tostada preparada cuesta ${formatCurrency(TOSTADA_PRICE)}.`
            : isContainer
              ? `Solo los contenedores se combinan: 3 ingredientes ${formatCurrency(CONTAINER_THREE_PRICE)} · 4 ingredientes ${formatCurrency(CONTAINER_FOUR_PRICE)}.`
              : "Las tostadas y la salsa van aparte, tal como en el menu."}
        </p>

        {mode !== "fixed" ? (
          <div className="mt-4 grid gap-3">
            {extras.map((extra) => {
              const checked = selectedExtras.some((item) => item.id === extra.id);
              const disabled = !checked && selectedExtras.length >= maxSelections;

              return (
                <label
                  key={extra.id}
                  className={`block cursor-pointer rounded-2xl border px-4 py-4 transition ${
                    checked
                      ? "border-amber-300 bg-amber-300/10"
                      : "border-white/10 bg-white/5"
                  } ${disabled ? "opacity-45" : "hover:border-orange-300/60"}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-white/20 accent-orange-500"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => onToggleExtra(extra)}
                      />
                      <span className="font-medium text-white">{extra.name}</span>
                    </div>
                    <span className="text-sm font-bold text-amber-300">
                      {formatCurrency(extra.price)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-orange-50/65">
                    {extra.description}
                  </p>
                </label>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm leading-6 text-orange-50/75">
              {selectedProduct.description}
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white">Seleccion actual</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {mode !== "fixed" && selectedExtras.length > 0 ? (
            selectedExtras.map((extra) => (
              <span
                key={extra.id}
                className="rounded-full bg-rose-500/20 px-3 py-2 text-sm font-medium text-orange-50"
              >
                {extra.name}
              </span>
            ))
          ) : (
            <span className="text-sm text-orange-50/65">
              {mode !== "fixed"
                ? "Sin ingredientes por ahora."
                : "Producto listo para agregar."}
            </span>
          )}
        </div>
      </div>

      {isTostada && (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-amber-300/30 bg-amber-300/10 p-4 text-sm text-orange-50/85">
          Cada tostada cuesta {formatCurrency(TOSTADA_PRICE)}.
          <p className="mt-2 font-semibold text-amber-200">
            {businessInfo.shippingNote}
          </p>
        </div>
      )}

      {isContainer && (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-amber-300/30 bg-amber-300/10 p-4 text-sm text-orange-50/85">
          Elige 3 ingredientes para pagar {formatCurrency(CONTAINER_THREE_PRICE)} o
          4 ingredientes para pagar {formatCurrency(CONTAINER_FOUR_PRICE)}.
          {!canAdd && (
            <p className="mt-2 font-semibold text-amber-200">
              Te faltan {3 - selectedExtras.length} ingrediente
              {3 - selectedExtras.length === 1 ? "" : "s"} para completar el
              pedido minimo del contenedor.
            </p>
          )}
          <p className="mt-2 font-semibold text-amber-200">
            {businessInfo.shippingNote}
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={!canAdd}
        onClick={() =>
          onAddToCart({
            product: selectedProduct,
            extras: selectedExtras,
            total,
          })
        }
        className="mt-6 w-full rounded-2xl bg-brand-gradient px-5 py-4 text-base font-black text-white transition duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isContainer
          ? "Agregar contenedor al carrito"
          : isTostada
            ? "Agregar tostada al carrito"
            : "Agregar al carrito"}
      </button>
    </motion.aside>
  );
}

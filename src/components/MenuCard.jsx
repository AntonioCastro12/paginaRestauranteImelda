import { motion } from "framer-motion";
import { formatCurrency } from "../utils/format";

export function MenuCard({ item, isActive, onSelect }) {
  const priceLabel =
    item.id === "contenedor"
      ? "$70 / $100"
      : item.id === "tostada"
        ? "$30"
        : formatCurrency(item.price);

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className={`overflow-hidden rounded-[1.75rem] border bg-white/95 shadow-card ${
        isActive ? "border-rose-500 ring-2 ring-amber-300/60" : "border-white/30"
      }`}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-sauce px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
          {item.badge}
        </span>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-black text-stone-900">
              {item.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {item.description}
            </p>
          </div>
          <span className="rounded-full bg-orange-100 px-3 py-2 text-base font-black text-orange-700">
            {priceLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(item)}
          className={`w-full rounded-2xl px-5 py-4 text-base font-bold transition duration-300 ${
            isActive
              ? "bg-stone-900 text-white"
              : "bg-brand-gradient text-white hover:scale-[1.02]"
          }`}
        >
          {isActive ? "Personalizando" : "Agregar"}
        </button>
      </div>
    </motion.article>
  );
}

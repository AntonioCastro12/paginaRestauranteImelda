import { businessInfo } from "../data/menu";

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 px-4 pb-32 pt-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur md:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300">
            Doña Imelda
          </p>
          <p className="mt-3 font-display text-2xl font-black text-white">
            100% caseras - Doña Imelda
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-orange-100/65">
            Horarios
          </p>
          <p className="mt-2 text-base text-white">{businessInfo.hours}</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-orange-100/65">
            Ubicacion
          </p>
          <p className="mt-2 text-base text-white">{businessInfo.location}</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-orange-100/65">
            Envio
          </p>
          <p className="mt-2 text-base text-white">{businessInfo.shippingNote}</p>
        </div>
      </div>
    </footer>
  );
}

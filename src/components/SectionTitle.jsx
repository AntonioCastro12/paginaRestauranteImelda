export function SectionTitle({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-orange-50/80">{description}</p>
    </div>
  );
}

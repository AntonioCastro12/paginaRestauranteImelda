import { motion } from "framer-motion";
import { testimonials } from "../data/menu";
import { SectionTitle } from "./SectionTitle";

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Prueba social"
          title="Clientes que ya se enamoraron del sabor"
          description="Comentarios reales, cortitos y poderosos para que sepas que aqui se cocina con sazón y constancia."
          centered
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 shadow-card backdrop-blur"
            >
              <div className="mb-4 flex gap-1 text-xl text-amber-300">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span key={starIndex}>★</span>
                ))}
              </div>
              <p className="text-lg font-semibold text-white">
                "{testimonial.text}"
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-orange-100/70">
                {testimonial.name}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

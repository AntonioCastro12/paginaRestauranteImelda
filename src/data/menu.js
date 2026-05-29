export const menuItems = [
  {
    id: "orden-patitas",
    name: "Orden de patitas",
    price: 100,
    type: "fixed",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    description:
      "Platillo completo de 8 piezas de patita con porcion de repollo, zanahoria, pico de gallo, aguacate, limon y cueritos. Tostadas y salsa aparte.",
    badge: "Favorita",
  },
  {
    id: "media-orden",
    name: "Media orden",
    price: 60,
    type: "fixed",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
    description:
      "Platillo de media porcion con 4 piezas de patita, repollo, zanahoria, pico de gallo, aguacate, limon y cueritos. Tostadas y salsa aparte.",
    badge: "Para antojo",
  },
  {
    id: "tostada",
    name: "Tostada preparada",
    price: 30,
    type: "single-select",
    image:
      "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Elige 1 ingrediente: cueritos, oreja, pata picada, queso de puerco, carne tartara o ceviche. Cada tostada cuesta $30.",
    badge: "Desde $30",
  },
  {
    id: "contenedor",
    name: "Contenedor combinable",
    price: 0,
    type: "multi-select",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Solo los contenedores se pueden combinar. Lleva 3 ingredientes por $70 o 4 ingredientes por $100. El envio se cobra por separado.",
    badge: "A tu gusto",
  },
];

export const extras = [
  {
    id: "oreja",
    name: "Oreja",
    price: 30,
    description:
      "Porcion de oreja con repollo, frijoles, pico de gallo, zanahoria y aguacate. Tostadas y salsa aparte.",
  },
  {
    id: "cueritos",
    name: "Cueritos",
    price: 30,
    description:
      "Porcion de cueritos con repollo, frijoles, pico de gallo, zanahoria y aguacate. Tostadas y salsa aparte.",
  },
  {
    id: "ceviche",
    name: "Ceviche",
    price: 30,
    description:
      "Porcion de ceviche con aguacate y zanahoria. Tostadas y salsa aparte.",
  },
  {
    id: "tartara",
    name: "Carne tartara",
    price: 30,
    description:
      "Porcion de carne tartara con aguacate y zanahoria. Tostadas y salsa aparte.",
  },
  {
    id: "pata-picada",
    name: "Pata picada",
    price: 30,
    description:
      "Porcion de pata picada con repollo, frijoles, pico de gallo, zanahoria y aguacate. Tostadas y salsa aparte.",
  },
  {
    id: "queso-puerco",
    name: "Queso de puerco",
    price: 30,
    description:
      "Porcion de queso de puerco con aguacate y zanahoria. Tostadas y salsa aparte.",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Lupita G.",
    text: "Muy ricas",
  },
  {
    id: 2,
    name: "Carlos M.",
    text: "Super recomendadas",
  },
  {
    id: 3,
    name: "Mari R.",
    text: "Sabor casero del bueno y llegan listas para disfrutar.",
  },
];

export const businessInfo = {
  whatsappNumber: "5215512345678",
  hours: "Lunes a domingo | 9:00 AM a 7:00 PM",
  location: "Mercado local, Ciudad de Mexico",
  shippingNote: "El costo de envio se cobra por separado.",
};

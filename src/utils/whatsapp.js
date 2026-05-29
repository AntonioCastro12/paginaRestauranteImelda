export const buildWhatsAppUrl = ({ number, items, total }) => {
  const lines = [
    "Hola, quiero hacer un pedido:",
    "",
    ...items.map((item) => {
      const extras =
        item.extras.length > 0
          ? `\nIngredientes: ${item.extras.map((extra) => extra.name).join(", ")}`
          : "";

      return `* ${item.name}${extras}\nTotal: $${item.total}`;
    }),
    "",
    `Total general: $${total}`,
    "Envio: se cobra por separado",
  ];

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
};

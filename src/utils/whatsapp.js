export const buildWhatsAppUrl = ({ number, items, total }) => {
  const lines = [
    "Hola, quiero hacer un pedido:",
    "",
    ...items.map((item) => {
      const tostadas =
        item.tostadaOrders?.length > 0
          ? `\nDetalle de tostadas:\n${item.tostadaOrders
              .map((order, index) => {
                const removed =
                  order.removedIngredients.length > 0
                    ? ` | Sin: ${order.removedIngredients.join(", ")}`
                    : "";
                return `- Tostada ${index + 1}: ${order.ingredientName}${removed}`;
              })
              .join("\n")}`
          : "";
      const extras =
        !item.tostadaOrders?.length && item.extras.length > 0
          ? `\nIngredientes: ${item.extras.map((extra) => extra.name).join(", ")}`
          : "";
      const removed =
        item.removedIngredients?.length > 0
          ? `\nSin: ${item.removedIngredients.join(", ")}`
          : "";
      const addOns =
        item.addOns?.length > 0
          ? `\nExtras: ${item.addOns
              .map((addOn) => `${addOn.name} x${addOn.quantity}`)
              .join(", ")}`
          : "";

      return `* ${item.name}\nCantidad: ${item.quantity}${tostadas}${extras}${removed}${addOns}\nTotal: $${item.total * item.quantity}`;
    }),
    "",
    `Total general: $${total}`,
    "Envio: se cobra por separado, favor de poner tu direccion completa, para cotizar el envio.",
  ];

  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(lines.join("\n"))}`;
};

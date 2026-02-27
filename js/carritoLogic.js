// ===============================
// LÓGICA DE NEGOCIO DEL CARRITO
// ===============================

function agregarProducto(carrito, producto) {
  const existe = carrito.find(p => p.id === producto.id)

  if (existe) {
    return carrito.map(p =>
      p.id === producto.id
        ? { ...p, cantidad: p.cantidad + 1 }
        : p
    )
  }

  return [...carrito, { ...producto, cantidad: 1 }]
}

function eliminarProducto(carrito, id) {
  return carrito.filter(p => p.id !== id)
}

function cambiarCantidad(carrito, id, nuevaCantidad) {
  if (nuevaCantidad <= 0) {
    return carrito.filter(p => p.id !== id)
  }

  return carrito.map(p =>
    p.id === id
      ? { ...p, cantidad: nuevaCantidad }
      : p
  )
}

function calcularSubtotal(carrito) {
  if (carrito.length === 0) {
    return 0
  }

  return carrito.reduce((total, p) => {
    return total + p.precio * p.cantidad
  }, 0)
}

function vaciarCarrito() {
  return []
}

module.exports = {
  agregarProducto,
  eliminarProducto,
  cambiarCantidad,
  calcularSubtotal,
  vaciarCarrito
}
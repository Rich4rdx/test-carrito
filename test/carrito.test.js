const {
  agregarProducto,
  eliminarProducto,
  cambiarCantidad,
  calcularSubtotal,
  vaciarCarrito
} = require("../js/carritoLogic")

describe("Lógica del carrito", () => {
  const producto = { id: 1, nombre: "Laptop", precio: 1000 };

  test("agrega un producto al carrito", () => {
    const carrito = [];
    const resultado = agregarProducto(carrito, producto);

    expect(resultado.length).toBe(1);
    expect(resultado[0].cantidad).toBe(1);
  });

  test("incrementa cantidad si el producto ya existe", () => {
    const carrito = [{ ...producto, cantidad: 1 }];
    const resultado = agregarProducto(carrito, producto);

    expect(resultado[0].cantidad).toBe(2);
  });

  test("elimina un producto", () => {
    const carrito = [{ ...producto, cantidad: 1 }];
    const resultado = eliminarProducto(carrito, 1);

    expect(resultado.length).toBe(0);
  });

  test("cambia la cantidad correctamente", () => {
    const carrito = [{ ...producto, cantidad: 1 }];
    const resultado = cambiarCantidad(carrito, 1, 5);

    expect(resultado[0].cantidad).toBe(5);
  });

  test("calcula el subtotal", () => {
    const carrito = [
      { id: 1, precio: 100, cantidad: 2 },
      { id: 2, precio: 50, cantidad: 1 }
    ];

    expect(calcularSubtotal(carrito)).toBe(250);
  });
});
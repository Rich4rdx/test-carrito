const botonesAgregar = document.querySelectorAll(".product-card__button")
const listaCarro = document.querySelector(".cart-empty")




const lista = []

const guardarEnLocalStorage = () => {
    localStorage.setItem("informacion", JSON.stringify(lista));
}


document.addEventListener(`DOMContentLoaded`,()=>{
    const carroGuardado = localStorage.getItem("informacion")

    if (carroGuardado) {
        const informacion = JSON.parse(carroGuardado)
        lista.push(...informacion)
        renderLista()
        
        
    }

})


botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {

        const nombre = boton.closest(".product-card")
            .querySelector(".product-card__title").textContent

        const preciosTexto = boton.closest(".product-card")
            .querySelector(".product-card__price").textContent

        const precio = Number(preciosTexto.replace("$", ""))


        const productoExistente = lista.find(prod => prod.nombre === nombre)

        if (productoExistente) {
            productoExistente.cantidad += 1
        } else {
            lista.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            })
        }

        guardarEnLocalStorage()
        renderLista()
    })
})

const renderLista = () => {

    listaCarro.innerHTML = ""

    let subtotal = 0
    const subTotalElemento = document.querySelector("#cart-subtotal")

    if (lista.length === 0) {
        listaCarro.innerHTML = "<p>El carrito está vacío</p>"
    }

    lista.forEach((producto, index) => {

        const li = document.createElement("li")
        li.style.marginBottom = "10px"

        const nombre = document.createElement("span")
        nombre.textContent = `${producto.nombre} - $${producto.precio}`

        const cantidad = document.createElement("span")
        cantidad.textContent = ` Cantidad: ${producto.cantidad} `

        const btnMas = document.createElement("button")
        btnMas.textContent = "+"

        const btnEliminar = document.createElement("button")
        btnEliminar.textContent = "Eliminar"
        
        const btnMenos = document.createElement("button")
        btnMenos.textContent = "-"

        

 
        btnMas.addEventListener("click", () => {
            producto.cantidad += 1
            guardarEnLocalStorage()
            renderLista()
        })

     
        btnMenos.addEventListener("click", () => {
            if (producto.cantidad > 1) {
                producto.cantidad -= 1
            } else {
                lista.splice(index, 1)
            }

            guardarEnLocalStorage()
            renderLista()
        })

        btnEliminar.addEventListener("click", () => {
            lista.splice(index, 1)
            guardarEnLocalStorage()
            renderLista()
        })

        subtotal += producto.precio * producto.cantidad

        li.appendChild(nombre)
        li.appendChild(btnMenos)
        li.appendChild(cantidad)
        li.appendChild(btnMas)
        li.appendChild(btnEliminar)

        listaCarro.appendChild(li)
    })

    subTotalElemento.textContent = subtotal
}

const botonVaciar = document.querySelector("#clear-cart-btn")

botonVaciar.addEventListener("click", () => {
    lista.length = 0
    guardarEnLocalStorage()
    renderLista()
})



const readlineSync = require("readline-sync")
// const prompt = require('prompt-sync')()

let vehiculos = [
  { id: 1, tipo: "Coche", marca: "McLaren", modelo: "675LT", anio: 2024, cv: 675, precio: 285000 },
  { id: 2, tipo: "Coche", marca: "Seat", modelo: "Ibiza", anio: 2019, cv: 95, precio: 15500 },
  { id: 3, tipo: "Coche", marca: "Porsche", modelo: "918 Spyder", anio: 2013, cv: 800, precio: 950000 },
  { id: 4, tipo: "Moto", marca: "Yamaha", modelo: "MT-07", anio: 2026, cv: 73, precio: 7800 },
  { id: 5, tipo: "Moto", marca: "Honda", modelo: "CBR600RR", anio: 2026, cv: 120, precio: 14500 },
  { id: 6, tipo: "Moto", marca: "Ducati", modelo: "Panigale V4S", anio: 2026, cv: 214, precio: 24000 },
]

// FUNCIONES PARA NO DUPLICAR CÓDIGO

// Pregunta algo hasta que se escriba un número válido
function pedirNumero(texto) {
  let valor = readlineSync.question(texto)
  while (isNaN(valor) || valor.trim() === "") {
    console.log("Escribe un número válido.")
    valor = readlineSync.question(texto)
  }
  return Number(valor)
}

// Pregunta el tipo (coche o moto)
function pedirTipo() {
  let tipo = readlineSync.question("Tipo (coche/moto): ").toLowerCase()
  while (tipo !== "coche" && tipo !== "moto") {
    console.log("Elije entre 'coche' o 'moto'.")
    tipo = readlineSync.question("Tipo (coche/moto): ").toLowerCase()
  }
  return tipo.charAt(0).toUpperCase() + tipo.slice(1)
}

// Pregunta si el orden es ascendente (s) o descendente (n)
function pedirOrdenAscendente() {
  let respuesta = readlineSync.question("¿Ascendente? (s/n): ").toLowerCase()
  while (respuesta !== "s" && respuesta !== "n") {
    console.log("Responde 's' o 'n'.")
    respuesta = readlineSync.question("¿Ascendente? (s/n): ").toLowerCase()
  }
  return respuesta === "s"
}

// Genera un ID nuevo para asignar a un nuevo vehículo
function crearNuevoId() {
  let masAlto = 0
  for (const v of vehiculos) {
    if (v.id > masAlto) {
      masAlto = v.id
    }
  }
  return masAlto + 1
}

// Muestra los vehículos con la decoración
function mostrarLista(lista) {
  for (const v of lista) {
    console.log(
      `${v.id}. ${v.tipo} | ${v.marca} | ${v.modelo} | ${v.anio} | ${v.cv} CV | ${v.precio} €`
    )
  }
}

// Presionar ENTER para continuar
function pausa() {
  readlineSync.question("\nPulsa ENTER para volver al menú.")
}

// =========== MENÚ ========================================================

function mostrarMenu() {
  console.log("\n=== JM Garage ===")
  console.log("1. Mostrar entradas")
  console.log("2. Añadir entrada")
  console.log("3. Buscar por marca o modelo")
  console.log("4. Filtrar por coche o moto")
  console.log("5. Filtrar por año")
  console.log("6. Modificar entrada")
  console.log("7. Eliminar entrada")
  console.log("8. Ordenar por precio")
  console.log("9. Ordenar por año")
  console.log("10. Ordenar por ID")
  console.log("0. Salir\n")
}

// Opción 1: mostrar todo el array
function mostrarEntradas() {
  mostrarLista(vehiculos)
}

// Opción 2: añadir entrada
function anadirEntrada() {
  const nuevo = {
    id: crearNuevoId(),
    tipo: pedirTipo(),
    marca: readlineSync.question("Marca: "),
    modelo: readlineSync.question("Modelo: "),
    anio: pedirNumero("Año: "),
    cv: pedirNumero("CV: "),
    precio: pedirNumero("Precio: "),
  }
  vehiculos.push(nuevo)
  console.log("Vehículo añadido correctamente.")
}

// Opción 3: buscar por marca o modelo
function buscarPorMarcaOModelo() {
  const texto = readlineSync.question("Buscar: ").toLowerCase()

  const resultado = vehiculos.filter(
    (v) => v.marca.toLowerCase() === texto || v.modelo.toLowerCase() === texto
  )
  mostrarLista(resultado)
}

// Opción 4: filtrar por coche o moto
function filtrarPorCategoria() {
  const tipo = pedirTipo()

  const resultado = vehiculos.filter((v) => v.tipo === tipo)
  mostrarLista(resultado)
}

// Opción 5: filtrar por año
function filtrarPorAnio() {
  const anio = pedirNumero("Año: ")

  const resultado = vehiculos.filter((v) => v.anio === anio)
  mostrarLista(resultado)
}

// Opción 6: modificar un objeto existente
function modificarEntrada() {
  const id = pedirNumero("ID de la entrada a modificar: ")

  const vehiculo = vehiculos.find((v) => v.id === id)
  if (vehiculo === undefined) {
    console.log("No existe ningún vehículo con ese ID.")
    return
  }

  vehiculo.tipo = pedirTipo()
  vehiculo.marca = readlineSync.question("Marca: ")
  vehiculo.modelo = readlineSync.question("Modelo: ")
  vehiculo.anio = pedirNumero("Año: ")
  vehiculo.cv = pedirNumero("CV: ")
  vehiculo.precio = pedirNumero("Precio: ")
  console.log("\nVehículo modificado correctamente.")
}

// Opción 7: eliminar un vehículo
function eliminarEntrada() {
  const id = pedirNumero("ID de la entrada a eliminar: ")

  const posicion = vehiculos.findIndex((v) => v.id === id)
  if (posicion === -1) {
    console.log("No existe ningún vehículo con ese ID.")
    return
  }

  const confirmacion = readlineSync.question("¿Seguro que quieres eliminarla? (s/n): ").toLowerCase()
  if (confirmacion === "s") {
    vehiculos.splice(posicion, 1)
    console.log("Vehículo eliminado.")
  } else {
    console.log("Operación cancelada.")
  }
}

// Opción 8: ordenar por precio
function ordenarPorPrecio() {
  const ascendente = pedirOrdenAscendente()

  if (ascendente) {
    vehiculos.sort((a, b) => a.precio - b.precio)
  } else {
    vehiculos.sort((a, b) => b.precio - a.precio)
  }
  mostrarLista(vehiculos)
}

// Opción 9: ordenar por año
function ordenarPorAnio() {
  const ascendente = pedirOrdenAscendente()

  if (ascendente) {
    vehiculos.sort((a, b) => a.anio - b.anio)
  } else {
    vehiculos.sort((a, b) => b.anio - a.anio)
  }
  mostrarLista(vehiculos)
}

// Opción 10: ordenar por ID
function ordenarPorId() {
  const ascendente = pedirOrdenAscendente()

  if (ascendente) {
    vehiculos.sort((a, b) => a.id - b.id)
  } else {
    vehiculos.sort((a, b) => b.id - a.id)
  }
  mostrarLista(vehiculos)
}

// ======== FUNCIÓN PRINCIPAL ========================================================

function main() {
  let opcion = ""

  while (opcion !== "0") {
    mostrarMenu()
    opcion = readlineSync.question("Elige una opción: ")

    switch (opcion) {
      case "1":
        mostrarEntradas()
        break
      case "2":
        anadirEntrada()
        break
      case "3":
        buscarPorMarcaOModelo()
        break
      case "4":
        filtrarPorCategoria()
        break
      case "5":
        filtrarPorAnio()
        break
      case "6":
        modificarEntrada()
        break
      case "7":
        eliminarEntrada()
        break
      case "8":
        ordenarPorPrecio()
        break
      case "9":
        ordenarPorAnio()
        break
      case "10":
        ordenarPorId()
        break
      case "0":
        console.log("Chao pescao'!")
        break
      default:
        console.log("Opción no válida, prueba otra vez.")
    }

    // La espera.
    if (opcion !== "0") {
      pausa()
    }
  }
}

main()

import React, { useEffect, useState } from "react";
import { db } from "./firabse";
import { addDoc, collection, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";

const bocaditos = [
  {
    nombre: "Trufas de chocolate",
    descripcion: "Trufas de bañadas en chocolate oscuro ",
    precio: 0.25,
    tipo: "Dulce",
    vegano: false,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: "Bites de coco",
    descripcion: "con ganache chocolate 70% y frutos secos",
    precio: 0.30,
    tipo: "Dulce",
    vegano: false,
    sinGluten: true,
    formato: "uni",
  },
  {
    nombre: "Barras de energia",
    descripcion: "Crujientes con relleno dulce de mora",
    precio: 0.85,
    tipo: "Dulce",
    vegano: true,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: "Muse de frutos rojos",
    descripcion: "Crema a base de leche de almendras y endulzada con stevia",
    precio: 0.70,
    tipo: "Dulce",
    vegano: true,
    sinGluten: true,
    formato: "uni",
  },
  {
    nombre: "panna cotta del bosque  ",
    descripcion: "Crema de almendras ligera con toque dulce natural, acompañada de salsa de frutos rojos frescos.",
    precio: 1.50,
    tipo: "Premium",
    vegano: true,
    sinGluten: true,
    formato: "uni",
  },
  {
    nombre: "Chips de manzana",
    descripcion: "Crujientes con relleno dulce ",
    precio: 0.2,
    tipo: "Dulce",
    vegano: true,
    sinGluten: false,
    formato: "pac",
  },
  {
    nombre: "Mini donuts glaseadas",
    descripcion: "Glaseado rosa, blanco o con escarchas doradas",
    precio: 0.35,
    tipo: "Dulce",
    vegano: false,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: "Croissants rellenos",
    descripcion: "rellenos de crema pastelera o manjar",
    precio: 0.4,
    tipo: "Dulce",
    vegano: false,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: "Gelatina de vino ",
    descripcion: " con frutas en cubo (sin alcohol para eventos familiares)",
    precio: 0.8,
    tipo: "Dulce",
    vegano: true,
    sinGluten: true,
    formato: "uni",
  },
  {
    nombre: "Mini empanadas de morocho",
    descripcion: "Con queso o carne ",
    precio: 0.95,
    tipo: "Salado",
    vegano: false,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: "Mini tamales veganos",
    descripcion: "Maíz tierno con hongos y frutos secos",
    precio: 1.2,
    tipo: "Salado",
    vegano: true,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: "Canastitas de yuca rellenas",
    descripcion: "Pollo, vegetales o champiñón",
    precio: 0.9,
    tipo: "Salado",
    vegano: false,
    sinGluten: true,
    formato: "uni",
  },
  {
    nombre: "Tostaditas con trucha ahumada",
    descripcion: "Con crema de aguacate y cebolla morada.",
    precio: 2.8,
    tipo: "Premium",
    vegano: false,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: "Mini croquetas ",
    descripcion: "jamón serrano o champiñones, doradas y cremosas.",
    precio: 1.8,
    tipo: "Premium",
    vegano: false,
    sinGluten: false,
    formato: "pac",
  },
  {
    nombre: "Quiches",
    descripcion: " espinaca ,queso y tocino ",
    precio: 1.25,
    tipo: "Premium",
    vegano: false,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: "Palitos de yuca",
    descripcion: "Con crema de aguacate y cebolla morada.",
    precio: 1.2,
    tipo: "Salado",
    vegano: true,
    sinGluten: true,
    formato: "pac",
  },
  {
    nombre: "Palitos de verde",
    descripcion: "Con crema de aguacate y mayonesa.",
    precio: 1.2,
    tipo: "Salado",
    vegano: false,
    sinGluten: true,
    formato: "pac",
  },
  {
    nombre: "ceviche tropical",
    descripcion: "Porciones individuales de ceviche de camarón o mango con aguacate, cebolla morada y toques de limón y cilantro.",
    precio: 1.5,
    tipo: "Salado",
    vegano: false,
    sinGluten: true,
    formato: "uni",
  },
  {
    nombre: "Tartaleta de pollo al curry",
    descripcion: "Mini tartaletas de masa crujiente rellenas con pollo desmenuzado en salsa cremosa de curry, con topping de cebollín.",
    precio: 0.95,
    tipo: "Salado",
    vegano: false,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: "Volovanes",
    descripcion: "Delicadas piezas de hojaldre rellenas con una mezcla tibia de queso brie y una reducción de tomate confitado.",
    precio: 1.25,
    tipo: "Premium",
    vegano: false,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: " Brochetitas caprese",
    descripcion: "Pinchos con bolitas de mozzarella, tomatitos cherry y albahaca fresca, bañados en reducción balsámica.",
    precio: 0.45,
    tipo: "Premium",
    vegano: true,
    sinGluten: true,
    formato: "uni",
  },
  {
    nombre: " Galletas chips",
    descripcion: "galleta de vainilla con chips de chocolate",
    precio: 0.45,
    tipo: "Dulce",
    vegano: false,
    sinGluten: false,
    formato: "pac",
  },
  {
    nombre: "Cheesecakes de Fresa",
    descripcion: "Cheesecakes de Fresa",
    precio: 1.25,
    tipo: "Dulce",
    vegano: false,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: " Mini Tartaletas",
    descripcion: "Pequeñas tartaletas con masa crocante y relleno de crema de limón dulce y ácida que refresca el paladar.",
    precio: 0.75,
    tipo: "Dulce",
    vegano: true,
    sinGluten: false,
    formato: "uni",
  },
  {
    nombre: " Galletas de Avena",
    descripcion: "Pequeñas tartaletas con masa crocante y relleno de crema de limón dulce y ácida que refresca el paladar.",
    precio: 0.75,
    tipo: "Dulce",
    vegano: true,
    sinGluten: false,
    formato: "pac",
  },
];


const precios = bocaditos.map(b => b.precio);
const precioMin = Math.floor(Math.min(...precios));
const precioMax = Math.ceil(Math.max(...precios));

export default function App() {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState(precioMax);
  const [filtroTipos, setFiltroTipos] = useState([]);
  const [filtroVegano, setFiltroVegano] = useState(false);
  const [filtroSinGluten, setFiltroSinGluten] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
const [fechaEntrega, setFechaEntrega] = useState("");
const [nombreCliente, setNombreCliente] = useState("");
const [telefonoCliente, setTelefonoCliente] = useState("");
const [horaEntrega, setHoraEntrega] = useState("");
const [mensajeEstado, setMensajeEstado] = useState("");
  const tiposUnicos = [...new Set(bocaditos.map(b => b.tipo))];
const [cargando, setCargando] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
const [ordesrealisdas, setordesrealisdas] = useState(false)




  const toggleTipo = (tipo) => {
    setFiltroTipos((prev) =>
      prev.includes(tipo) ? prev.filter(t => t !== tipo) : [...prev, tipo]
    );
  };

  const handleSeleccionar = (bocadito) => {
    const yaEsta = seleccionados.find(b => b.nombre === bocadito.nombre);
    if (!yaEsta) {
      setSeleccionados([...seleccionados, { ...bocadito, cantidad: 1 }]);
    }
  };

  const handleEliminar = (nombre) => {
    setSeleccionados(seleccionados.filter(b => b.nombre !== nombre));
  };

const handleCantidad = (nombre, nuevaCantidad) => {
  setSeleccionados(
    seleccionados.map(b =>
      b.nombre === nombre
        ? { ...b, cantidad: nuevaCantidad === "" ? "" : Number(nuevaCantidad) }
        : b
    )
  );
};


  const bocaditosFiltrados = bocaditos.filter(b => {
    const nombreMatch = b.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const precioMatch = b.precio <= filtroPrecio;
    const tipoMatch = filtroTipos.length === 0 || filtroTipos.includes(b.tipo);
    const veganoMatch = filtroVegano ? b.vegano : true;
    const glutenMatch = filtroSinGluten ? b.sinGluten : true;
    return nombreMatch && precioMatch && tipoMatch && veganoMatch && glutenMatch;
  });

const total = seleccionados.reduce((acc, item) => {
  const cantidad = parseInt(item.cantidad);
  return acc + (isNaN(cantidad) ? 0 : item.precio * cantidad);
}, 0);



const idPersonalizado = `${nombreCliente.replace(/\s+/g, "_")}_${Date.now()}`;



const guardarOrden = async () => {
  if (!nombreCliente || !telefonoCliente || !fechaEntrega || !horaEntrega || seleccionados.length === 0) {
    setMensajeEstado("⚠️ Faltan datos por completar.");
    return;
  }

  setCargando(true);
  setMensajeEstado("");

  const orden = {
    cliente: {
      nombre: nombreCliente,
      telefono: telefonoCliente
    },
    entrega: {
      fecha: fechaEntrega,
      hora: horaEntrega
    },
    items: seleccionados,
    total,
     realizada: false,
    fechaRegistro: Timestamp.now(),
     id: idPersonalizado
  };

  try {
   await setDoc(doc(db, "ordenes", idPersonalizado), orden);
      setMensajeEstado(""); // limpia mensaje texto


    // ✅ Guardar en localStorage sin borrar las anteriores
    const ordenesGuardadas = JSON.parse(localStorage.getItem("Ordenes")) || [];
    ordenesGuardadas.push(orden);
    localStorage.setItem("Ordenes", JSON.stringify(ordenesGuardadas));


      setModalVisible(true); // muestra modal
    // Limpiar campos
    setSeleccionados([]);
    setFechaEntrega("");
    setHoraEntrega("");
    setNombreCliente("");
    setTelefonoCliente("");
  } catch (error) {
    console.error("Error al guardar:", error);
    setMensajeEstado("❌ Error al guardar la orden.");
  } finally {
    setCargando(false);
  }
};




/*odenes realisadsa*/
const ordebnesrelisa = ()=>{
  setordesrealisdas(!ordesrealisdas);
}




const [busqueda, setBusqueda] = useState("");

const [ordenesGuardadas, setOrdenesGuardadas] = useState([]);

useEffect(() => {
  const ordeneslo = JSON.parse(localStorage.getItem("Ordenes")) || [];
  setOrdenesGuardadas(ordeneslo);
}, [modalVisible]); // se actualiza cuando se crea una nueva orden



const manejarelido = async({index,odeid}) => {
  const nuevasOrdenes = [...ordenesGuardadas];
  nuevasOrdenes[index].realizada = !nuevasOrdenes[index].realizada;

  // Actualiza localStorage y estado
  localStorage.setItem("Ordenes", JSON.stringify(nuevasOrdenes));
  setOrdenesGuardadas(nuevasOrdenes);


  //actuisefirebse
  await updateDoc(doc(db, "ordenes", odeid), {
  realizada: true
});

};






const borrarLocalStorage = () => {
  localStorage.removeItem("Ordenes");
  setOrdenesGuardadas([]); // limpia el estado también
};



/*estmoisbien*/
/*piueb1*/
  return (
    <div className="container">
     


      <section className="HEDERT">
      <h1 className="titlehee">Catering Leon</h1>
<button className="btnordenes" onClick={() => ordebnesrelisa()}>  {ordesrealisdas
?
<p>
 Crear Órdenes
</p>  
:
<p>
 Ver Órdenes
</p>  
  } 
  </button>
      </section>
      





{ordesrealisdas?


<>
<section className="historial-ordenes">
  <h2>📜 Historial de órdenes guardadas</h2>
  {ordenesGuardadas.length === 0 ? (
    <p className="nohaynda"  >No hay órdenes guardadas </p>
  ) : (
   
 <>
 
  <input
  type="text"
  placeholder="Buscar por nombre o teléfono..."
  value={busqueda}
  onChange={(e) => setBusqueda(e.target.value)}
  className="input-busqueda"
/>

  <ul className="lista-historial">
      {ordenesGuardadas
        .filter((orden) =>
          orden.cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          orden.cliente.telefono.toLowerCase().includes(busqueda.toLowerCase())
        )
        .map((orden, index) => (
          <li key={index} className={orden.realizada ? "orden-itemacti" : "orden-item"}>
            <h4>Orden #{index + 1}</h4>
            <p><strong>Cliente:</strong> {orden.cliente.nombre}</p>
            <p><strong>Teléfono:</strong> {orden.cliente.telefono}</p>
            <p><strong>Entrega:</strong> {orden.entrega.fecha} a las {orden.entrega.hora}</p>
            <p><strong>Total:</strong> ${orden.total.toFixed(2)}</p>

            <ul className="conteproctp">
              {orden.items.map((item, i) => (
                <li key={i}>{item.nombre} x {item.cantidad}</li>
              ))}
            </ul>

            {orden.realizada ? (
              "¡Felicidades! Orden entregada ✅"
            ) : (
              <button className="btnentregso"    onClick={() => manejarelido({ index, odeid: orden.id })}>
                Marcar como realizada
              </button>
            )}
          </li>
        ))}
    </ul>
 </>
   
 
 







)
  


  }
</section>





</>


:

<>




      <section className="filtros">
       
        <div className="filtro-item">
          <label htmlFor="buscar-nombre">Buscar por nombre:</label>
          <input
            id="buscar-nombre"
            type="text"
            placeholder="Ej: tamales, brownie..."
            value={filtroNombre}
            onChange={e => setFiltroNombre(e.target.value)}
            className="input-text"
          />
        </div>

        <div className="filtro-item">
          <label htmlFor="rango-precio">Precio máximo: ${filtroPrecio.toFixed(2)}</label>
          <input
            type="range"
            id="rango-precio"
            min={precioMin}
            max={precioMax}
            step="0.1"
            value={filtroPrecio}
            onChange={e => setFiltroPrecio(Number(e.target.value))}
            className="input-range"
          />
        </div>

        <div className="filtro-item filtro-checkboxes">
          <label>Tipo:</label>
          {tiposUnicos.map(tipo => (
            <label key={tipo} className="checkbox-label">
              <input
                type="checkbox"
                checked={filtroTipos.includes(tipo)}
                onChange={() => toggleTipo(tipo)}
              />
              {tipo}
            </label>
          ))}
        </div>

        <div className="filtro-item filtro-checkboxes">
          <label>Etiquetas:</label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filtroVegano}
              onChange={() => setFiltroVegano(!filtroVegano)}
            />
            Vegano
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filtroSinGluten}
              onChange={() => setFiltroSinGluten(!filtroSinGluten)}
            />
            Sin Gluten
          </label>
        </div>
    
    
    
      </section>



      <section className="bocaditos-list">
        {bocaditosFiltrados.length === 0 ? (
          <p className="sin-resultados">No se encontraron bocaditos con esos filtros.</p>
        ) :
         (
          
          
          bocaditosFiltrados.map((bocadito, index) => {
            const yaSeleccionado = seleccionados.find(b => b.nombre === bocadito.nombre);
            return (
              <div
                className={`bocaditocard ${yaSeleccionado ? "seleccionado" : ""}`}
                key={index}
                onClick={() => handleSeleccionar(bocadito)}
                title="Haz clic para seleccionar"
              >
                <h2 className="bocadito-nombre">
                  {bocadito.nombre}
                  {yaSeleccionado && <span className="badge">✓ Seleccionado</span>}
                </h2>
                <p className="bocadito-descripcion">{bocadito.descripcion}</p>
                <p className="bocadito-precio">${bocadito.precio.toFixed(2)} x  {bocadito.formato} </p>
                <p className="bocadito-detalles">
                  Tipo: <span>{bocadito.tipo}</span> |{" "}
                  {bocadito.vegano && <span className="tag vegano">Vegano</span>}
                  {!bocadito.vegano && <span className="tag no-vegano">No Vegano</span>}
                  {" | "}
                  {bocadito.sinGluten ? (
                    <span className="tag sin-gluten">Sin Gluten</span>
                  ) : (
                    <span className="tag con-gluten">Con Gluten</span>
                  )}
                </p>
              </div>
            );
          })
        )
        }
      </section>

      {seleccionados.length > 0 && (
        <section className="seleccionados">
          <h2  className="tituloselcinados"    >🛒ingredientes Seleccionados</h2>
         
         
          <ul className="listadeselcinaods" >
            {seleccionados.map((item, idx) => (
              <li key={idx} className="seleccionado-item">
                <span>
                  {item.nombre} - ${item.precio.toFixed(2)} x{" "}
         
         
           <input
  type="text"
  pattern="[0-9]*"
  inputMode="numeric"
  value={item.cantidad}
  onChange={(e) => handleCantidad(item.nombre, e.target.value)}
  className="cantidad-input"
/>

<p>
  El total de {item.cantidad} {item.nombre} es ${ (item.cantidad * item.precio).toFixed(2) }
</p>

                </span>
                <button onClick={() => handleEliminar(item.nombre)}>❌</button>
              </li>
            ))}
          </ul>



  <p className="total">
            Total a pagar: <strong>${total.toFixed(2)}</strong>
          </p>

<section className="datos-cliente">
  <h3  className="tuilifecas"   >📋 Datos del Cliente</h3>
  <input
    type="text"
    placeholder="Nombre completo"
    className="imptnobre"
    value={nombreCliente}
    onChange={(e) => setNombreCliente(e.target.value)}
  />
  <input
    type="tel"
    placeholder="Teléfono"
    value={telefonoCliente}
    onChange={(e) => setTelefonoCliente(e.target.value)}
  />

<p className="tuilifecas">📅 Fecha de entrega:</p>
<div className="fechaentrega">
 
      
         <input
    type="date"
    id="fecha-entrega"
    value={fechaEntrega}
    onChange={(e) => setFechaEntrega(e.target.value)}
    min={new Date().toISOString().split("T")[0]} // fecha mínima hoy
    className="input-fecha"
  />

  <input
    type="time"
    value={horaEntrega}
    onChange={(e) => setHoraEntrega(e.target.value)}
  />

          {fechaEntrega && horaEntrega &&  (
  <p className="fecha-mostrada"> 
    Entrega programada para: <strong>{fechaEntrega}</strong> <strong>{horaEntrega}</strong>
  </p>
)}
</div>


{cargando && <div className="spinner"></div>}


  <button className="btn-guardar" onClick={guardarOrden}>
  💾 Guardar orden
</button>




</section>







      
      
        </section>
      )}








</>


}



















{modalVisible && (
  <div className="modal-overlay" onClick={() => setModalVisible(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <h2>✅ ¡Orden creada con éxito!</h2>
      <button onClick={() => setModalVisible(false)} className="btn-cerrar">
        Cerrar
      </button>
    </div>
  </div>
)}


    </div>
  );
}

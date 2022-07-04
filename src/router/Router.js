import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Inicio from "../views/Inicio";
import ArticulosRegistrados from "../views/Articulos/Articulos_registrados";
import ArticulosRegistrar from "../views/Articulos/registrar_articulos";
import SubCategorias from "../views/Articulos/subcategorias";
import PlandeCuentas from "../views/Articulos/plan_cuentas";
import TipoCategorias from "../views/Articulos/tipo_categorias";
import Categorias from "../views/Articulos/categorias";
import Almacen from "../views/Almacen/almacenes";
import TipoAlmacen from "../views/Almacen/tipo_almacen";
import UbicacionAlmacen from "../views/Almacen/ubicacion_almacen";
import Compras from "../views/Compras/gestion_compras";
import Importaciones from "../views/Compras/importacion";
import Proveedores from "../views/Compras/proveedores";
import TipoProveedores from "../views/Compras/tipo_proveedor";
import ControlInventario from "../views/Inventario/control_inventario";
import Colores from "../views/Inventario/colores";
import Unidades from "../views/Inventario/unidades";
import Paises from "../views/Configuracion/paises";
import Ciudades from "../views/Configuracion/ciudades";
import Usuarios from "../views/Usuarios/usuarios";
import Perfiles from "../views/Usuarios/perfiles";
import Permisos from "../views/Usuarios/permisos";
import Page404 from "../components/page404";
import Exitoso from "../views/Articulos/registroexitoso";
import ArticulosEditar from "../views/Articulos/articulos_editar";
import ArticuloActualizado from "../views/Articulos/ArtActualizado";
import DetallesCompras from "../views/Compras/detallescompras";
import ReportCompra from "../views/Compras/reportcompra";
import DetallesControl from "../views/Inventario/detallescontrol";
import InventarioDetalles from "../views/Inventario/inventariodetalles";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Page404 />}/>
          <Route path="usuarios/permisos" element={<Permisos />}/>
          <Route path="usuarios/perfiles" element={<Perfiles/>} />
          <Route path="/usuarios" element={<Usuarios/>} />
          <Route path="/ciudades" element={<Ciudades/>}/>
          <Route path="/paises" element={<Paises/>} />
          <Route path="/inventario/colores" element={<Colores/>} />
          <Route path="/inventario/unidades" element={<Unidades />}/>
          <Route path="/inventario/control/detalles/:idcontrol" element={<InventarioDetalles/>} />
          <Route path="/inventario/control/:id" element={<DetallesControl/>} />
          <Route path="/inventario" element={<ControlInventario/>} />
          <Route path="/compras/report/:idcompra" element={<ReportCompra/>} />
          <Route path="/compras/tipoproveedores" element={<TipoProveedores/>} />
          <Route path="/compras/proveedores" element={<Proveedores />}/>
          <Route path="/compras/importaciones" element={<Importaciones/>} />
          <Route path="/compras/detalles/:idcompra" element={<DetallesCompras/>} />
          <Route path="/compras" element={<Compras/>} />
          <Route path="/almacen/ubicacionalmacen" element={<UbicacionAlmacen/>} />
          <Route path="/almacen/tipoalmacen" element={<TipoAlmacen />}/>
          <Route path="/almacen" element={<Almacen/>} />
          <Route path="/articulos/actualizado" element={<ArticuloActualizado/>} />
          <Route path="/articulos/editar/:idart" element={<ArticulosEditar/>} />
          <Route path="/articulos/exitoso" element={<Exitoso/>} />
          <Route path="/articulos/tipocategorias" element={<TipoCategorias/>} />
          <Route path="/articulos/plandecuentas" element={<PlandeCuentas/>} />
          <Route path="/articulos/subcategorias" element={<SubCategorias/>} />
          <Route path="/articulos/categorias" element={<Categorias />}/>
          <Route path="/articulos/registrar" element={<ArticulosRegistrar />}/>
          <Route path="/articulos" element={<ArticulosRegistrados/>}/>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;

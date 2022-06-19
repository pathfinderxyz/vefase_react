import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import Cargando from "../../components/cargando";
import { Link } from "react-router-dom";

const url = "https://api.vefase.com/public/articulos";

const  ArticulosRegistrados= () => {

  //////////////Iniciando Status data//////////////////////////
  const [data, setData] = useState([]);


  /////////////////Datatable/////////////////////////////////

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const [pending, setPending] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(data);
      setPending(false);
    }, 100);
    return () => clearTimeout(timeout);
  });

  const columns = [
  
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
    },
    {
      name: 'Nombre corto',
      selector: (row) => row.nombrecorto,
    },
    {
      name: 'Modelo',
      selector: (row) => row.modelo,
    },
   
    {
      name: 'Categorias',
      selector: (row) => row.categoria,
    },
    {
      name: 'Tipo de categorias',
      selector: (row) => row.tipocategoria,
    },
    {
      name: 'Subcategoria',
      selector: (row) => row.subcategoria,
    },
    {
      name: 'Accion',
      button: true,
      cell: (row) =>
        <Link className="btn btn-dark"  to={"/articulos/editar/"+row.id}>
          <FaIcons.FaPencilAlt />
        </Link>
    }
  ];
  /////////////Buscar datos//////////////////////////////////
  const [buscar, setBuscar] = useState("");
  const [filtrobuscar, setFiltroBuscar] = useState([]);

  useEffect(() => {
    const result = data.filter((resultdata) => {
      return resultdata.nombre.toLowerCase().match(buscar.toLowerCase());
    });
    setFiltroBuscar(result);
  }, [buscar, data]);

  /////////////Mostrar datos//////////////////////////////////
  const peticionGet = async () => {
    await axios.get(url).then(response => {
      console.log(response.data);
      setData(response.data);
      setFiltroBuscar(response.data);
      console.log(response.data);
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGet();
  }, []);


  /////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="ArticulosRegistrados">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                Articulos
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <Link type="button" className="btn btn-success" to="/articulos/registrar">
                      <i className="ti-plus"></i> Registrar articulos
                    </Link>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Articulos Registrados</Card.Title>
            
              <p> Articulos Registrados en el sistema.</p>
              <DataTable
                columns={columns}
                data={filtrobuscar}
                progressPending={pending}
                progressComponent={<Cargando />}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    placeholder="Buscar"
                    className="w-25 form-control"
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                  />
                }
              />

            {/*   <Modal isOpen={modalInsertar}>
                <ModalHeader>
                  <div>
                    <h4>Insertar Subcategorias</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label>Subcategoria</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      required=""
                      onChange={handleChange}
                    />
                    <br /><br />

                    <label>Categorias</label>
                    <select className='form-control' name='idcategoria' id="setcategoria" onClick={() => peticionGettc()}
                    onChange={handleChange}>
                      <option value={0}>Seleccione una opcion</option>
                      {
                        datacategorias.map(categorias => (
                          <option value={categorias.id}>{categorias.nombre} </option>
                        ))

                      }
                      
                    </select>
              
                  <br/> <br/> <br/>
                  <label>Tipo de categorias</label>
                    <select className='form-control' name='idtipocategorias' id="settipocategorias" onChange={handleChange}>
                      <option value={0}>Seleccione una opcion</option>
                      {
                        dataTipocategorias.map(talmacen => (
                          <option value={talmacen.id}>{talmacen.nombre} </option>
                        ))
                      }
                    </select>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    className="btn btn-dark"
                    onClick={() => setModalInsertar(false)}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success"
                    onClick={() => peticionPost()}>
                    Insertar
                  </button>

                </ModalFooter>
              </Modal> */}

              {/* <Modal isOpen={modalEditar}>
                <ModalHeader>
                  <div>
                    <h4>Editar Subcategoria</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <input
                      className="form-control" readOnly
                      type="hidden"
                      name="id"
                      value={datosSeleccionados.id}
                      onChange={handleChange}
                    />


                    <label>Subcategoria</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      value={datosSeleccionados.nombre}
                      onChange={handleChange}

                    />
                    <br /><br />

                    <label>Categorias</label>
                    <select className='form-control' value={datosSeleccionados.idcategoria} name='idcategoria' 
                    id="setcategoria" onClick={() => peticionGettc()} onChange={handleChange}>
                      {
                        datacategorias.map(categorias => (
                          <option value={categorias.id}>{categorias.nombre} </option>
                        ))

                      }
                    </select>

                    <br/> <br/>
                  <label>Tipo de categorias</label>
                    <select className='form-control' value={dataTipocategorias.id} name='idtipocategorias' 
                    id="settipocategorias"  onChange={handleChange}>
                         <option value={datosSeleccionados.idtipocategorias}>{datosSeleccionados.tipocategorias} </option>
                      {
                        dataTipocategorias.map(tcategorias => (
                          <option value={tcategorias.id}>{tcategorias.nombre} </option>
                        ))
                      }
                    </select>
                    <br/><br/>
                    <label>Status</label>
                    <select className='form-control' value={datosSeleccionados.status} name='status' id="setstatus" onChange={handleChange}>
                      <option value={'ACTIVO'}>ACTIVO</option>
                      <option value={'INACTIVO'}>INACTIVO</option>
                    </select>


                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    className="btn btn-dark"
                    onClick={() => setModalEditar(false)}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={() => peticionPut()}>
                    Actualizar
                  </button>
                </ModalFooter>
              </Modal> */}
            </Card.Body>
          </Card>
        </Sidebar>
      </div>
    </div>
  );
};

export default ArticulosRegistrados;
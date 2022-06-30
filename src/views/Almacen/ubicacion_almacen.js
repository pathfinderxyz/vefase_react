import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import Cargando from "../../components/cargando";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const url = "https://api.vefase.com/public/almacen/ubicacion";
const urlalmacen = "https://api.vefase.com/public/almacen";
const urltipoalmacen = "https://api.vefase.com/public/almacen/tipo/mostrar";

const UbicacionAlmacen = () => {

  //////////////Iniciando Status data//////////////////////////
  const [data, setData] = useState([]);

  const [datosSeleccionados, setDatosSeleccionados] = useState({
    id: '',
    nombre: '',
    idalmacen: '',
    almacen: '',
    idtipoalmacen: '',
    tipoalmacen: '',
    status: ''
  });

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
      name: 'Id',
      selector: (row) => row.id,
      defaultSortAsc: true,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
    },
    {
      name: 'Almacen',
      selector: (row) => row.almacen,
    },
    {
      name: 'Tipo de almacen',
      selector: (row) => row.tipoalmacen,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
    },
    {
      name: 'Accion',
      button: true,
      cell: (row) =>
        <button className="btn btn-dark"
          onClick={() => { setDatosSeleccionados(row); abrirModalEditar() }} >
          <FaIcons.FaPencilAlt />
        </button>,
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


  ///////////////Insertar Datos//////////////////////////////////
  const [modalInsertar, setModalInsertar] = useState(false);
  const abrirModalInsertar = () => {
    setDatosSeleccionados("");
    setModalInsertar(true);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setDatosSeleccionados(prevState => ({
      ...prevState,
      [name]: value
    }))

  }

  const [Error, setError] = useState(false);

  const peticionPost = async () => {
    delete datosSeleccionados.id;
    console.log(datosSeleccionados);
    await axios.post(url, datosSeleccionados).then(res => {
      peticionGet();
      setError(false);
      setModalInsertar(false);
    })
      .catch((err) => {
        setError(true);
        setModalInsertar(false);
      })
  }

  //////////////Editar datos/////////////////////////////////////
  const [modalEditar, setModalEditar] = useState(false);
  const abrirModalEditar = () => {
    console.log(datosSeleccionados);
    setModalEditar(true);
  }

  const peticionPut = async () => {
    console.log(datosSeleccionados);
    // eslint-disable-next-line no-template-curly-in-string
    await axios.put(url + '/' + datosSeleccionados.id, datosSeleccionados).then(response => {
      peticionGet();
      setError(false);
      setModalEditar(false);
    })
      .catch((err) => {
        setError(true);
        setModalEditar(false);
      })
  }
  /////////////select almacen//////////////////////////////////
  const [dataAlmacen, setDataalmacen] = useState([]);

  const peticionGetalmacen = async () => {
    await axios.get(urlalmacen).then(response => {
      setDataalmacen(response.data);
      console.log(dataAlmacen);
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetalmacen();
    // eslint-disable-next-line 
  }, []);

  //////////////select tipo almacen///////////////////////////
  const [dataTipoAlmacen, setDatatipoalmacen] = useState([]);

  const peticionGetta = () => {
    axios.get(urltipoalmacen+ '/' + datosSeleccionados.idalmacen).then(response => {
      setDatatipoalmacen(response.data);
      console.log(response.data);
    })
  }

  /////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="UbicacionAlmacen">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                  Ubicacion de Almacenes
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <button type="button" className="btn btn-warning text-dark" onClick={() => abrirModalInsertar()}>
                    <FaIcons.FaPlus/> Añadir ubicacion de Almacen
                    </button>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Ubicaciones de Almacenes registrados</Card.Title>
              {
                Error &&
                <div className="alert alert-danger">
                  {<strong>Error: El nombre ya existe! intente con otro nombre.</strong>}
                </div>
              }
              <p>Ubicaciones de Almacenes registrados en el sistema.</p>
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

              <Modal isOpen={modalInsertar}>
                <ModalHeader>
                  <div>
                    <h4>Insertar Ubicacion de Almacen</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label>Ubicacion de Almacen</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      required=""
                      onChange={handleChange}
                    />
                    <br /><br />

                    <label>Almacen</label>
                    <select className='form-control' name='idalmacen' id="setalmacen" onClick={() => peticionGetta()}
                    onChange={handleChange}>
                      <option value={0}>Seleccione una opcion</option>
                      {
                        dataAlmacen.map(almacen => (
                          <option value={almacen.id}>{almacen.nombre} </option>
                        ))

                      }
                      
                    </select>
              
                  <br/> <br/> <br/>
                  <label>Tipo de Almacen</label>
                    <select className='form-control' name='idtipoalmacen' id="settipoalmacen" onChange={handleChange}>
                      <option value={0}>Seleccione una opcion</option>
                      {
                        dataTipoAlmacen.map(talmacen => (
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
              </Modal>

              <Modal isOpen={modalEditar}>
                <ModalHeader>
                  <div>
                    <h4>Editar Ubicacion de Almacen</h4>
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


                    <label>Ubicacion de Almacen</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      value={datosSeleccionados.nombre}
                      onChange={handleChange}

                    />
                    <br /><br />

                    <label>Almacen</label>
                    <select className='form-control' value={datosSeleccionados.idalmacen} name='idalmacen' 
                    id="setalmacen" onClick={() => peticionGetta()} onChange={handleChange}>
                      {
                        dataAlmacen.map(almacen => (
                          <option value={almacen.id}>{almacen.nombre} </option>
                        ))

                      }
                    </select>

                    <br/> <br/>
                  <label>Tipo de Almacen</label>
                    <select className='form-control' value={dataTipoAlmacen.id} name='idtipoalmacen' 
                    id="settipoalmacen"  onChange={handleChange}>
                         <option value={datosSeleccionados.idtipoalmacen}>{datosSeleccionados.tipoalmacen} </option>
                      {
                        dataTipoAlmacen.map(talmacen => (
                          <option value={talmacen.id}>{talmacen.nombre} </option>
                        ))
                      }
                    </select>
                    <br/><br/>
                    <label>Status</label>
                    <select className='form-control' value={datosSeleccionados.status} name='status' id="setalmacen" onChange={handleChange}>
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
              </Modal>
            </Card.Body>
          </Card>
        </Sidebar>
      </div>
    </div>
  );
};

export default UbicacionAlmacen;
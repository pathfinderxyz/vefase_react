import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import Cargando from "../../components/cargando";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const url = "https://api.vefase.com/public/almacen/tipo";
const urlalmacen = "https://api.vefase.com/public/almacen";

const TipoAlmacen = () => {

  //////////////Iniciando Status data//////////////////////////
  const [data, setData] = useState([]);

  const [datosSeleccionados, setDatosSeleccionados] = useState({
    id: '',
    nombre: '',
    almacen: '',
    status: '',
    idalmacen: ''
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

  const peticionGetPaises = async () => {
    await axios.get(urlalmacen).then(response => {
      setDataalmacen(response.data);
      console.log(response.data);
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetPaises();
    // eslint-disable-next-line 
  }, []);

  /////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="TipoAlmacen">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                  Tipos de Almacenes
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <button type="button" className="btn btn-warning text-dark" onClick={() => abrirModalInsertar()}>
                    <FaIcons.FaPlus/> Añadir Tipo Almacen
                    </button>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Tipos de Almacenes registrados</Card.Title>
              {
                Error &&
                <div className="alert alert-danger">
                  {<strong>Error: El nombre ya existe! intente con otro nombre.</strong>}
                </div>
              }
              <p>Tipos de Almacenes registrados en el sistema.</p>
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
                    <h4>Insertar Tipo de Almacen</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label>tipo de Almacen</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      required=""
                      onChange={handleChange}
                    />
                    <br /><br />

                    <label>Almacen</label>
                    <select className='form-control' name='idalmacen' id="setalmacen" onChange={handleChange}>
                      <option value={0}>Seleccione una opcion</option>
                      {
                        dataAlmacen.map(almacen => (
                          <option value={almacen.id}>{almacen.nombre} </option>
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
                    <h4>Editar Tipos de Almacen</h4>
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


                    <label>Tipo de Almacen</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      value={datosSeleccionados.nombre}
                      onChange={handleChange}

                    />
                    <br /><br />

                    <label>Almacen</label>
                    <select className='form-control' value={datosSeleccionados.idalmacen} name='idalmacen' id="setalmacen" onChange={handleChange}>
                      {
                        dataAlmacen.map(almacen => (
                          <option value={almacen.id}>{almacen.nombre} </option>
                        ))

                      }
                    </select>

                    <br /><br />

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

export default TipoAlmacen;
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import Cargando from "../../components/cargando";
import { Modal, Col, Container, Row, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const url = "https://api.vefase.com/public/importaciones";
const urlpais = "https://api.vefase.com/public/paises";
const urlciudades = "https://api.vefase.com/public/ciudades/pais";

const Importaciones = () => {

  //////////////Iniciando Status data//////////////////////////
  const [data, setData] = useState([]);

  const [datosSeleccionados, setDatosSeleccionados] = useState({
    id: '',
    idcompra: '',
    detalles: '',
    idpais: '',
    pais: '',
    idciudad: '',
    ciudad: ''
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
      name: 'idcompra',
      selector: (row) => row.idcompra,
    },
    {
      name: 'Detalles',
      selector: (row) => row.detalles,
    },
    {
      name: 'Pais',
      selector: (row) => row.pais,
    },
    {
      name: 'Ciudad',
      selector: (row) => row.ciudad,
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
      return resultdata.detalles.toLowerCase().match(buscar.toLowerCase());
    });
    setFiltroBuscar(result);
  }, [buscar, data]);



  /////////////Mostrar datos//////////////////////////////////
  const peticionGet = async () => {
    await axios.get(url).then(response => {
      console.log(response.data);
      setData(response.data);
      setFiltroBuscar(response.data);
     
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGet();
  }, []);
  console.log(data);

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
  
  /////////////select paises//////////////////////////////////
  const [datapaises, setDatapaises] = useState([]);

  const peticionGetpaises = async () => {
    await axios.get(urlpais).then(response => {
      setDatapaises(response.data);
      console.log(datapaises);
      console.log(data);
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetpaises();
    // eslint-disable-next-line 
  }, []);

  //////////////select ciudad///////////////////////////
  const [dataciudad, setDataciudad] = useState([]);

  const peticionGetciudad = () => {
    axios.get(urlciudades + '/' + datosSeleccionados.idpais).then(response => {
      setDataciudad(response.data);
      console.log(response.data);
    })
  }

  /////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="Importaciones ">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                Importaciones 
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <button type="button" className="btn btn-success" onClick={() => abrirModalInsertar()}>
                      <i className="ti-plus"></i> Añadir Importaciones 
                    </button>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Importaciones registradas</Card.Title>
              {
                Error &&
                <div className="alert alert-danger">
                  {<strong>Error: El nombre ya existe! intente con otro nombre.</strong>}
                </div>
              }
              <p> Importaciones registradas en el sistema.</p>
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
                    <h4>Insertar Importaciones</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <Container>
                    <Row>
                      <Col xs={12} md={12}>
                        <div className="form-group">
                          <label>Elegir pais</label>
                          <select className='form-control' name='idpais' id="idpais" onClick={() => peticionGetciudad()}
                            onChange={handleChange}>
                            <option value={0}>Seleccione una opcion</option>
                            {
                              datapaises.map(paises => (
                                <option value={paises.id}>{paises.nombre} </option>
                              ))

                            }

                          </select>
                        </div>
                      </Col>
                      <Col xs={12} md={12}>
                        <div className="form-group">
                          <label>Elegir ciudad</label>
                          <select className='form-control' name='idciudad' id="idciudad" onChange={handleChange}>
                            <option value={0}>Seleccione una opcion</option>
                            {
                              dataciudad.map(ciudades => (
                                <option value={ciudades.id}>{ciudades.nombre} </option>
                              ))
                            }
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Col xs={12} md={12}>
                        <div className="form-group">
                          <label>Detalles de la importacion</label>
                          <input
                            className="form-control"
                            type="text"
                            name="detalles"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                  </Container>
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
                    <h4>Editar Importaciones</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                    <Row>
                    <Col xs={12} md={12}>
                        <div className="form-group">
                          <label>Elegir pais</label>
                          <select className='form-control' value={datosSeleccionados.idpais} name='idpais' id="idpais" 
                          onClick={() => peticionGetciudad()}
                            onChange={handleChange}>
                            {
                              datapaises.map(paises => (
                                <option value={paises.id}>{paises.nombre} </option>
                              ))

                            }

                          </select>
                        </div>
                      </Col>
                      <Col xs={12} md={12}>
                        <div className="form-group">
                          <label>Elegir ciudad</label>
                          <select className='form-control' value={dataciudad.id} name='idciudad' id="idciudad" 
                          onChange={handleChange}>
                            <option value={datosSeleccionados.idciudad}>{datosSeleccionados.ciudad}</option>
                            {
                              dataciudad.map(ciudades => (
                                <option value={ciudades.id}>{ciudades.nombre} </option>
                              ))
                            }
                          </select>
                        </div>
                      </Col>
                      <Col xs={12} md={12}>
                        <div className="form-group">
                          <label>Detalles de la importacion</label>
                          <input
                            className="form-control"
                            type="text"
                            name="detalles"
                            required=""
                            value={datosSeleccionados.detalles}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
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

export default Importaciones;
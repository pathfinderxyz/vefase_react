import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import Cargando from "../../components/cargando";
import { Modal, Col, Container, Row, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import SinPermisos from "./../../components/sinpermisos";

const url = "https://api.vefase.com/public/proveedores";
const urltp = "https://api.vefase.com/public/proveedor/tipo";
const urlpaises = "https://api.vefase.com/public/paises";
const urlciudades = "https://api.vefase.com/public/ciudades/pais";
const urlauth = "https://api.vefase.com/public/permisos/proveedor";

const Proveedores = () => {

  //////////////Datos de Usuario Logueado/////////////////////////
  const [users, setUsers] = useState([]);
  const [permisos, setPermisos] = useState([]);
  

  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem('loginUser')
    if(loginUserJSON){
      const user= JSON.parse(loginUserJSON)
      setUsers(user);
    }
   }, []);
    
   useEffect(() => {
      axios.get(urlauth+'/'+users.id).then(res => {
      if(res.data[0]) {
      setPermisos(res.data[0]);
      }
     });
   }, [users]);


  //////////////Iniciando Status data//////////////////////////
  const [data, setData] = useState([]);

  const [datosSeleccionados, setDatosSeleccionados] = useState({
    id: '',
    nif: '',
    nombre: '',
    representante: '',
    correo: '',
    telefono: '',
    direccion: '',
    idpais: '',
    pais: '',
    idciudad: '',
    ciudad: '',
    idtipo_proveedor: '',
    tipo_proveedor: ''
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
      name: 'Nif',
      selector: (row) => row.nif,
    },
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
    },
    {
      name: 'Representante',
      selector: (row) => row.representante,
    },
    {
      name: 'Correo',
      selector: (row) => row.correo,
    },
    {
      name: 'Telefono',
      selector: (row) => row.telefono,
    },
    {
      name: 'Pais',
      selector: (row) => row.pais,
    },
    {
      name: 'ciudad',
      selector: (row) => row.ciudad,
    },
    {
      name: 'Tipo proveedor',
      selector: (row) => row.tipo_proveedor,
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
   /////////////select tipo_proveedor//////////////////////////////////
   const [datatp, setDatatp] = useState([]);

   const peticionGettp = async () => {
     await axios.get(urltp).then(response => {
       setDatatp(response.data);
       console.log(datatp);
     })
   }
 
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(async () => {
     await peticionGettp();
     // eslint-disable-next-line 
   }, []);
  /////////////select paises//////////////////////////////////
  const [datapaises, setDatapaises] = useState([]);

  const peticionGetpaises = async () => {
    await axios.get(urlpaises).then(response => {
      setDatapaises(response.data);
      console.log(datapaises);
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
  if(permisos.permisos!==undefined){
    if(permisos.permisos){
  return (
    <div>
      <div className="Proveedores">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                  Proveedores
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <button type="button" className="btn btn-warning text-dark" onClick={() => abrirModalInsertar()}>
                    <FaIcons.FaPlus/> Añadir Proveedores
                    </button>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title> Proveedores registrados</Card.Title>
              {
                Error &&
                <div className="alert alert-danger">
                  {<strong>Error: El nombre ya existe! intente con otro nombre.</strong>}
                </div>
              }
              <p> Proveedores registrados en el sistema.</p>
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

              <Modal isOpen={modalInsertar}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"

              >
                <ModalHeader>
                  <div>
                    <h4>Insertar Proveedores</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <Container>
                    <Row>
                      <Col xs={6} md={4}>
                      <div className="form-group">
                          <label>Elegir tipo de proveedor</label>
                          <select className='form-control' name='idtipo_proveedor' id="idtipo_proveedor" onChange={handleChange}>
                            <option value={0}>Seleccione una opcion</option>
                            {
                              datatp.map(tproveedor => (
                                <option value={tproveedor.id}>{tproveedor.nombre} </option>
                              ))

                            }

                          </select>
                        </div>
                      </Col>
                      <Col xs={6} md={4}>
                      <div className="form-group">
                          <label>NIF</label>
                          <input
                            className="form-control"
                            type="text"
                            name="nif"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={6} md={4}>
                      <div className="form-group">
                          <label>Nombre</label>
                          <input
                            className="form-control"
                            type="text"
                            name="nombre"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} md={4}>
                        <div className="form-group">
                          <label>Representante</label>
                          <input
                            className="form-control"
                            type="text"
                            name="representante"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={6} md={4}>
                      <div className="form-group">
                          <label>Correo</label>
                          <input
                            className="form-control"
                            type="text"
                            name="correo"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={6} md={4}>
                      <div className="form-group">
                          <label>Telefono</label>
                          <input
                            className="form-control"
                            type="text"
                            name="telefono"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} md={4}>
                        <div className="form-group">
                          <label>Direccion</label>
                          <input
                            className="form-control"
                            type="text"
                            name="direccion"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={6} md={4}>
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
                      <Col xs={6} md={4}>
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

              <Modal isOpen={modalEditar}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              >
                <ModalHeader>
                  <div>
                    <h4>Editar Proveedores</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                <Row>
                      <Col xs={6} md={4}>
                      <div className="form-group">
                          <label>Elegir tipo de proveedor</label>
                          <select className='form-control' value={datosSeleccionados.idtipo_proveedor} name='idtipo_proveedor' id="idtipo_proveedor" onChange={handleChange}>
                            <option value={0}>Seleccione una opcion</option>
                            {
                              datatp.map(tproveedor => (
                                <option value={tproveedor.id}>{tproveedor.nombre} </option>
                              ))

                            }

                          </select>
                        </div>
                      </Col>
                      <Col xs={6} md={4}>
                      <div className="form-group">
                          <label>NIF</label>
                          <input
                            className="form-control"
                            type="text"
                            name="nif"
                            required=""
                            value={datosSeleccionados.nif}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={6} md={4}>
                      <div className="form-group">
                          <label>Nombre</label>
                          <input
                            className="form-control"
                            type="text"
                            name="nombre"
                            required=""
                            value={datosSeleccionados.nombre}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} md={4}>
                        <div className="form-group">
                          <label>Representante</label>
                          <input
                            className="form-control"
                            type="text"
                            name="representante"
                            required=""
                            value={datosSeleccionados.representante}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={6} md={4}>
                      <div className="form-group">
                          <label>Correo</label>
                          <input
                            className="form-control"
                            type="text"
                            name="correo"
                            required=""
                            value={datosSeleccionados.correo}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={6} md={4}>
                      <div className="form-group">
                          <label>Telefono</label>
                          <input
                            className="form-control"
                            type="text"
                            name="telefono"
                            required=""
                            value={datosSeleccionados.telefono}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} md={4}>
                        <div className="form-group">
                          <label>Direccion</label>
                          <input
                            className="form-control"
                            type="text"
                            name="direccion"
                            required=""
                            value={datosSeleccionados.direccion}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={6} md={4}>
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
                      <Col xs={6} md={4}>
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
                    </Row>

                   {/*  <label>Categorias</label>
                    <select className='form-control' value={datosSeleccionados.idcategoria} name='idcategoria'
                      id="setcategoria" onClick={() => peticionGettc()} onChange={handleChange}>
                      {
                        data.map(categorias => (
                          <option value={categorias.id}>{categorias.nombre} </option>
                        ))

                      }
                    </select>
 */}
                    <br /> <br />
                   {/*  <label>Tipo de categorias</label>
                    <select className='form-control' value={dataTipocategorias.id} name='idtipocategorias'
                      id="settipocategorias" onChange={handleChange}>
                      <option value={datosSeleccionados.idtipocategorias}>{datosSeleccionados.tipocategorias} </option>
                      {
                        dataTipocategorias.map(tcategorias => (
                          <option value={tcategorias.id}>{tcategorias.nombre} </option>
                        ))
                      }
                    </select> */}
                   
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
  );}
  else{
    
return (
  <div>
  <Sidebar>
     <SinPermisos/>
   </Sidebar>  
  </div>
);
  }}
  else{
   
return (
  <div>
  <Sidebar>
     <SinPermisos/>
   </Sidebar>  
  </div>
);
  }
};

export default Proveedores;
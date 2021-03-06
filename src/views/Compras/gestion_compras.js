import React, { useState, useEffect } from "react";
import './../../assets/css/gcmenu.css';
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import Cargando from "../../components/cargando";
import { Modal, Col, Container, Row, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import SinPermisos from "./../../components/sinpermisos";

const url = "https://api.vefase.com/public/compras";
const urlpro = "https://api.vefase.com/public/proveedores";
const urlalmacen = "https://api.vefase.com/public/almacen";
const urlubialmacen = "https://api.vefase.com/public/almacen/xubi";
const urlimporta = "https://api.vefase.com/public/importaciones";
const urlauth = "https://api.vefase.com/public/permisos/compras";


const Compras = () => {

  const navigate = useNavigate();

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
    idproveedor: '',
    proveedor: '',
    fecha: '',
    idtipocompra: '',
    tipocompra: '',
    idimportacion: '',
    detalles: '',
    idusuario: '',
    usuario: '',
    idalmacen: '',
    almacen: '',
    idubicalmacen: '',
    ubicalmacen: '',
    status: ''
  });

  /////////////////Datatable/////////////////////////////////

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por p??gina',
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
      name: 'Accion',
      button: true,
      cell: (row) =>
      <Nav>
 
            <button className="btn btn-default"
               onClick={() => { setDatosSeleccionados(row); abrirModalEditar() }} 
            >
            <FaIcons.FaRegEdit/>
            </button>&nbsp;&nbsp;&nbsp;    
        
            <Link to={"/compras/report/"+row.id} className="mt-2"><FaIcons.FaRegEye/></Link>     
        
             
    
      </Nav>
    },
    {
      name: 'Id',
      selector: (row) => row.id,
      defaultSortAsc: true,
      sortable: true,
    },
    {
      name: 'Proveedor',
      selector: (row) => row.proveedor,
    },
    {
      name: 'Fecha',
      selector: (row) => row.fecha,
    },
    {
      name: 'Tipo de compra',
      selector: (row) => row.tipocompra,
    },
    {
      name: 'Importacion',
      selector: (row) => row.detalles,
    },
    {
      name: 'Usuario',
      selector: (row) => row.usuario,
    },
    {
      name: 'Almacen',
      selector: (row) => row.almacen,
    },
    {
      name: 'Ubicacion almacen',
      selector: (row) => row.ubicalmacen,
    },
    {
      name: 'status',
      selector: (row) =>
      <Badge bg={status[row.status]} text="light">{row.status}</Badge>
    }
   
  ];
  /////////////Buscar datos//////////////////////////////////
  const [buscar, setBuscar] = useState("");
  const [filtrobuscar, setFiltroBuscar] = useState([]);

  useEffect(() => {
    const result = data.filter((resultdata) => {
      return resultdata.status.toLowerCase().match(buscar.toLowerCase());
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

  const validardatos=()=>{
    if (datosSeleccionados.proveedor!==''){
      peticionPost();
    }else{
      setError(true);
    }
  }

  const [Error, setError] = useState(false);

  const peticionPost = async () => {
    delete datosSeleccionados.id;
    console.log(url, datosSeleccionados);
    await axios.post(url, datosSeleccionados).then(resp => {
      setError(false);
      setModalInsertar(false);
      navigate('/compras/detalles/'+(+data[data.length-1].id+1));
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
  /////////////select proveedor//////////////////////////////////
  const [datatp, setDatatp] = useState([]);

  const peticionGettp = async () => {
    await axios.get(urlpro).then(response => {
      setDatatp(response.data);
      console.log(datatp);
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGettp();
    // eslint-disable-next-line 
  }, []);
  /////////////select almacen//////////////////////////////////
  const [dataalmacen, setDataalmacen] = useState([]);

  const peticionGetalmacen = async () => {
    await axios.get(urlalmacen).then(response => {
      setDataalmacen(response.data);
      console.log(dataalmacen);
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetalmacen();
    // eslint-disable-next-line 
  }, []);

  //////////////select ubialmacen///////////////////////////
  const [dataubialma, setDataubialma] = useState([]);

  const peticionGetubialma = () => {
    axios.get(urlubialmacen + '/' + datosSeleccionados.idalmacen).then(response => {
      setDataubialma(response.data);
      console.log(response.data);
    })
  }

   //////////////consultar importacion/////////////////////////////////////
   const [mostrarImport, setMostrarimport] = useState(false);
   const consultarimportacion = () => {
     if(datosSeleccionados.idtipocompra > 1){
      setMostrarimport(true);
     }else{
      setMostrarimport(false);
     } 
   }

  /////////////select importacion//////////////////////////////////
  const [dataimport, setDataimport] = useState([]);

  const peticionGetimport = async () => {
    await axios.get(urlimporta).then(response => {
      setDataimport(response.data);
      console.log(dataimport);
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetimport();
    // eslint-disable-next-line 
  }, []);

  ////////////////badge///////////////////
  
  let status={
    'PENDIENTE':"warning",
    'PROCESADO':"success",
    'REALIZADO':"dark",
    'ELIMINADO':"danger",
  }


  /////////////////////////////////////////////////////////////////
  if(permisos.permisos!==undefined){
    if(permisos.permisos){
  return (
    <div>
      <div className="Compras">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                  Compras
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <button type="button" className="btn btn-warning text-dark" onClick={() => abrirModalInsertar()}>
                        <FaIcons.FaPlus/>  A??adir compras
                    </button>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title> Compras registradas</Card.Title>
              {
                Error &&
                <div className="alert alert-danger">
                  {<strong>Error: Los campos estan vacios!</strong>}
                </div>
              }
              <p> Compras registradas en el sistema.</p>
              <DataTable
                columns={columns}
                data={filtrobuscar}
                noDataComponent="No hay datos registrados en estos momentos"
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
                    <h4>Insertar Compras</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <Container>
                    <Row>
                      <Col xs={6} md={6}>
                        <div className="form-group">
                          <label>Elegir proveedor</label>
                          <select className='form-control' name='idproveedor' id="idproveedor" onChange={handleChange}>
                            <option value={0}>Seleccione una opcion</option>
                            {
                              datatp.map(proveedor => (
                                <option value={proveedor.id}>{proveedor.nombre} </option>
                              ))

                            }

                          </select>
                        </div>
                      </Col>
                      <Col xs={6} md={6}>
                        <div className="form-group">
                          <label>Fecha</label>
                          <input
                            className="form-control"
                            type="date"
                            name="fecha"
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </Col>

                    </Row>
                    <Row>
                      <Col xs={6} md={6}>
                        <div className="form-group">
                          <label>Tipo de compra</label>
                          <select className='form-control' name='idtipocompra' id="idtipocompra"
                            onChange={handleChange} onClick={() => consultarimportacion()}>
                            <option value={0}>Seleccione una opcion</option>
                            <option value={1}>NACIONAL</option>
                            <option value={2} >IMPORTADA</option>
                          </select>
                        </div>
                      </Col>
                      <Col xs={6} md={6}>
                        {
                          mostrarImport &&
                         <div className="form-group">
                          <label>Elegir importacion</label>
                          <select className='form-control' name='idimportacion' id="idimportacion" onChange={handleChange}>
                            <option value={0}>Seleccione una opcion</option>
                            {
                              dataimport.map(dimport => (
                                <option value={dimport.id}>{dimport.detalles} </option>
                              ))

                            }

                          </select>
                        </div>
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} md={6}>
                        <div className="form-group">
                          <label>Elegir Almacen</label>
                          <select className='form-control' name='idalmacen' id="idalmacen"
                            onClick={() => peticionGetubialma()} onChange={handleChange}>
                            <option value={0}>Seleccione una opcion</option>
                            {
                              dataalmacen.map(almacen => (
                                <option value={almacen.id}>{almacen.nombre} </option>
                              ))

                            }

                          </select>
                        </div>
                      </Col>
                      <Col xs={6} md={6}>
                        <div className="form-group">
                          <label>Elegir Ubicacion Almacen</label>
                          <select className='form-control' name='idubicalmacen' id="idubicalmacen" onChange={handleChange}>
                            <option value={0}>Seleccione una opcion</option>
                            {
                              dataubialma.map(ubialma => (
                                <option value={ubialma.id}>{ubialma.nombre} </option>
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
                    onClick={() => validardatos()}>
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
                    <h4>Editar Compras</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <Row>
                    <Col xs={6} md={6}>
                      <div className="form-group">
                        <label>Elegir proveedor</label>
                        <select className='form-control' value={datosSeleccionados.idproveedor} name='idproveedor' id="idproveedor" onChange={handleChange}>
                          <option value={0}>Seleccione una opcion</option>
                          {
                            datatp.map(tproveedor => (
                              <option value={tproveedor.id}>{tproveedor.nombre} </option>
                            ))

                          }

                        </select>
                      </div>
                    </Col>
                    <Col xs={6} md={6}>
                      <div className="form-group">
                        <label>Status</label>
                        <select className='form-control' value={datosSeleccionados.status} name='status' id="status" onChange={handleChange}>
                          <option value={'PENDIENTE'}>PENDIENTE</option>
                          <option value={'PROCESADO'}>PROCESADO</option>
                          <option value={'REALIZADO'}>REALIZADO</option>
                          <option value={'ELIMINADO'}>ELIMINADO</option>
                        </select>
                      </div>
                    </Col>

                  </Row>
                  <Row>


                    <Col xs={6} md={6}>
                      <div className="form-group">
                        <label>Elegir Almacen</label>
                        <select className='form-control' value={datosSeleccionados.idalmacen} name='idalmacen' id="idalmacen"
                          onClick={() => peticionGetubialma()} onChange={handleChange}>
                          <option value={0}>Seleccione una opcion</option>
                          {
                            dataalmacen.map(almacen => (
                              <option value={almacen.id}>{almacen.nombre} </option>
                            ))

                          }

                        </select>
                      </div>
                    </Col>
                    <Col xs={6} md={6}>
                      <div className="form-group">
                        <label>Elegir Ubicacion Almacen</label>
                        <select className='form-control' value={datosSeleccionados.idubicalmacen} name='idubicalmacen' id="idubicalmacen" onChange={handleChange}>
                          <option value={datosSeleccionados.idubicalmacen}>{datosSeleccionados.ubicalmacen}</option>
                          {
                            dataubialma.map(ubialma => (
                              <option value={ubialma.id}>{ubialma.nombre} </option>
                            ))
                          }
                        </select>
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
  );}else{
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

export default Compras;
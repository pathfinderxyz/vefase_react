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
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import SinPermisos from "./../../components/sinpermisos";

const url = "https://api.vefase.com/public/inventario/control";
const urlcompra = "https://api.vefase.com/public/compras";
const urlauth = "https://api.vefase.com/public/permisos/ginventario";


const ControlInventario = () => {

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
    fecha: '',
    lote: '',
    contenedor: '',
    idcompra: '',
    id_usuario: '',
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
      name: 'Accion',
      button: true,
      cell: (row) =>
        <Link className="btn btn-success" to={"/inventario/control/"+row.id} >
          Inventario
        </Link>
    },
    {
      name: 'Codigo',
      selector: (row) => row.id,
      defaultSortAsc: true,
      sortable: true,
    },
    {
      name: 'Usuario',
      selector: (row) => row.id_usuario,
    },
    {
      name: 'Fecha',
      selector: (row) => row.fecha,
    },
    {
      name: 'Lote',
      selector: (row) => row.lote,
    },
    {
      name: 'Contenedor',
      selector: (row) => row.contenedor,
    },
    {
      name: 'Codigo compra',
      selector: (row) => row.id_compra,
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

  const validardatos = () => {
    if (datosSeleccionados.lote !== '') {
       peticionPost();
    } else {
      setError(true);
    }
  }

  const [Error, setError] = useState(false);

  const peticionPost = async () => {
    delete datosSeleccionados.id;
    await axios.post(url, datosSeleccionados).then(resp => {
      setError(false);
      setModalInsertar(false);
      navigate('/inventario/control/detalles/' + (+data[data.length - 1].id + 1));
    })
      .catch((err) => {
        setError(true);
        setModalInsertar(false);
      })
  }

  /////////////Select Compra//////////////////////////////////
  const [datacompra, setDatacompra] = useState([]);

  const peticionGetcompra = async () => {
    await axios.get(urlcompra).then(response => {
      setDatacompra(response.data);
      console.log(datacompra);
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetcompra();
    // eslint-disable-next-line 
  }, []);


  ////////////////badge///////////////////

  let status = {
    'PENDIENTE': "warning",
    'PROCESADO': "success",
    'REALIZADO': "dark",
    'ELIMINADO': "danger",
  }
  /////////////////////////////////////////////////////////////////

  
if(permisos.permisos!==undefined){
  if(permisos.permisos){
  return (
    <div>
      <div className="ControlInventario">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                  Control de Inventario
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <button type="button" className="btn btn-warning text-dark" onClick={() => abrirModalInsertar()}>
                      <FaIcons.FaPlus />  Añadir nuevo control
                    </button>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Control de Inventario</Card.Title>
              {
                Error &&
                <div className="alert alert-danger">
                  {<strong>Error: Los campos estan vacios!</strong>}
                </div>
              }
              <p> Control de Inventario registrados</p>
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

              <Modal isOpen={modalInsertar}>
                <ModalHeader>
                  <div>
                    <h4>Insertar control de inventario</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <Container>
                    <Row>
                    <Col xs={12} md={12}>
                        <div className="form-group">
                        <label>Lote</label>
                        <input
                          className="form-control"
                          type="text"
                          name="lote"
                          onChange={handleChange}
                        />
                        </div>
                      </Col>
                   
                    <Col xs={12} md={12}>
                      <div className="form-group">
                        <label>Contenedor</label>
                        <input
                          className="form-control"
                          type="text"
                          name="contenedor"
                          required=""
                          onChange={handleChange}
                        />
                      </div>
                    </Col>
                      <Col xs={12} md={12}>
                        <div className="form-group">
                          <label>Selecciona una compra</label>
                          <select className='form-control' name='idcompra' id="id_compra" onChange={handleChange}>
                            <option value={0}>Seleccione una opcion</option>
                           {
                              datacompra.map(compras => (
                                <option value={compras.id}>Compra #{compras.id}-Proveedor {compras.proveedor}</option>
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

export default ControlInventario;
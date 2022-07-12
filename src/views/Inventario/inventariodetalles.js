/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import * as FaIcons from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import { useParams } from "react-router-dom";
import {
  Modal,
  Col,
  Container,
  Row,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

const url = "https://api.vefase.com/public/inventario/detallesxcontrol"; ///////estos son los articulos del inventario ///////
const urlcontroles = "https://api.vefase.com/public/inventario/control"; /////esta es el control unico/////////////
const urlpost = "https://api.vefase.com/public/inventario";
const urlcolores = "https://api.vefase.com/public/colores";
const urlalmacen = "https://api.vefase.com/public/almacen";
const urltipoalmacen = "https://api.vefase.com/public/almacen/tipo/mostrar";
const urlubialmacen = "https://api.vefase.com/public/almacen/tipo/ubicacion";
const urlunidades = "https://api.vefase.com/public/unidades";
const urlartxcompra = "https://api.vefase.com/public/compras/detallesxcompra";
const urldcsuma = "https://api.vefase.com/public/inventario/detalles/sum";

const InventarioDetalles = () => {
  let { idcontrol } = useParams();
  console.log(idcontrol);

  const [data, setData] = useState([]);
  /*  const [Boton, setBoton] = useState(false); */

  /////////////Mostrar datos de los articulos de cada compra//////////////////////////////////
  const peticionGet = async () => {
    await axios.get(url + "/" + idcontrol).then((response) => {
      console.log(response.data);
      setData(response.data);
      console.log(response.data);
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGet();
  }, []);

  /////////////Mostrar datos compras//////////////////////////////////
  const [datacontrol, setDatacontrol] = useState([]);

  const [modalcontrol, setModalcontrol] = useState(false);
  const abrirModalcontrol = () => {
    setModalcontrol(true);
  };

  const peticionGetcontrol = async () => {
    await axios.get(urlcontroles + "/" + idcontrol).then((response) => {
      setDatacontrol(response.data[0]);
    });
  };

  useEffect(async () => {
    await peticionGetcontrol();
  }, []);

  //////////////Recibiendo data de los input//////////////////////////
  const [datosSeleccionados, setDatosSeleccionados] = useState({
    id:'',
    id_articulo:'',
    nombre_articulo:'',
    codigo:'',
    serialc:'',
    color:'',
    idalmacen:'',
    id_tipo_almacen:'',
    ubialmacen:'',
    cant_unidad:'',
    cantidad:'',
    cantidad_total:'',
    stock:'',
    costo:'',
    total:'',
    status:'',
    unidad:'',
    id_control: idcontrol,
  });

  ///////////////Insertar Datos//////////////////////////////////
  const [Error, setError] = useState(false);
  const [Exitoso, setExitoso] = useState(false);

  const handleChanged = e => {
    const { name, value } = e.target;
    setDatosSeleccionados(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const validardatos = () => {
    console.log(datosSeleccionados);
    if (datosSeleccionados.id_articulo > 0) {
      peticionPost();
    } else {
      setError(true);
     setExitoso(false);
    }
};


  const peticionPost = async () => {
    delete datosSeleccionados.id;
    console.log(datosSeleccionados);
    await axios.post(urlpost, datosSeleccionados).then((res) => {
      peticionGet();
      peticionGetSum();
      setExitoso(true);
      setError(false);
    });
  };

  /////////////Eliminar datos//////////////////////////////////
  const [DataDC, setDataDC] = useState([]);

  const [modalEliminar, setModaleliminar] = useState(false);
  const abrirModaleliminar = () => {
    setModaleliminar(true);
  };

  const peticionDelete = () => {
    axios.delete(urlpost+ "/" +DataDC.id).then((response) => {
      setModaleliminar(false);
      peticionGet();
      peticionGetSum();
    });
  };

  //////////////cerrar compra/////////////////////////////////////
  const [modalEditar, setModalEditar] = useState(false);
  const abrirModalEditar = () => {
    console.log(datosSeleccionados);
    setModalEditar(true);
  };

  const peticionPut = async () => {
    await axios.put(urlpost+"/"+datosSeleccionados.id_control).then((response) => {
        peticionGet();
        setModalEditar(false);
      });
  };

  /////////////Mostrar colores//////////////////////////////////
  const [datacolores, setDatacolores] = useState([]);

  const peticionGetColores = async () => {
    await axios.get(urlcolores).then((response) => {
      setDatacolores(response.data);
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetColores();
  }, []);

   /////////////Mostrar unidades//////////////////////////////////
   const [dataunidades, setDataunidades] = useState([]);

   const peticionGetunidades= async () => {
     await axios.get(urlunidades).then((response) => {
       setDataunidades(response.data);
     });
   };
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(async () => {
     await peticionGetunidades();
   }, []);

  /////////////select almacen//////////////////////////////////
  const [dataAlmacen, setDataalmacen] = useState([]);

  const peticionGetalmacen = async () => {
    await axios.get(urlalmacen).then((response) => {
      setDataalmacen(response.data);
      console.log(dataAlmacen);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetalmacen();
    // eslint-disable-next-line
  }, []);

  //////////////select tipo almacen///////////////////////////
  const [dataTalmacen, setDataTalmacen] = useState([]);

  const peticionGetTipoAlmacen = () => {
    if(datosSeleccionados.idalmacen>0){
    console.log(urltipoalmacen+'/'+datosSeleccionados.idalmacen);
    axios.get(urltipoalmacen+'/'+datosSeleccionados.idalmacen).then((response) => {
        setDataTalmacen(response.data);
        console.log(response.data);
      });
    }
  };

  //////////////select ubialmacen///////////////////////////
  const [dataUA, setDataUA] = useState([]);

const peticionGetUA = () => {
  if(datosSeleccionados.id_tipo_almacen>0){
    axios
      .get(urlubialmacen+'/'+datosSeleccionados.id_tipo_almacen)
      .then((response) => {
        setDataUA(response.data);
        console.log(response.data);
      });
    }
  };

  /////////////Mostrar articulos filtro//////////////////////////////////
  const [dataarticulos, setDataarticulos] = useState([]);

 
  const peticionGetart = () => {
    console.log(urlartxcompra+'/'+datacontrol.id_compra);
    if(datacontrol.id_compra>0){
    axios.get(urlartxcompra+'/'+datacontrol.id_compra).then((response) => {
      console.log(response);
      setDataarticulos(response.data);
      
    });
    }
  };


  ///////////////Suma total//////////////////////////////////
  const [dataTotal, setDataTotal] = useState([]);

  const peticionGetSum = async () => {
    await axios.get(urldcsuma + "/" + idcontrol).then((response) => {
      setDataTotal(response.data[0]);
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetSum();
    // eslint-disable-next-line
  }, []);

  ////////////////badge///////////////////

  let status = {
    PENDIENTE: "warning",
    PROCESADO: "success",
    REALIZADO: "primary",
    ELIMINADO: "danger",
  };

  ////////////////////////////////////////////////////////
  if (datacontrol) {
    return (
      <div>
        <div className="InventarioDetalles">
          <Sidebar>
            <Card>
              <Card.Header className="bg-dark text-white" as="h3">
                <div className="row">
                  <div className="col-md-6">
                  Control de inventario #{idcontrol}
                  </div>
                  <div className="col-md-6">
                    <div className="text-right">
                      <button
                        type="button"
                        className="btn btn-warning text-dark"
                        onClick={() => abrirModalcontrol()}
                      >
                        <FaIcons.FaEye /> Ver control
                      </button>
                    </div>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
              <div className="row">
                 <div className="col-md-6">
                 <div className="text-left">
                 <Card.Title>Detalles del control de inventario</Card.Title>
                <p>
                  Introduzca todos los datos de los articulos correspondientes a
                  ese control de inventario</p>
                 </div>
                 </div>
                 <div className="col-md-2"></div>
                 <div className="col-md-4">
                 <div className="text-left">
                 {
                  Error && (
                    <div className="alert alert-danger">
                      {
                        <strong>
                        <FaIcons.FaWindowClose/> ¡Ha ocurrido un error! hay un campo vacio.
                        </strong>
                      }
                    </div>
                  )}
                  {Exitoso && (
                    <div className="alert alert-success">
                      {
                        <strong>
                        <FaIcons.FaCheckCircle/> Exitoso: ¡El articulo ha sido agregado con exito!
                        </strong>
                      }
                    </div>
                  )}
                 </div>
                 </div>
                </div>
                <Card.Text>
                  <Card.Text>
                    <Row>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Codigo</label>
                          <input
                            className="form-control"
                            type="text"
                            name="codigo"
                            onChange={handleChanged}
                          />
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Serial</label>
                          <input
                            className="form-control"
                            type="text"
                            name="serialc"
                            onChange={handleChanged}
                          />
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Color</label>
                          <select
                            className="form-control"
                            name="color"
                            id="color"
                            onChange={handleChanged}
                          >
                            <option value={0}>Seleccionar</option>
                            {datacolores.map((colores) => (
                              <option key={colores.id} value={colores.id}>
                                {colores.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Almacen</label>
                          <select className="form-control" name="idalmacen" id="idalmacen" onChange={handleChanged}
                          onClick={() => peticionGetTipoAlmacen()}>
                            <option value={0}>Seleccionar</option>
                            {dataAlmacen.map((almacen) => (
                              <option key={almacen.id} value={almacen.id}> {almacen.nombre}</option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Tipo de Almacen</label>
                          <select
                            className="form-control"
                            name="id_tipo_almacen"
                            id="id_tipo_almacen"
                            onChange={handleChanged}
                            onClick={() => peticionGetUA()}
                          >
                            <option value={0}>Seleccionar</option>
                            {
                              dataTalmacen.map((talmacen) => (
                              <option key={talmacen.id} value={talmacen.id}> {talmacen.nombre}</option>
                            ))
                            }
                          </select>
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>ubialmacen</label>
                          <select
                            className="form-control"
                            name="ubialmacen"
                            id="ubialmacen"
                            onChange={handleChanged}
                          >
                            <option value={0}>Seleccionar</option>
                            {dataUA.map((ubialmacen) => (
                              <option value={ubialmacen.id}>
                                {ubialmacen.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Unidad</label>
                          <select
                            className="form-control"
                            name="unidad"
                            id="unidad"
                            onChange={handleChanged}
                            onClick={() => peticionGetart()}
                          >
                            <option value={0}>Seleccionar</option>
                            {dataunidades.map((unidades) => (
                              <option key={unidades.id} value={unidades.id}>
                                {unidades.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      <Col xs={4} md={4}>
                        <div className="form-group">
                          <label>Elegir Articulo de la compra#</label>
                          <select
                            className="form-control"
                            name="id_articulo"
                            id="id_articulo"
                            onChange={handleChanged}
                          >
                            <option value={0}>Seleccione una articulo</option>
                            {dataarticulos.map((articulos) => (
                              <option key={articulos.idarticulo} value={articulos.idarticulo}>
                                {articulos.nombre_articulo}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Cantidad x unidad</label>
                          <input
                            className="form-control"
                            type="number"
                            min="0"
                            name="cant_unidad"
                            onChange={handleChanged}
                          />
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Cantidad</label>
                          <input
                            className="form-control"
                            type="number"
                            min="0"
                            name="cantidad"
                            onChange={handleChanged}
                          />
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Costo</label>
                          <input
                            className="form-control"
                            type="number"
                            min="0"
                            name="costo"
                            onChange={handleChanged}
                          />
                        </div>
                      </Col>
                    </Row>
                    <button
                      className="btn btn-success"
                      onClick={() =>  validardatos()}
                    >
                      <FaIcons.FaPlusCircle /> Agregar
                    </button>
                  </Card.Text>
                  <table className="table ">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre articulo</th>
                        <th>Codigo</th>
                        <th>Serial</th>
                        <th>Cantidad x unidad</th>
                        <th>Cantidad</th>
                        <th>Costo</th>
                        <th>Subtotal</th>
                        <th>Status</th>
                        <th>Accion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.sort((a,b)=>b.id-a.id).map((dcompras) => {
                        return (
                          <tr>
                            <td>{dcompras.id}</td>
                            <td>{dcompras.nombre_articulo}</td>
                            <td>{dcompras.codigo}</td>
                            <td>{dcompras.serialc}</td>
                            <td>{dcompras.cant_unidad}</td>
                            <td>{dcompras.cantidad}</td>
                            <td>{dcompras.costo_unidad}</td>
                            <td>{dcompras.total}</td>
                            <td>
                              <Badge bg={status[dcompras.status]} text="light">
                                {dcompras.status}
                              </Badge>{" "}
                            </td>
                            <td>
                              <button
                                type="button"
                                disabled={
                                  dcompras.status == "PROCESADO" ? true : false
                                }
                                className="btn btn-dark"
                                onClick={() => {
                                  setDataDC(dcompras);
                                  abrirModaleliminar();
                                }}
                              >
                                <FaIcons.FaTrash /> Eliminar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <th colspan="6"></th>
                        <th>Total</th>
                        <th>
                          <p>{dataTotal.total}</p>
                        </th>
                        <th></th>
                        <th>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => abrirModalEditar()}
                          >
                            <FaIcons.FaSave /> Guardar
                          </button>
                        </th>
                      </tr>
                    </tbody>
                  </table>

                  <Modal
                    isOpen={modalcontrol}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                  >
                    <ModalHeader>
                      <div>
                        <h4>Informacion del control de inventario</h4>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <Container>
                        <Row>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Codigo</label>
                              <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={datacontrol.id}
                              />
                            </div>
                          </Col>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Codigo compra</label>
                              <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={datacontrol.id_compra}
                              />
                            </div>
                          </Col>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Fecha</label>
                              <input
                                className="form-control"
                                readOnly
                                type="date"
                                value={datacontrol.fecha}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Usuario</label>
                              <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={datacontrol.id_usuario}
                              />
                            </div>
                          </Col>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Lote</label>
                              <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={datacontrol.lote}
                              />
                            </div>
                          </Col>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Contenedor</label>
                              <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={datacontrol.contenedor}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className="btn btn-dark"
                        onClick={() => setModalcontrol(false)}
                      >
                        Cerrar
                      </button>
                    </ModalFooter>
                  </Modal>


                  <Modal isOpen={modalEliminar} centered>
                    <ModalHeader>
                      <div>
                        <h4>
                          Eliminar Articulo
                        </h4>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        ¿Estás seguro que deseas eliminar el articulo <strong>{DataDC.nombre_articulo}</strong> del
                        control de inventario #{DataDC.id_control}?
                      </p>
                      {DataDC.nombre}
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className="btn btn-danger"
                        onClick={() => peticionDelete()}
                      >
                        Eliminar
                      </button>
                      <button
                        className="btn btn-dark"
                        onClick={() => setModaleliminar(false)}
                      >
                        Cerrar
                      </button>
                    </ModalFooter>
                  </Modal>
                  <Modal isOpen={modalEditar} centered>
                    <ModalHeader>
                      <div>
                        <h4>Guardar Control de inventario #{datosSeleccionados.id_control}</h4>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        ¿Estás seguro que desea guardar este control de
                        inventario con los articulos de la lista?
                      </p>
                      {DataDC.nombre}
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className="btn btn-success"
                        onClick={() => peticionPut()}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn btn-dark"
                        onClick={() => setModalEditar(false)}
                      >
                        Cerrar
                      </button>
                    </ModalFooter>
                  </Modal>
                </Card.Text>
              </Card.Body>
            </Card>
          </Sidebar>
        </div>
      </div>
    );
  } else {
    return (
      <Sidebar>
        <Card>
          <Card.Header className="bg-dark text-white" as="h3">
            Detalles del control
          </Card.Header>
          <Card.Body>
            <Card.Title>Este control no existe!</Card.Title>
            <Card.Text>
              Por favor vuelva a la seccion de control de inventario y elija un
              control existente!
            </Card.Text>
          </Card.Body>
        </Card>
      </Sidebar>
    );
  }
};

export default InventarioDetalles;

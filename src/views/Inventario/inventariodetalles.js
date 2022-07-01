/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import * as FaIcons from "react-icons/fa";
import Badge from 'react-bootstrap/Badge';
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
const urlcategorias = "https://api.vefase.com/public/articulos/categorias";
const urltipocategorias =
  "https://api.vefase.com/public/articulos/tipocategorias/";
const urlsubcategorias =
  "https://api.vefase.com/public/articulos/subcategorias/";
const urlartfiltro = "https://api.vefase.com/public/articulos/filtro";
const urldcsuma = "https://api.vefase.com/public/compras/detalles/sum";

const InventarioDetalles= () => {
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
    id: "",
    idcontrol: idcontrol,
    nombre: "",
    cantidad: "",
    costo: "",
    categoria: "",
    idcategoria: "",
    idtipocategoria: "",
    idsubcategoria: "",
    status: "",
    plan_cuentas: "",
  });

  ///////////////Insertar Datos//////////////////////////////////

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosSeleccionados((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionPost = async () => {
    delete datosSeleccionados.id;
    console.log(datosSeleccionados);
    /* await axios.post(urlcontroles, datosSeleccionados).then((res) => {
      peticionGet();
      peticionGetSum();
      console.log(res.status);
    }); */
  };

  /////////////Eliminar datos//////////////////////////////////
  const [DataDC, setDataDC] = useState([]);

  const [modalEliminar, setModaleliminar] = useState(false);
  const abrirModaleliminar = () => {
    setModaleliminar(true);
  };

  const peticionDelete = () => {
    console.log(urlcontroles + "/" + DataDC);
    /* axios.delete(urlcontroles + "/" + DataDC).then((response) => {
      setModaleliminar(false);
      peticionGet();
      peticionGetSum();
    }); */
  };

  //////////////cerrar compra/////////////////////////////////////
  const [modalEditar, setModalEditar] = useState(false);
  const abrirModalEditar = () => {
    console.log(datosSeleccionados);
    setModalEditar(true);
  };

  const peticionPut = async () => {
    /* await axios
      .put(urlcontroles + "/" + idcontrol, datosSeleccionados)
      .then((response) => {
        peticionGet();
        setModalEditar(false);
      }); */
  };
  /////////////select categorias//////////////////////////////////
  const [datacategorias, setDatacategorias] = useState([]);

  const peticionGetcategorias = async () => {
    await axios.get(urlcategorias).then((response) => {
      setDatacategorias(response.data);
      console.log(datacategorias);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetcategorias();
    // eslint-disable-next-line
  }, []);

  //////////////select tipo categorias///////////////////////////
  const [dataTipocategorias, setDatatipocategorias] = useState([]);

  const peticionGettc = () => {
    console.log(urltipocategorias + datosSeleccionados.idcategoria);
    axios
      .get(urltipocategorias + datosSeleccionados.idcategoria)
      .then((response) => {
        setDatatipocategorias(response.data);
        console.log(response.data);
      });
  };
  //////////////select subcategorias///////////////////////////
  const [dataSubcategorias, setDatasubcategorias] = useState([]);

  const peticionGetsc = () => {
    console.log(urlsubcategorias + datosSeleccionados.idtipocategoria);
    axios
      .get(urlsubcategorias + datosSeleccionados.idtipocategoria)
      .then((response) => {
        setDatasubcategorias(response.data);
        console.log(response.data);
      });
  };

  /////////////Mostrar articulos filtro//////////////////////////////////
  const [dataarticulosF, setDataarticulosF] = useState([]);

  const peticionGetartF = async () => {
    await axios.post(urlartfiltro, datosSeleccionados).then((response) => {
      setDataarticulosF(response.data);
      console.log(response.data);
    });
  };
  console.log(DataDC);

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
  
  let status={
    'PENDIENTE':"warning",
    'PROCESADO':"success",
    'REALIZADO':"primary",
    'ELIMINADO':"danger",
  }


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
                     Inventario del control #{idcontrol}
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
                <Card.Title>Detalles del control de inventario</Card.Title>
                <p>Introduzca todos los datos de los articulos correspondientes a ese control de inventario</p>
                <Card.Text>
                  <Card.Text>
                    <Row>
                    <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Codigo</label>
                          <input
                            className="form-control"
                            type="number"
                            min="0"
                            name="codigo"
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Serial</label>
                          <input
                            className="form-control"
                            type="number"
                            min="0"
                            name="serial"
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Color</label>
                          <select
                            className="form-control"
                            name="idcategoria"
                            id="setcategoria"
                            onChange={handleChange}
                            onClick={() => peticionGettc()}
                          >
                            <option value={0}>Seleccione una opcion</option>
                            {datacategorias.map((categorias) => (
                              <option key={categorias.id} value={categorias.id}>
                                {categorias.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Elegir Almacen</label>
                          <select
                            className="form-control"
                            name="idtipocategoria"
                            id="settipocategoria"
                            onChange={handleChange}
                            onClick={() => peticionGetsc()}
                          >
                            <option value={0}>Seleccione una opcion</option>
                            {dataTipocategorias.map((tcategorias) => (
                              <option
                                key={tcategorias.id}
                                value={tcategorias.id}
                              >
                                {tcategorias.nombre}{" "}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Tipo almacen</label>
                          <select
                            className="form-control"
                            name="idsubcategoria"
                            id="settipocategoria"
                            onChange={handleChange}
                          >
                            <option value={0}>Seleccione una opcion</option>
                            {dataSubcategorias.map((subcategorias) => (
                              <option value={subcategorias.id}>
                                {subcategorias.nombre}{" "}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      <Col xs={2} md={2}>
                        <div className="form-group">
                          <label>Ubicacion almacen</label>
                          <select
                            className="form-control"
                            name="idsubcategoria"
                            id="settipocategoria"
                            onChange={handleChange}
                          >
                            <option value={0}>Seleccione una opcion</option>
                            {dataSubcategorias.map((subcategorias) => (
                              <option value={subcategorias.id}>
                                {subcategorias.nombre}{" "}
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
                            name="idarticulo"
                            id="idarticulo"
                            onChange={handleChange}
                            onClick={() => peticionGetartF()}
                          >
                            <option value={0}>Seleccione una articulo</option>
                            {dataarticulosF.map((articulos) => (
                              <option key={articulos.id} value={articulos.id}>
                                {articulos.nombre}
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
                            name="idarticulo"
                            id="idarticulo"
                            onChange={handleChange}
                            onClick={() => peticionGetartF()}
                          >
                            <option value={0}>Seleccione una articulo</option>
                            {dataarticulosF.map((articulos) => (
                              <option key={articulos.id} value={articulos.id}>
                                {articulos.nombre}
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
                            name="cantidad"
                            onChange={handleChange}
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
                            name="costo"
                            onChange={handleChange}
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
                            name="cantidad"
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                    <button
                      className="btn btn-success"
                      onClick={() => peticionPost()}
                    >
                      <FaIcons.FaPlusCircle /> Agregar
                    </button>
                  </Card.Text>
                  <table className="table ">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Costo</th>
                        <th>Subtotal</th>
                        <th>Status</th>
                        <th>Accion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((dcompras) => {
                        return (
                          <tr>
                            <td>{dcompras.id}</td>
                            <td>{dcompras.nombre_articulo}</td>
                            <td>{dcompras.cantidad}</td>
                            <td>{dcompras.costo}</td>
                            <td>{dcompras.total}</td>
                            <td><Badge bg={status[dcompras.status]} text="light">{dcompras.status}</Badge>{' '}</td>
                            <td>
                              <button
                                type="button"
                                disabled={
                                  dcompras.status == "PROCESADO" ? true : false
                                }
                                className="btn btn-dark"
                                onClick={() => {
                                  setDataDC(dcompras.id);
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
                        <th colspan="3"></th>
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
                                name="codigo"
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
                                name="proveedor"
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
                                name="fecha"
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
                                name="tipocompra"
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
                                name="almacen"
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
                                name="status"
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
                          {datosSeleccionados.idcompra}
                        </h4>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        ¿Estás seguro que deseas eliminar este articulo del
                        control de inventario #{datosSeleccionados.idcontrol}?
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
                        <h4>Guardar Control #{datosSeleccionados.idcompra}</h4>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        ¿Estás seguro que desea guardar esta control de inventario con los
                        articulos de la lista?
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
              Por favor vuelva a la seccion de control de inventario y elija un control existente!
            </Card.Text>
          </Card.Body>
        </Card>
      </Sidebar>
    );
  }
};

export default InventarioDetalles;

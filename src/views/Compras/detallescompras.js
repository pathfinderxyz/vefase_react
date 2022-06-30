/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import * as FaIcons from "react-icons/fa";
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

const url = "https://api.vefase.com/public/compras/detallesxcompra"; ///////estos son articulos relacionados a esa compra ///////
const urlcd = "https://api.vefase.com/public/compras/detalles"; /////esta es la compra unica/////////////
const urlcategorias = "https://api.vefase.com/public/articulos/categorias";
const urltipocategorias =
  "https://api.vefase.com/public/articulos/tipocategorias/";
const urlsubcategorias =
  "https://api.vefase.com/public/articulos/subcategorias/";
const urlartfiltro = "https://api.vefase.com/public/articulos/filtro";
const urldcsuma = "https://api.vefase.com/public/compras/detalles/sum";

const DetallesCompras = () => {
  let { idcompra } = useParams();
  console.log(idcompra);

  const [data, setData] = useState([]);
  /*  const [Boton, setBoton] = useState(false); */

  /////////////Mostrar datos de los articulos de cada compra//////////////////////////////////
  const peticionGet = async () => {
    await axios.get(url + "/" + idcompra).then((response) => {
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
  const [datacompra, setDatacompra] = useState([]);

  const [modalcompra, setModalcompra] = useState(false);
  const abrirModalcompra = () => {
    setModalcompra(true);
    peticionGetcompras();
  };

  const peticionGetcompras = async () => {
    await axios.get(urlcd + "/" + idcompra).then((response) => {
      setDatacompra(response.data[0]);
      console.log(datacompra);
    });
  };

  //////////////Recibiendo data de los input//////////////////////////
  const [datosSeleccionados, setDatosSeleccionados] = useState({
    id: "",
    idcompra: idcompra,
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
    await axios.post(urlcd, datosSeleccionados).then((res) => {
      peticionGet();
      peticionGetSum();
      console.log(res.status);
    });
  };

  /////////////Eliminar datos//////////////////////////////////
  const [DataDC, setDataDC] = useState([]);

  const [modalEliminar, setModaleliminar] = useState(false);
  const abrirModaleliminar = () => {
    setModaleliminar(true);
  };

  const peticionDelete = () => {
    console.log(urlcd + "/" + DataDC);
    axios.delete(urlcd + "/" + DataDC).then((response) => {
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
    await axios
      .put(urlcd + "/" + idcompra, datosSeleccionados)
      .then((response) => {
        peticionGet();
        setModalEditar(false);
      });
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
    await axios.get(urldcsuma + "/" + idcompra).then((response) => {
      setDataTotal(response.data[0]);
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetSum();
    // eslint-disable-next-line
  }, []);
  ////////////////////////////////////////////////////////
  if (data.length > 0) {
    return (
      <div>
        <div className="DetallesCompras">
          <Sidebar>
            <Card>
              <Card.Header className="bg-dark text-white" as="h3">
                <div className="row">
                  <div className="col-md-6">
                    Detalles de la compra #{idcompra}
                  </div>
                  <div className="col-md-6">
                    <div className="text-right">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => abrirModalcompra()}
                      >
                        <FaIcons.FaEye /> Ver compra
                      </button>
                    </div>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title>Detalles de la compra</Card.Title>
                <p>Introduzca todos los datos de la compra</p>
                <Card.Text>
                  <Card.Text>
                    <Row>
                      <Col xs={4} md={4}>
                        <div className="form-group">
                          <label>Elegir Categoria</label>
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
                      <Col xs={4} md={4}>
                        <div className="form-group">
                          <label>Elegir Tipo de categoria</label>
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
                      <Col xs={4} md={4}>
                        <div className="form-group">
                          <label>Elegir subcategoria</label>
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
                      <Col xs={4} md={4}>
                        <div className="form-group">
                          <label>Elegir Articulo</label>
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
                          <label>Cantidad</label>
                          <input
                            className="form-control"
                            type="number"
                            min="0"
                            name="cantidad"
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={4} md={4}>
                        <div className="form-group">
                          <label>Costo</label>
                          <input
                            className="form-control"
                            type="number"
                            min="0"
                            name="costo"
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
                            <td>{dcompras.status}</td>
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
                    isOpen={modalcompra}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                  >
                    <ModalHeader>
                      <div>
                        <h4>Informacion de la compra</h4>
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
                                value={datacompra.id}
                              />
                            </div>
                          </Col>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Proveedor</label>
                              <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="proveedor"
                                value={datacompra.proveedor}
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
                                value={datacompra.fecha}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Tipo de compra</label>
                              <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="tipocompra"
                                value={datacompra.tipocompra}
                              />
                            </div>
                          </Col>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Almacen</label>
                              <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="almacen"
                                value={datacompra.almacen}
                              />
                            </div>
                          </Col>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Ubicacion almacen</label>
                              <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="ubialmacen"
                                value={datacompra.ubicalmacen}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={4}>
                            <div className="form-group">
                              <label>Status</label>
                              <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="status"
                                value={datacompra.status}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className="btn btn-dark"
                        onClick={() => setModalcompra(false)}
                      >
                        Cerrar
                      </button>
                    </ModalFooter>
                  </Modal>
                  <Modal isOpen={modalEliminar} centered>
                    <ModalHeader>
                      <div>
                        <h4>
                          Eliminar Articulo de la compra #
                          {datosSeleccionados.idcompra}
                        </h4>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        ¿Estás seguro que deseas eliminar este articulo de la
                        compra?
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
                        <h4>Guardar compra #{datosSeleccionados.idcompra}</h4>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        ¿Estás seguro que desea guardar esta compra con los
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
            Error 404
          </Card.Header>
          <Card.Body>
            <Card.Title>La compra no existe</Card.Title>
            <Card.Text>
              Por favor vuelva a la seccion de compras y elija una compra existente
            </Card.Text>
          </Card.Body>
        </Card>
      </Sidebar>
    );
  }
};

export default DetallesCompras;

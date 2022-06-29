/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import * as FaIcons from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Modal, Col, Container, Row, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const url = "https://api.vefase.com/public/compras";
/* const urlcd = "https://api.vefase.com/public/compras/detalles"; */

const DetallesCompras = () => {

  let { idcompra } = useParams();
  console.log(idcompra);

  const [data, setData] = useState([]);

  /////////////Mostrar datos//////////////////////////////////
  const peticionGet = async () => {
    await axios.get(url).then(response => {
      console.log(response.data);
      setData(response.data);
      console.log(response.data);
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGet();
  }, []);

  const [modalcompra, setModalcompra] = useState(false);
  const abrirModalcompra = () => {
    setModalcompra(true);
  }
  /////////////Eliminar datos//////////////////////////////////
/*   const peticionDelete = () => {
    axios.delete(url + this.state.form.id).then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    })
  }
 */


  return (
    <div>
      <div className="DetallesCompras">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                  Detalles de la compra
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <button type="button" className="btn btn-warning"
                      onClick={() => abrirModalcompra()}>
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
                        <select className='form-control' name='idtipo_proveedor' id="idtipo_proveedor"
                          /* onChange={handleChange} */>
                          <option value={0}>Seleccione una opcion</option>
                          {/* {
                              datatp.map(tproveedor => (
                                <option value={tproveedor.id}>{tproveedor.nombre} </option>
                              ))

                            }
 */}
                        </select>
                      </div>
                    </Col>
                    <Col xs={4} md={4}>
                      <div className="form-group">
                        <label>Elegir tipo categoria</label>
                        <input
                          className="form-control"
                          type="text"
                          name="nif"
                          required=""
                        /*   onChange={handleChange} */
                        />
                      </div>
                    </Col>
                    <Col xs={4} md={4}>
                      <div className="form-group">
                        <label>Elegir subcategoria</label>
                        <input
                          className="form-control"
                          type="text"
                          name="nombre"
                          required=""
                        /*  onChange={handleChange} */
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4} md={4}>
                      <div className="form-group">
                        <label>Elegir Articulo</label>
                        <select className='form-control' name='idtipo_proveedor' id="idtipo_proveedor"
                          /* onChange={handleChange} */>
                          <option value={0}>Seleccione una opcion</option>
                          {/* {
                              datatp.map(tproveedor => (
                                <option value={tproveedor.id}>{tproveedor.nombre} </option>
                              ))

                            }
 */}
                        </select>
                      </div>
                    </Col>
                    <Col xs={4} md={4}>
                      <div className="form-group">
                        <label>Cantidad</label>
                        <input
                          className="form-control"
                          type="number"
                          name="nif"
                          required=""
                        /*   onChange={handleChange} */
                        />
                      </div>
                    </Col>
                    <Col xs={4} md={4}>
                      <div className="form-group">
                        <label>Costo</label>
                        <input
                          className="form-control"
                          type="number"
                          name="nombre"
                          required=""
                        /*  onChange={handleChange} */
                        />
                      </div>
                    </Col>
                  </Row>
                  <button className="btn btn-success"
                    /* onClick={() => peticionPost()} */>
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
                    {data.map(dcompras => {
                      return (
                        <tr>
                          <td>{dcompras.id}</td>
                          <td>{dcompras.nombre}</td>
                          <td>{dcompras.Status}</td>
                          <td>{dcompras.Status}</td>
                          <td>{dcompras.Status}</td>
                          <td>{dcompras.Status}</td>
                          <td>
                            <button type="button" className="btn btn-dark"
                              onClick={() => { this.seleccionarEmpresa(dcompras); this.setState({ modalEliminar: true }) }}>
                              <FaIcons.FaTrash />  Eliminar
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                    <tr>
                      <th colspan="3"></th>
                      <th>Total</th>
                      <th></th>
                      <th></th>
                      <th>
                        <button type="button" className="btn btn-success">
                          <FaIcons.FaSave /> Guardar
                        </button>
                      </th>
                    </tr>
                  </tbody>
                </table>



                <Modal isOpen={modalcompra}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter">
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
                              name="nif"
                              required=""
                              value={2}
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
                              name="nif"
                              required=""
                            />
                          </div>
                        </Col>
                        <Col xs={6} md={4}>
                          <div className="form-group">
                            <label>Fecha</label>
                            <input
                              className="form-control"
                              readOnly
                              type="text"
                              name="nombre"
                              required=""
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
                              name="representante"
                              required=""
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
                              name="correo"
                              required=""
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
                              name="telefono"
                              required=""
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
                              name="direccion"
                              required=""
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


                {/*   <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                      Estás seguro que deseas eliminar a la empresa  */}{/* {nombre} */}
                {/*  </ModalBody>
                    <ModalFooter>
                      <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                      <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                  </Modal> */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Sidebar>
      </div>
    </div>

  );
};

export default DetallesCompras;
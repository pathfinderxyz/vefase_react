import React, { useState, useEffect} from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Sidebar from "../../components/sidebar";
import {Col,Row} from "reactstrap";

const url = "https://api.vefase.com/public/usuarios";

const DatosUsuarios = () => {

/////////////Mostrar datos//////////////////////////////////
const [users, setUsers] = useState([]);
const [data, setdata] = useState([]);


useEffect(() => {
  const loginUserJSON = window.localStorage.getItem('loginUser')
  if(loginUserJSON){
    const user= JSON.parse(loginUserJSON)
    setUsers(user);
  }
 }, []);
  
 useEffect(() => {
    axios.get(url+'/'+users.id).then(res => {
    if(res.data[0]) {
    setdata(res.data[0]);
    }
   });
 }, [users]);

    return (
        <div>
            <div>
                <Sidebar>
                    <Card>
                        <Card.Header className="bg-dark text-white" as="h3">Mis Datos</Card.Header>
                        <Card.Body>
                            <Card.Title>Datos personales</Card.Title>
                            <Card.Text>
                                Esta informacion fue proporcionado por el administrador al registrarlo en el sistema.
                            </Card.Text>

                            <Row>
                                <Col xs={6} md={4}>
                                    <div className="form-group">
                                        <label>Codigo de usuario</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="codigo"
                                            value={data.id}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={4}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="proveedor"
                                            value={data.username}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={4}>
                                    <div className="form-group">
                                        <label>Nombre y apellido</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="usuario"
                                            value={data.usuario}
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
                                            value={data.status}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={4}>
                                    <div className="form-group">
                                        <label>Caracteristica</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="almacen"
                                            value={data.caracteristicas}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={4}>
                                    <div className="form-group">
                                        <label>Correo Electronico</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="ubialmacen"
                                            value='soporte@vefase.com'
                                        />
                                    </div>
                                </Col>
                            </Row>
                            
                        </Card.Body>
                    </Card>
                </Sidebar>
            </div>
        </div>
    );
};

export default DatosUsuarios;
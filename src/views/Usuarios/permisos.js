import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import { FormGroup, Input, Label, Col, Row } from "reactstrap";
import axios from "axios";
import SinPermisos from "./../../components/sinpermisos";

const urluser = "https://api.vefase.com/public/usuarios";
const urlroles = "https://api.vefase.com/public/perfiles";
const urlpermisos = "https://api.vefase.com/public/permisos";
const urlauth = "https://api.vefase.com/public/permisos/permisos";

const Permisos = () => {

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

  /////////////Mostrar datos usuarios//////////////////////////////////
  const [datausuario, setDatausuario] = useState([]);

  const peticionGetuser = async () => {
    await axios.get(urluser).then((response) => {
      setDatausuario(response.data);
    });
  };

  useEffect(async () => {
    await peticionGetuser();
  }, []);

  /////////////Mostrar datos roles//////////////////////////////////
  const [dataroles, setDataroles] = useState([]);

  const peticionGetroles = async () => {
    await axios.get(urlroles).then((response) => {
      setDataroles(response.data);
    });
  };

  useEffect(async () => {
    await peticionGetroles();
  }, []);

   //////////////Recibiendo data de los input//////////////////////////
   const [datosSeleccionados, setDatosSeleccionados] = useState({
    idusuario:'',
    idrol:'',
    usuarios:'',
    perfil:'',
    permisos:'',
    regarticulos:'',
    art_registrados:'',
    categorias:'',
    tipocategorias:'',
    subcategorias:'',
    plancuentas:'',
    almacen:'',
    tipoalmacen:'',
    ubialmacen:'',
    gcompras:'',
    proveedor:'',
    tipoproveedor:'',
    importaciones:'',
    ginventario:'',
    unidad:'',
    colores:'',
    paises:'',
    ciudades:'',
  });

  ///////////////Insertar Datos//////////////////////////////////

  const handleChanged = e => {
    const { name, value } = e.target;
    setDatosSeleccionados(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  
  const [Exitoso, setExitoso] = useState(false);

  const peticionPost = async () => {
    console.log(datosSeleccionados);
    await axios.post(urlpermisos, datosSeleccionados).then((res) => {
      setExitoso(true);
    })
    .catch((err) => {
      setExitoso(false);
    })
  };

  //////////////////////////////////////////////////////////////////////////
  if(permisos.permisos!==undefined){
    if(permisos.permisos){
  return (
    <div>
      <div>
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">Asignar Permisos</Card.Header>
            <Card.Body>
            <p>Asigne los permisos a los usuarios correspondientes en el sistema</p>
            {
                Exitoso &&
                <div className="alert alert-success">
                  {<strong>Los permisos fueron asignados con exito!</strong>}
                </div>
              }
              <Row>
                <Col xs={6} md={6}>
                  <div className="form-group">
                    <Card.Title>Elegir Usuario</Card.Title>
                    <select
                      className="form-control"
                      name="idusuario"
                      id="idusuario"
                      onChange={handleChanged}
                    >
                      <option value={0}>Seleccionar</option>
                      {datausuario.map((usuarios) => (
                              <option key={usuarios.id} value={usuarios.id}>
                                {usuarios.username}
                              </option>
                            ))}
                    </select>
                  </div>
                </Col>
                <Col xs={6} md={6}>
                  <div className="form-group">
                    <Card.Title>Elegir Rol</Card.Title>
                    <select className="form-control" name="idrol" id="idrol" onChange={handleChanged}>
                      <option value={0}>Seleccionar</option>
                      {dataroles.map((roles) => (
                              <option key={roles.id} value={roles.id}> {roles.nombre}</option>
                            ))}
                    </select>
                  </div>
                </Col>


              </Row>
              <Card.Title>Módulos</Card.Title>
              <p>Asigne los modulos a los que tendra acceso el usuario</p>
              <Card.Text>

                <Row>
                  <Col xs={3} md={3}>
                    <Card.Title>Usuarios</Card.Title>
                    <FormGroup check>
                      <Input id="usuarios" type="checkbox" value={true} name="usuarios" onChange={handleChanged}/>
                      <Label check>Usuarios</Label>
                    </FormGroup>
                    {/*  <FormGroup check style={{ marginLeft:"20px"}}>
                  <Input id="checkbox2" type="checkbox"/>
                  {' '}
                  <Label check>Editar</Label><br></br>
                  <Input id="checkbox2" type="checkbox"/>
                  {' '}
                  <Label check>Agregar</Label>
                </FormGroup> */}
                    <FormGroup check>
                      <Input id="perfil" type="checkbox" name="perfil" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Perfiles</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="permisos" type="checkbox" name="permisos" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Permisos</Label>
                    </FormGroup>
                  </Col>

                  <Col xs={3} md={3}>
                    <Card.Title>Articulos</Card.Title>
                    <FormGroup check>
                      <Input id="regarticulos" type="checkbox" name="regarticulos" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Registrar Articulos</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="art_registrados" type="checkbox" name="art_registrados" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Articulos registrados</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="categorias" type="checkbox" name="categorias" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Categorias</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="tipocategorias" type="checkbox" name="tipocategorias" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Tipo Categorias</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="subcategorias" type="checkbox" name="subcategorias" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Subcategorias</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="plancuentas" type="checkbox" name="plancuentas" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Plan de cuentas</Label>
                    </FormGroup>
                  </Col>
                  <Col xs={3} md={3}>
                    <Card.Title>Almacen</Card.Title>
                    <FormGroup check>
                      <Input id="almacen" type="checkbox" name="almacen" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Almacenes</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="tipoalmacen" type="checkbox" name="tipoalmacen" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Tipo de almacenes</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="ubialmacen" type="checkbox" name="ubialmacen" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Ubicacion Almacenes</Label>
                    </FormGroup>
                  </Col>
                  <Col xs={3} md={3}>
                    <Card.Title>Compras</Card.Title>
                    <FormGroup check>
                      <Input id="gcompras" type="checkbox" name="gcompras" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Gestion de compras</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="proveedor" type="checkbox" name="proveedor" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Proveedor</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="tipoproveedor" type="checkbox" name="tipoproveedor" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Tipo de proveedor</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="importaciones" type="checkbox" name="importaciones" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Importaciones</Label>
                    </FormGroup>
                  </Col>

                </Row><br></br>
                <Row>

                  <Col xs={3} md={3}>
                    <Card.Title>Inventario</Card.Title>
                    <FormGroup check>
                      <Input id="ginventario" type="checkbox" name="ginventario" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Gestion de inventario</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="unidad" type="checkbox" name="unidad" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Unidad</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="colores" type="checkbox" name="colores" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Colores</Label>
                    </FormGroup>
                  </Col>
                  <Col xs={3} md={3}>
                    <Card.Title>Configuración</Card.Title>
                    <FormGroup check>
                      <Input id="paises" type="checkbox" name="paises" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Paises</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input id="ciudades" type="checkbox" name="ciudades" value={true} onChange={handleChanged}/>
                      {' '}
                      <Label check>Ciudades</Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Card.Text><br></br>
              <button className="btn btn-success"
                   onClick={() => peticionPost()}>
                Asignar permisos
              </button>
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
  }
}else{
  return (
    <div>
    <Sidebar>
       <SinPermisos/>
     </Sidebar>  
    </div>
  );
}
};

export default Permisos;
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import Cargando from "../../components/cargando";
import { Link } from "react-router-dom";
import SinPermisos from "./../../components/sinpermisos";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Modal,ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const url = "https://api.vefase.com/public/articulos";
const urlauth = "https://api.vefase.com/public/permisos/verarticulos";

const  ArticulosRegistrados= () => {

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
      name: 'Nombre',
      selector: (row) => row.nombre,
    },
    {
      name: 'Nombre corto',
      selector: (row) => row.nombrecorto,
    },
    {
      name: 'Modelo',
      selector: (row) => row.modelo,
    },
   
    {
      name: 'Categorias',
      selector: (row) => row.categoria,
    },
    {
      name: 'Tipo de categorias',
      selector: (row) => row.tipocategoria,
    },
    {
      name: 'Subcategoria',
      selector: (row) => row.subcategoria,
    },
    {
      name: 'Accion',
      button: true,
      cell: (row) =>
        <Nav>
         <NavDropdown id="nav-dropdown-dark-example" title={<FaIcons.FaRegSun/>} className="stylenav">
             <NavDropdown.Item><Link to={"/articulos/editar/"+row.id}>Editar </Link></NavDropdown.Item>   
             <NavDropdown.Item onClick={() => abrirModalImagen()}>Ver Imagen</NavDropdown.Item>                  
         </NavDropdown>
      </Nav>
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

  //////////////Modal imagen//////////////////////////////////
  const [modalImagen, setModalImagen] = useState(false);
  const abrirModalImagen = () => {
    setModalImagen(true);
  }
  


  /////////////////////////////////////////////////////////////////

  if(permisos.permisos!==undefined){
    if(permisos.permisos){
  return (
    <div>
      <div className="ArticulosRegistrados">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                Articulos
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <Link type="button" className="btn btn-warning text-dark" to="/articulos/registrar">
                    <FaIcons.FaPlus/> Registrar articulos
                    </Link>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Articulos Registrados</Card.Title>
            
              <p> Articulos Registrados en el sistema.</p>
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

            <Modal isOpen={modalImagen} centered>
                <ModalHeader>
                  <div>
                    <h4>Imagen de articulo</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <p>imagen</p>
                </ModalBody>
                <ModalFooter>
                  <button
                    className="btn btn-dark"
                    onClick={() => setModalImagen(false)}
                  >
                    Cerrar
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

export default ArticulosRegistrados;
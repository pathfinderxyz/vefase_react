import React, { useState } from 'react';
import * as FaIcons from "react-icons/fa";
import './../assets/css/sidebar.css';
import logovefase from './../assets/img//logo_vefase.png';
import Accordion from 'react-bootstrap/Accordion';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
 {/* ---------------------------------------Navbar------------------------------------------------ */}
            <Nav className="justify-content-end Nav1" activeKey="/home">
                <Nav>
                    <NavDropdown id="nav-dropdown-dark-example" title={<FaIcons.FaUserAlt/>}>
                        <NavDropdown.Item><Link to="/usuarios" className='enlacenav'>Usuarios</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to="/usuarios/perfiles" className='enlacenav'>Perfiles</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to="/usuarios/permisos" className='enlacenav'>Permisos</Link></NavDropdown.Item>
                        
                    </NavDropdown>
                </Nav>
                <Nav.Item>
                    <Nav.Link eventKey="link-1"><FaIcons.FaTools/></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2"><FaIcons.FaWindowClose /></Nav.Link>
                </Nav.Item>

            </Nav>
{/* ---------------------------------------Sidebar------------------------------------------------ */}            
            <div className="container_side">

                <div style={{ width: isOpen ? "220px" : "60px" }} className="sidebar">
                    <div className="top_section">
                        <h1 style={{ display: isOpen ? "block" : "none" }} className="logo"><img src={logovefase} alt='some value'/></h1>
                        <div style={{ marginLeft: isOpen ? "200px" : "0px" }} className="bars">
                            <FaIcons.FaBars onClick={toggle} />
                        </div>
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }}>
                        <div style={{ background: isOpen ? "#000" : "#edf1f5" }}>
                            <Accordion className='acordion' defaultActiveKey="0" >
                            
                                <Accordion.Item>
                                    
                                        <Link to='/inicio' className='enlace'>
                                        <Accordion.Header>
                                            <FaIcons.FaThLarge /> Inicio
                                            </Accordion.Header>
                                        </Link>
                                   
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><FaIcons.FaBox/>  Articulos</Accordion.Header>
                                    <Accordion.Body>
                                        <Link to='/articulos/registrar'>
                                        ► Registrar articulos
                                        </Link><br></br>
                                        <Link to='/articulos/'>
                                        ► Articulos registrados
                                        </Link><br></br>
                                        <Link to='/articulos/categorias'>
                                        ► Categorias
                                        </Link><br></br>
                                        <Link to='/articulos/tipocategorias'>
                                        ► Tipo categorias
                                        </Link><br></br>
                                        <Link to='/articulos/subcategorias'>
                                        ► Subcategoria
                                        </Link><br></br>
                                        <Link to='/articulos/plandecuentas'>
                                        ► Plan de cuentas
                                        </Link>
                                        
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header><FaIcons.FaStore /> Almacen</Accordion.Header>
                                    <Accordion.Body>
                                        <Link to='/almacen'>
                                        ► Almacenes registrados
                                        </Link><br></br>
                                        <Link to='/almacen/tipoalmacen'>
                                        ► Tipo almacen
                                        </Link><br></br>
                                        <Link to='/almacen/ubicacionalmacen'>
                                        ► Ubicacion de almacen
                                        </Link>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header><FaIcons.FaShoppingCart /> Compras</Accordion.Header>
                                    <Accordion.Body>
                                    <Link to='/compras'>
                                        ► Gestion compras
                                        </Link><br></br>
                                        <Link to='/compras/tipoproveedores'>
                                        ► Tipo proveedor
                                        </Link><br></br>
                                        <Link to='/compras/proveedores'>
                                        ► Proveedores
                                        </Link><br></br>
                                        <Link to='/compras/importaciones'>
                                        ► Importaciones
                                        </Link>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header><FaIcons.FaBoxes /> Inventario</Accordion.Header>
                                    <Accordion.Body>
                                    <Link to='/inventario'>
                                        ► Control Inventario
                                        </Link><br></br>
                                        <Link to='/inventario/unidades'>
                                        ► Unidades
                                        </Link><br></br>
                                        <Link to='/inventario/colores'>
                                        ► Colores
                                        </Link>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5">
                                    <Accordion.Header><FaIcons.FaRegSun /> Configuracion</Accordion.Header>
                                    <Accordion.Body>
                                    <Link to='/paises'>
                                        ► Paises
                                        </Link><br></br>
                                        <Link to='/ciudades'>
                                        ► Ciudades
                                        </Link>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item>
                                    <Accordion.Header>
                                        <Link to='/' className='enlace'>
                                            <FaIcons.FaDoorClosed /> Salir
                                        </Link>
                                    </Accordion.Header>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
                
                <main>{children}</main>
                
            </div>
        </div>
    );
};

export default Sidebar;
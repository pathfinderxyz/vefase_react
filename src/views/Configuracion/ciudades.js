import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import Cargando from "../../components/cargando";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const url = "https://api.vefase.com/public/ciudades";
const urlpaises = "https://api.vefase.com/public/paises";

const Ciudades = () => {

  //////////////Iniciando Status data//////////////////////////
  const [data, setData] = useState([]);

  const [ciudadSeleccionada, setCiudadSeleccionada] = useState({
    id: '',
    nombre: '',
    pais: '',
    idpais:''
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
      name: 'Id',
      selector: (row) => row.id,
      defaultSortAsc: true,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
    },
    {
      name: 'Pais',
      selector: (row) => row.pais,
    },
    {
      name: 'Accion',
      button: true,
      cell: (row) =>
        <button className="btn btn-dark"
          onClick={() => { setCiudadSeleccionada(row); abrirModalEditar() }} >
          <FaIcons.FaPencilAlt />
        </button>,
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
    setCiudadSeleccionada("");
    setModalInsertar(true);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setCiudadSeleccionada(prevState => ({
      ...prevState,
      [name]: value
    }))
 
  }

  const [Error, setError] = useState(false); 

  const peticionPost = async () => {
    delete ciudadSeleccionada.id;
    console.log(ciudadSeleccionada);
    await axios.post(url,ciudadSeleccionada).then(res => {
         peticionGet();
         setError(false);
         setModalInsertar(false);
      })
        .catch((err) => {
             setError(true);
             setModalInsertar(false);
      })
  }

  //////////////Editar datos/////////////////////////////////////
  const [modalEditar, setModalEditar] = useState(false);
  const abrirModalEditar = () => {
    console.log(ciudadSeleccionada);
    setModalEditar(true);
  }

  const peticionPut = async () => {
    console.log(ciudadSeleccionada);
    // eslint-disable-next-line no-template-curly-in-string
    await axios.put(url+'/'+ciudadSeleccionada.id,ciudadSeleccionada).then(response => {
      peticionGet();
      setError(false);
      setModalEditar(false);
    })
    .catch((err) => {
      setError(true);
      setModalEditar(false);
})
  }
   /////////////select paises//////////////////////////////////
   const [datapaises, setDatapaises] = useState([]);

   const peticionGetPaises = async () => {
    await axios.get(urlpaises).then(response => {
      setDatapaises(response.data);
      console.log(response.data);
    })
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetPaises();
    // eslint-disable-next-line 
  },[]);

  /////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="Ciudades">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                  Ciudades
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <button type="button" className="btn btn-success" onClick={() => abrirModalInsertar()}>
                      <i className="ti-plus"></i> Añadir ciudad
                    </button>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Ciudades registradas</Card.Title>
              {
                   Error &&
                   <div className="alert alert-danger">
                      {<strong>Error: El nombre ya existe! intente con otro nombre.</strong>}
                   </div>
               }
              <p>Ciudades registradas en el sistema.</p>
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

              <Modal isOpen={modalInsertar}>
                <ModalHeader>
                  <div>
                    <h4>Insertar ciudad</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label>Ciudad</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      required=""
                      onChange={handleChange}
                    />
                    <br /><br />

                    <label>Pais</label>
                    <select className='form-control' name='idpais' id="setpaises" onChange={handleChange}>
                      <option value={0}>Seleccione una opcion</option>
                      {
                        datapaises.map(paises => (
                          <option value={paises.id}>{paises.nombre} </option>
                        ))
                        
                      }
                    </select>
                    

                    <br />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    className="btn btn-dark"
                    onClick={() => setModalInsertar(false)}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success"
                    onClick={() => peticionPost()}>
                    Insertar
                  </button>

                </ModalFooter>
              </Modal>

              <Modal isOpen={modalEditar}>
                <ModalHeader>
                  <div>
                    <h4>Editar Ciudad</h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <input
                      className="form-control" readOnly
                      type="hidden"
                      name="id"
                      value={ciudadSeleccionada.id}
                      onChange={handleChange}
                    />


                    <label>CIUDAD</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      value={ciudadSeleccionada.nombre}
                      onChange={handleChange}

                    />
                    <br /><br />
                    <label>PAISES</label>
                
                    <select className='form-control'  name='idpais'  id="setpaises" value={ciudadSeleccionada.idpais} onChange={handleChange} >
                      
                      {
                        datapaises.map(paises=>(
                          <option key={paises.id} value={paises.id}>{paises.nombre}</option>
                        ))
                         
                      }
                      
                    </select>
                
                  </div>
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
  );
};

export default Ciudades;
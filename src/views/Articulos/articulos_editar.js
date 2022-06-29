import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import { useParams } from "react-router-dom";

const url = "https://api.vefase.com/public/articulos";
const urlfiltro = "https://api.vefase.com/public/articulos/id";
const urlcategorias = "https://api.vefase.com/public/articulos/categorias";
const urltipocategorias = "https://api.vefase.com/public/articulos/tipocategorias/";
const urlsubcategorias = "https://api.vefase.com/public/articulos/subcategorias/";
const urlplan = "https://api.vefase.com/public/plandecuentas";

const ArticulosEditar = () => {

  let {idart} = useParams(); 
  console.log(idart);

  const navigate = useNavigate();

 /////////////Mostrar datos//////////////////////////////////
 const [datosart, setDatosart] = useState({
        id: "",
        nombre: "",
        nombrecorto: "",
        modelo: "",
        descripcion: "",
        categoria: "",
        idcategoria: "",
        tipocategoria: "",
        idtipocategoria: "",
        subcategoria: "",
        idsubcategoria: "",
        plan_cuentas:"",
        status: ""
  });

  const peticionGet = () => {
    setDatosart("");
    axios.get(urlfiltro+'/'+idart).then(response => {
      setDatosart(response.data[0]);
    })
  }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(async () => {
    await peticionGet();
    // eslint-disable-next-line 
    },[]);

    console.log(datosart);

 ///////////////Actualizar Datos//////////////////////////////////

  function handleChange(e) {
        const { name, value } = e.target;
        setDatosart(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

  const [Error, setError] = useState(false);

  const peticionPut = async () => {
    await axios.put(url+'/'+datosart.id, datosart).then(res => {
      console.log(res.status);
      navigate('/articulos/actualizado');
      setError(false);
    })
      .catch((err) => {
        setError(true);
      })
   }

  /////////////select categorias//////////////////////////////////
  const [datacategorias, setDatacategorias] = useState([]);

  const peticionGetcategorias = async () => {
    await axios.get(urlcategorias).then(response => {
      setDatacategorias(response.data);
      console.log(datacategorias);
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetcategorias();
    // eslint-disable-next-line 
  }, []);

   //////////////select tipo categorias///////////////////////////
   const [dataTipocategorias, setDatatipocategorias] = useState([]);

   const peticionGettc = () => {
    console.log(urltipocategorias + datosart.idcategoria);
    axios.get(urltipocategorias + datosart.idcategoria).then(response => {
      setDatatipocategorias(response.data);
      console.log(response.data);
    })
   }


    //////////////select subcategorias///////////////////////////
    const [dataSubcategorias, setDatasubcategorias] = useState([]);

    const peticionGetsc = () => {
      console.log(urlsubcategorias + datosart.idtipocategoria);
      axios.get(urlsubcategorias + datosart.idtipocategoria).then(response => {
        setDatasubcategorias(response.data);
      })
    }
  

    //////////////select plan de cuentas///////////////////////////
    const [dataplandecuentas, setDataplandecuentas] = useState([]);

    const peticionGetpc = async () => {
      await axios.get(urlplan).then(response => {
        setDataplandecuentas(response.data);
      })
    }

     // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await peticionGetpc();
        // eslint-disable-next-line 
    }, []);
 
  
  /////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="ArticulosEditar">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                  Editar Articulos
                </div>
                <div className='col-md-6'>
                  {/* <div className="text-right">
                    <Link type="button" className="btn btn-success" to="/articulos/registrar">
                      <i className="ti-plus"></i> Registrar articulos
                    </Link>
                  </div> */}
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Editar articulos</Card.Title>
              {
                Error &&
                <div className="alert alert-danger">
                  {<strong>Error: Un articulo con ese nombre ya existe! intente con otro nombre.</strong>}
                </div>
              }
              
              <p> Editar Articulos Registrados en el sistema.</p>
              <div className="row">
          
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      placeholder="Introduzca el nombre"
                      value={datosart.nombre}
                      onChange={handleChange}
                    />
                    <br /><br />

                    <label>Nombre de fabrica</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombrecorto"
                      placeholder="Introduzca el nombre de fabrica"
                      value={datosart.nombrecorto}
                      onChange={handleChange}
                    />
                    <br /><br />

                    <label>Modelo</label>
                    <input
                      className="form-control"
                      type="text"
                      name="modelo"
                      required=""
                      placeholder="Introduzca el modelo"
                      value={datosart.modelo}
                      onChange={handleChange}
                    />
                    <br /><br />
                    <label>Descripción</label>
                    <input
                      className="form-control"
                      type="text"
                      name="descripcion"
                      placeholder="Introduzca la descripcion"
                      value={datosart.descripcion}
                      onChange={handleChange}
                    />
                    <br /><br />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Categorias</label>
                    <select className='form-control' value={datosart.idcategoria} name='idcategoria' id="setcategoria" 
                    onChange={handleChange}  onClick={() => peticionGettc()}
                    >
                       <option value={0}>Seleccione una opcion</option>
                      {
                        datacategorias.map(categorias => (
                          <option key={categorias.id} value={categorias.id}
                          >
                          {categorias.nombre} 
                          </option>
                        ))

                      }
                     

                    </select>

                    <br /> <br /> 
                    <label>Tipo de categorias</label>
                    <select className='form-control' value={dataTipocategorias.id} name='idtipocategoria' id="settipocategoria"
                     onChange={handleChange} onClick={() => peticionGetsc()}>
                     <option value={datosart.idtipocategoria}>{datosart.tipocategoria}</option>
                      {
                        dataTipocategorias.map(tcategorias => (
                          <option key={tcategorias.id} value={tcategorias.id}>{tcategorias.nombre} </option>
                        ))
                      }
                    </select>

                    <br/><br/>
                    <label>subcategorias</label>
                    <select className='form-control' value={dataSubcategorias.id} name='idsubcategoria' id="settipocategoria"  
                    onChange={handleChange} >
                      <option value={datosart.idsubcategoria}>{datosart.subcategoria}</option>
                      {
                        dataSubcategorias.map(subcategorias => (
                          <option key={subcategorias.id} value={subcategorias.id}>{subcategorias.nombre} </option>
                        ))
                      }
                    </select>
                    <br /> <br />
                    <label>Plan de cuentas</label>
                    <select className='form-control' value={datosart.plan_cuentas} name='plan_cuentas' id="setplandecuentas"
                    onChange={handleChange}>
                      <option value={0}>Seleccione una opcion</option>
                      {
                        dataplandecuentas.map(plan => (
                          <option key={plan.id} value={plan.id}>{plan.nombre} </option>
                        ))

                      } 
                    </select>
                  </div>
                </div>
                </div>
             

              <button className="btn btn-success"
                   onClick={() => peticionPut()}>
                Guardar articulo
              </button>

            </Card.Body>
          </Card>
        </Sidebar>
      </div>
    </div>
  );
};

export default ArticulosEditar;
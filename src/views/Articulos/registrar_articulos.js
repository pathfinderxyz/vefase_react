import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import axios from "axios";
import SinPermisos from "./../../components/sinpermisos";

const url = "https://api.vefase.com/public/articulos";
const urlcategorias = "https://api.vefase.com/public/articulos/categorias";
const urltipocategorias =
  "https://api.vefase.com/public/articulos/tipocategorias/";
const urlsubcategorias =
  "https://api.vefase.com/public/articulos/subcategorias/";
const urlplan = "https://api.vefase.com/public/plandecuentas";
const urlauth = "https://api.vefase.com/public/permisos/regarticulos";
const urlart = "https://api.vefase.com/public/articulos";
const urlimagen = "https://api.vefase.com/public/imagen";

const ArticulosRegistrar = () => {
  const navigate = useNavigate();

  //////////////Datos de Usuario Logueado/////////////////////////
  const [users, setUsers] = useState([]);
  const [permisos, setPermisos] = useState([]);

  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem("loginUser");
    if (loginUserJSON) {
      const user = JSON.parse(loginUserJSON);
      setUsers(user);
    }
  }, []);

  useEffect(() => {
    axios.get(urlauth + "/" + users.id).then((res) => {
      if (res.data[0]) {
        setPermisos(res.data[0]);
      }
    });
  }, [users]);

  //////////////Iniciando Status data//////////////////////////

  const [datosSeleccionados, setDatosSeleccionados] = useState({
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

  const validardatos = () => {
    if (datosSeleccionados.nombre !== "") {
      peticionPost();
      peticionPostImg();
    } else {
      setError(true);
    }
  };

  const [Error, setError] = useState(false);
  const [Exitoso, setExitoso] = useState(false);

  const peticionPost = async () => {
    delete datosSeleccionados.id;
    console.log(datosSeleccionados);
    await axios
      .post(url, datosSeleccionados)
      .then((res) => {
        console.log(res.status);
        setExitoso(true);
        navigate("/articulos/exitoso");
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setExitoso(false);
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

  //////////////select subcategorias///////////////////////////
  const [dataplandecuentas, setDataplandecuentas] = useState([]);

  const peticionGetpc = async () => {
    console.log(urlplan);
    await axios.get(urlplan).then((response) => {
      setDataplandecuentas(response.data);
      console.log(response.data);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetpc();
    // eslint-disable-next-line
  }, []);


//////////////cargar articulos//////////////////
const [dataArt, setDataArt] = useState([]);

 const peticionGetArt = async () => {
  await axios.get(urlart).then(response => {
    setDataArt(response.data[response.data.length-1].id);
  })
}
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(async () => {
  await peticionGetArt();
}, []);


  ///////////////////////cargar imagen/////////////////////
  const [file, setFile] = useState(null);

  const handleFileImg = (e) => {
    setFile(e.target.files[0]);
  };

  const peticionPostImg = () => {
    let formData = new FormData();
    formData.append("id",dataArt);
    formData.append("file", file);
    console.log(formData);
    axios.post(urlimagen, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  /////////////////////////////////////////////////////////////////
  if (permisos.permisos !== undefined) {
    if (permisos.permisos) {
      return (
        <div>
          <div className="ArticulosRegistrar">
            <Sidebar>
              <Card>
                <Card.Header className="bg-dark text-white" as="h3">
                  <div className="row">
                    <div className="col-md-6">Articulos</div>
                    <div className="col-md-6">
                      {/* <div className="text-right">
                    <Link type="button" className="btn btn-success" to="/articulos/registrar">
                      <i className="ti-plus"></i> Registrar articulos
                    </Link>
                  </div> */}
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Registrar articulos</Card.Title>
                  {Error && (
                    <div className="alert alert-danger">
                      {
                        <strong>
                          Error: Los campos estan vacios o un articulo con ese
                          nombre ya existe! intente nuevamente
                        </strong>
                      }
                    </div>
                  )}
                  {Exitoso && (
                    <div className="alert alert-success">
                      {
                        <strong>
                          Exitoso: El articulo ha sido registrado con exito!
                        </strong>
                      }
                    </div>
                  )}
                  <p> Articulos Registrados en el sistema.</p>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Nombre</label>
                        <input
                          className="form-control"
                          type="text"
                          name="nombre"
                          placeholder="Introduzca el nombre"
                          onChange={handleChange}
                        />
                        <br />
                        <br />

                        <label>Nombre de fabrica</label>
                        <input
                          className="form-control"
                          type="text"
                          name="nombrecorto"
                          placeholder="Introduzca el nombre de fabrica"
                          onChange={handleChange}
                        />
                        <br />
                        <br />

                        <label>Modelo</label>
                        <input
                          className="form-control"
                          type="text"
                          name="modelo"
                          required=""
                          placeholder="Introduzca el modelo"
                          onChange={handleChange}
                        />
                        <br />
                        <br />
                        <label>Descripci??n</label>
                        <input
                          className="form-control"
                          type="text"
                          name="descripcion"
                          placeholder="Introduzca la descripcion"
                          onChange={handleChange}
                        />
                       
                        <br />
                      </div>
                      <label>Subir Imagen</label>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="file"
                          name="img"
                          onChange={handleFileImg}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Categorias</label>
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
                        <br /> <br />
                        <label>Tipo de categorias</label>
                        <select
                          className="form-control"
                          name="idtipocategoria"
                          id="settipocategoria"
                          onChange={handleChange}
                          onClick={() => peticionGetsc()}
                        >
                          <option value={0}>Seleccione una opcion</option>
                          {dataTipocategorias.map((tcategorias) => (
                            <option key={tcategorias.id} value={tcategorias.id}>
                              {tcategorias.nombre}{" "}
                            </option>
                          ))}
                        </select>
                        <br />
                        <br />
                        <label>subcategorias</label>
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
                        <br /> <br />
                        <label>Plan de cuentas</label>
                        <select
                          className="form-control"
                          name="plan_cuentas"
                          id="setplandecuentas"
                          onChange={handleChange}
                        >
                          <option value={0}>Seleccione una opcion</option>
                          {dataplandecuentas.map((plan) => (
                            <option value={plan.id}>{plan.nombre} </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={() =>  validardatos()}
                  >
                    Guardar articulo
                  </button>
                </Card.Body>
              </Card>
            </Sidebar>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Sidebar>
            <SinPermisos />
          </Sidebar>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Sidebar>
          <SinPermisos />
        </Sidebar>
      </div>
    );
  }
};

export default ArticulosRegistrar;

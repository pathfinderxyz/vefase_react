import React, { useState} from 'react';
import './../assets/css/login.css';
import logvefase from './../assets/img/VEFASE-LOGO2.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URL_LOGIN = "https://api.vefase.com/public/login"

const Login = () => {

  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errordatos, setErrordatos] = useState(false);
  const [espera, setEspera] = useState(false);
  const [Data, setData] = useState([]);

  const [datosSeleccionados, setDatosSeleccionados] = useState({
    usuario: '',
    clave: ''
  });


  const handleChange = e => {
    const { name, value } = e.target;
    setDatosSeleccionados(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleLogin = async () => {
    console.log(datosSeleccionados);
    await axios.post(URL_LOGIN,datosSeleccionados).then(res => {
      setData(res.data[0]);
      setError(false);
      setEspera(false);
      if(res.data[0].error){
        setErrordatos(true);
      }
    })
    .catch((err) => {
      setError(true);
      setEspera(true);
    })
  }

 if(Data.conectado){
    window.localStorage.setItem(
      'loginUser',JSON.stringify(Data)
    );
    navigate('/inicio');
  }

  return (
  <div>
    <div className='bodylogin'>
      <div className="container">
        <div className="login-register">
          <div className="row">
            <div className="col-sm-4 offset-4 mt-5">
              <div className="login-box card mt-5">
                <div className="card-body">
                  <div className="form-horizontal form-material text-center">
                    <img src={logvefase} alt='some value' width={220} />
                    <div className="form-group ">
                      <div className="col-sm-12">
                        <input
                          className="form-control"
                          name="usuario"
                          type="text"
                          required=""
                          placeholder="Usuario"
                          onChange={handleChange}
                        />{" "}
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12">
                        <input
                          className="form-control"
                          name="clave"
                          type="password"
                          required=""
                          placeholder="Password"
                          onChange={handleChange}
                        />{" "}
                      </div>
                    </div>
                    
                    {
                      errordatos &&
                      <div className="alert alert-danger">
                        <h6>Datos de usuario incorrectos</h6>
                      </div>
                    }

                    {
                      error &&
                      <div className="alert alert-danger">
                        <h6>No hay coneccion a internet</h6>
                      </div>
                    }

                    <div className="form-group text-center">
                      <div className="col-xs-12 p-b-20">
                        <button
                          onClick={handleLogin}
                          disabled={espera}
                          className="btn btn-block btn-lg btn-info"
                        >
                          Entrar
                        </button>
                      </div>

                    </div>
                    <h6 className='mt-4'>© Vefase 2022</h6>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>    
       
	);  
}

export default Login;
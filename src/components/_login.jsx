import React, {useState} from 'react';
import './../assets/css/login.css';
import { useRef } from 'react';

const URL_LOGIN = "http://localhost/api/login/login.php"

const enviarData = async (url,data) =>{
    
const resp = await fetch(url,{
        method:'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    });
    //console.log(resp);
    const json = await resp.json();
    //console.log(json);

    return json;
    
}


export default function Login(props) {

    const [error,setError] = useState(null);
    const [espera,setEspera] = useState(false);

    const refUsuario = useRef(null);
    const refPass = useRef(null);

    const handleLogin = async() =>{
        setEspera(true);
        const data = {
            "usuario":refUsuario.current.value,
            "clave":refPass.current.value,
        }
        console.log(data);
        const respuestaJson = await enviarData(URL_LOGIN,data);
        console.log("respuesta desde el evento", respuestaJson);

        props.acceder(respuestaJson.conectado)
        setError(respuestaJson.error)
        setEspera(false);
    }

	return (
		
        <div className="container">
        <div className="login-register">
          <div className="row">
          <div className="col-sm-4 offset-4 mt-5">
          <div className="login-box card mt-5">  
            <div className="card-body mt-4">
              <div className="form-horizontal form-material text-center">
                <div className="form-group ">
                  <div className="col-sm-12">
                    <input
                      className="form-control"
                      name="username"
                      type="text"
                      required=""
                      placeholder="Usuario"
                      ref={refUsuario}
                    />{" "}
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input
                      className="form-control"
                      name="password"
                      type="password"
                      required=""
                      placeholder="Password"
                      ref={refPass}
                    />{" "}
                  </div>
                </div>

               {
                   error &&
                   <div className="alert alert-danger">
                      {error}
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
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
        </div>
		
	);
}

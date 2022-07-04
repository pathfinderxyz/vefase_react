import React from "react";
import Card from "react-bootstrap/Card";
import loading from '../assets/img/loading.gif';

const CargandoPermisos= () => {
  return (
    <div>
      <div>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">Cargando ...</Card.Header>
            <Card.Body>
              
              <Card.Text>
                Verificando permisos !
              </Card.Text>
              <div className='text-center'>
                  {/*  <h5>Cargando</h5> */}
                <img 
                  src={loading} 
                  alt='cargando'
                  width={100}
                  />
                  </div>
            </Card.Body>
          </Card>
      </div>
    </div>
  );
};

export default CargandoPermisos;
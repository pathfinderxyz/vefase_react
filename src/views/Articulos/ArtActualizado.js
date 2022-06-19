import React from "react";
import Sidebar from "./../../components/sidebar";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const ArticuloActualizado = () => {
  return (
    <div>
      <div>
        <Sidebar>
        <div className="col-md-7">
          <Card>
          <Card.Header className="bg-success text-white text-center">
          <h3>Articulo Actualizado</h3>
            </Card.Header>
            <Card.Body>
              <Card.Title className="text-center"> ¡El articulo fue actualizado con exito! ¿que desea realizar?</Card.Title>
              <Card.Text className="text-center mb-3">
               <br></br>
                <Link className="btn btn-success mr-1 mt-1" to="/articulos/registrar">Registrar articulos</Link>
                <Link className="btn btn-success ml-1 mt-1" to="/articulos">Ver articulos</Link>
            
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
        </Sidebar>
      </div>
    </div>
  );
};

export default ArticuloActualizado ;
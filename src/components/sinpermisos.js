import React from "react";
import Card from "react-bootstrap/Card";

const SinPermisos= () => {
  return (
    <div>
      <div>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">No esta Autorizado</Card.Header>
            <Card.Body>
              <Card.Title>¡Usted no tiene permisos para acceder a este modulo!</Card.Title>
              <Card.Text>
                Debe comunicarse con el personal de soporte para que le asigne los permisos correspondientes.
              </Card.Text>
            </Card.Body>
          </Card>
      </div>
    </div>
  );
};

export default SinPermisos;
import React from "react";
import Card from "react-bootstrap/Card";
import Sidebar from "../../components/sidebar";

const Bitacora= () => {
  return (
    <div>
    <Sidebar>
          <Card>
          <Card.Header className="bg-dark text-white" as="h3">Bitacora</Card.Header>
            <Card.Body>
              <Card.Title>Historial de todas las funciones realizadas en el sistema</Card.Title>
              <Card.Text>
               En desarrollo !
              </Card.Text>
            </Card.Body>
          </Card>
          </Sidebar>
    </div>
  );
};

export default Bitacora;
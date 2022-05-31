import React from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";

const Usuarios= () => {
  return (
    <div>
      <div>
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">Usuarios</Card.Header>
            <Card.Body>
              <Card.Title>¡Sistema en construcción!</Card.Title>
              <Card.Text>
                En estos momentos nos encontramos migrando la APP a Reactjs.
              </Card.Text>
            </Card.Body>
          </Card>
        </Sidebar>
      </div>
    </div>
  );
};

export default Usuarios;
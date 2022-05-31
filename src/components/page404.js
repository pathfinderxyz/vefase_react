import React from "react";
import Card from "react-bootstrap/Card";

const Page404 = () => {
  return (
    <div>
      <Card className="text-center">
      
        <Card.Body>
          <Card.Title><h1>Page 404</h1></Card.Title>
          <Card.Text>
            <h3>¡pagina no encontrada!</h3>
          </Card.Text>
        </Card.Body>
        
      </Card>
    </div>
  );
};

export default Page404;

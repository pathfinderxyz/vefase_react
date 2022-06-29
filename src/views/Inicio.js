import React from "react";
import Sidebar from "../components/sidebar";
import Card from "react-bootstrap/Card";
import LineChart from "./graficas/lineal";
import BarChart from "./graficas/barchart";
import LineChartS from "./graficas/segmento";
import LineChartG from "./graficas/segmentogradiente";

const Inicio = () => {
  return (
    <div>
      <div>
        <Sidebar>
          <div className="row">
            <div className="col-md-6">
          <Card>
            <Card.Header className="bg-dark text-white" as="h4">Ventas 2022</Card.Header>
            <Card.Body>
              <Card.Title>Grafico de ventas</Card.Title>
              <Card.Text>
                    <LineChart/>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
          <div className="col-md-6">
          <Card>
            <Card.Header className="bg-cyan text-white" as="h4">Produccion</Card.Header>
            <Card.Body>
              <Card.Title>Grafica de produccion</Card.Title>
              <Card.Text>
                    <BarChart/>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
          <div className="col-md-6">
          <Card>
            <Card.Header className="bg-warning text-white" as="h4">Compras</Card.Header>
            <Card.Body>
              <Card.Title>Grafica de compras</Card.Title>
              <Card.Text>
                    <LineChartS/>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
          <div className="col-md-6">
          <Card>
            <Card.Header className="bg-primary text-white" as="h4">Alcance 2022</Card.Header>
            <Card.Body>
              <Card.Title>Grafico de alcance 2022</Card.Title>
              <Card.Text>
                    <LineChartG/>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
          </div>
        </Sidebar>
      </div>
    </div>
  );
};

export default Inicio;

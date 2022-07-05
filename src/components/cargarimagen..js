import React, { useState} from "react";
import Card from "react-bootstrap/Card";
import Sidebar from "./sidebar";
import axios from "axios";

const url = "https://api.vefase.com/public/imagen";

const CargarImagen = () => {

  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(file);

  const [Error, setError] = useState(false);

  const peticionPost = () => {
    let formData = new FormData();
    formData.append("file", file);
    axios.post(url, formData, {
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

  return (
    <div>
      <div>
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              Subir imagen
            </Card.Header>
            <Card.Body>
              <Card.Title>subir imagen</Card.Title>
              <Card.Text>imagen</Card.Text>

              <div className="form-group">
                <input
                  className="form-control"
                  type="file"
                  name="img"
                  onChange={handleFile}
                />
                <br />
              </div>
              <br></br>
              <button
                className="btn btn-success"
                onClick={() => peticionPost()}
              >
                Insertar
              </button>
            </Card.Body>
          </Card>
        </Sidebar>
      </div>
    </div>
  );
};

export default CargarImagen;

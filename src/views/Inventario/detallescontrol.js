import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import Cargando from "../../components/cargando";
import { Link, useParams } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';

const url = "https://api.vefase.com/public/inventario/detallesxcontrol";

const DetallesControl = () => {
  let { id } = useParams();
  console.log(id);

  //////////////Iniciando Status data//////////////////////////
  const [data, setData] = useState([]);

  /////////////////Datatable/////////////////////////////////

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const [pending, setPending] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(data);
      setPending(false);
    }, 100);
    return () => clearTimeout(timeout);
  });

  const columns = [
    {
      name: 'Codigo Inv',
      selector: (row) => row.id,
      defaultSortAsc: true,
      sortable: true,
    },
    {
      name: 'Codigo',
      selector: (row) => row.codigo,
    },
    {
      name: 'Serial',
      selector: (row) => row.serialc,
    },
    {
      name: 'Color',
      selector: (row) => row.color,
    },
    {
      name: 'Articulo',
      selector: (row) => row.id_articulo,
    },
    {
        name: 'Stock',
        selector: (row) => row.stock,
    },
    {
        name: 'Status',
        selector: (row) =>
        <Badge bg={status[row.status]} text="light">{row.status}</Badge>
    }
  ];
  /////////////Buscar datos//////////////////////////////////
  const [buscar, setBuscar] = useState("");
  const [filtrobuscar, setFiltroBuscar] = useState([]);

  useEffect(() => {
    const result = data.filter((resultdata) => {
      return resultdata.status.toLowerCase().match(buscar.toLowerCase());
    });
    setFiltroBuscar(result);
  }, [buscar, data]);



  /////////////Mostrar datos//////////////////////////////////
  const peticionGet = async () => {
    await axios.get(url+'/'+id).then(response => {
      console.log(response.data);
      setData(response.data);
      setFiltroBuscar(response.data);
     
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGet();
  }, []);

 
   ////////////////badge///////////////////
  
   let status={
    'PENDIENTE':"warning",
    'PROCESADO':"success",
    'REALIZADO':"primary",
    'ELIMINADO':"danger",
  }

  /////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="DetallesControl">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                Detalles del control de inventario #{id}
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <Link type="button" className="btn btn-warning text-dark" to={"/inventario/control/detalles/"+id}>
                    <FaIcons.FaPencilAlt/> Seguir Editando
                    </Link>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>
              <div className='row'>
                <div className='col-md-6'>
                Articulos registrados en el control de inventario
                </div>
                
                </div>
                </Card.Title>
             
              <p>Estos son todos los articulos registrados en este control de inventario</p>
              <DataTable
                columns={columns}
                data={filtrobuscar}
                noDataComponent="No hay datos registrados en estos momentos"
                progressPending={pending}
                progressComponent={<Cargando />}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    placeholder="Buscar"
                    className="w-25 form-control"
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                  />
                }
              />
            </Card.Body>
          </Card>
        </Sidebar>
      </div>
    </div>
  );
};

export default DetallesControl;
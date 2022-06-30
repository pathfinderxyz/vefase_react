import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as FaIcons from "react-icons/fa";
import Cargando from "../../components/cargando";
import { Link, useParams } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';

const url = "https://api.vefase.com/public/compras/detallesxcompra";
const urldcsuma = "https://api.vefase.com/public/compras/detalles/sum";

const ReportCompra = () => {
  let { idcompra } = useParams();
  console.log(idcompra);

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
      name: 'Codigo',
      selector: (row) => row.id,
      defaultSortAsc: true,
      sortable: true,
    },
    {
      name: 'Codigo compra',
      selector: (row) => row.idcompra,
    },
    {
      name: 'Articulo',
      selector: (row) => row.nombre_articulo,
    },
    {
      name: 'Cantidad',
      selector: (row) => row.cantidad,
    },
    {
      name: 'Costo',
      selector: (row) => row.costo,
    },
    {
        name: 'Total',
        selector: (row) => row.total,
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
      return resultdata.nombre_articulo.toLowerCase().match(buscar.toLowerCase());
    });
    setFiltroBuscar(result);
  }, [buscar, data]);



  /////////////Mostrar datos//////////////////////////////////
  const peticionGet = async () => {
    await axios.get(url+'/'+idcompra).then(response => {
      console.log(response.data);
      setData(response.data);
      setFiltroBuscar(response.data);
     
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGet();
  }, []);

  ///////////////Suma total//////////////////////////////////
  const [dataTotal, setDataTotal] = useState([]);

  const peticionGetSum = async () => {
    await axios.get(urldcsuma+'/'+idcompra).then((response) => {
      setDataTotal(response.data[0]);
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await peticionGetSum();
    // eslint-disable-next-line
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
      <div className="ReportCompra">
        <Sidebar>
          <Card>
            <Card.Header className="bg-dark text-white" as="h3">
              <div className='row'>
                <div className='col-md-6'>
                Detalles de la compra #{idcompra}
                </div>
                <div className='col-md-6'>
                  <div className="text-right">
                    <Link type="button" className="btn btn-warning text-dark" to={"/compras/detalles/"+idcompra}>
                    <FaIcons.FaPlus/> Seguir Editando
                    </Link>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>
              <div className='row'>
                <div className='col-md-6'>
                Informacion de la compra
                </div>
                <div className='col-md-6'>
                <p className="text-right">Total: {dataTotal.total}</p>
                </div>
                </div>
                </Card.Title>
             
              <p>Estos son todos los articulos registrados en la compra</p>
              <DataTable
                columns={columns}
                data={filtrobuscar}
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

export default ReportCompra;
import React, { useState } from 'react';
import Login from './components/Login';
import Inicio from './views/Inicio';


const App = () => {

    const [conectado, setConectado] = useState(false);

	const acceder  = (estado)=>{
		setConectado(estado)
	}

	return (
		conectado ? <Inicio/> : <Login acceder={acceder}/>
	);
} 



 
export default App;

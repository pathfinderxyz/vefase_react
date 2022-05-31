/* import React, { useState } from 'react'; */
import React from 'react';
import Login from './components/login';
/* import Inicio from './components/Inicio'; */


/* const App = () => {

    const [conectado, setConectado] = useState(false);

	const acceder  = (estado)=>{
		setConectado(estado)
	}

	return (
		conectado ? <Inicio/> : <Login acceder={acceder}/>
	);
} */

const App = () => {
	return (
		
		<div>
			<div>
			   <Login/>
			</div>
		</div>
		
	);
}

 
export default App;
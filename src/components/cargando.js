import React, { Component } from 'react';
import loading from '../assets/img/loading.gif';

class Cargando extends Component {
    render() {
        return (
            <div>
               <div className='text-center'>
                  {/*  <h5>Cargando</h5> */}
                <img 
                  src={loading} 
                  alt='cargando'
                  className="w-25"
                  />
                  </div>
            </div>
        );
    }
}

export default Cargando;
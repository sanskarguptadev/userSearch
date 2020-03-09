import React from 'react';
import './input.css';

const input = (props) => {
    return(
        <div className='search'>
          <input type='text' placeholder='Search Here' onChange={props.change}/>
        </div>
    )
};

export default input;
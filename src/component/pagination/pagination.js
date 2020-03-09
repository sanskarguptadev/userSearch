import React from 'react';
import './pagination.css';

const Pagination = (props) =>{
    return (
    <button 
      className='btn'
      onClick={props.onClick} 
      value={props.name}>
        {props.name}
    </button>
    )
  }

export default Pagination
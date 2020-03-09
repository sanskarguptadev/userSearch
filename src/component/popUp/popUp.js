import React from 'react';  
import './popUp.css';  

class Popup extends React.Component {  
  render() {  
        return (  
        <div className='popup' onClick={this.props.closePopup}>  
            <div className='popupinner'>
                <div id='main'>
                    <div id='details'>
                        <div className='name'>
                         {this.props.text.first_name} {this.props.text.last_name}
                        </div>
                        <div className='email'>
                         {this.props.text.email}
                        </div>
                    </div>
                    <div className='image'>
                        <img id='pic' alt='userpic' src={this.props.text.avatar} />
                    </div>
                </div>
            </div>  
        </div>  
        );  
    }  
}  

export default Popup;
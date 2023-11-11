import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../Data/images/logofr.svg'
function Footer(){
    return(
      
        <div className='footer'>
                      
                    <div className='footer-left'>
                        <div>
                            <img src={logo} alt={"logo"}></img>
                        </div>
                        <div className='ftr-logo-text'>
                            <h4>Built &</h4>
                            <h4>Designed</h4>
                        </div>
                    </div>
                    
                    <div className='footer-right'>
                        <Link to='/about' style={{ textDecoration: 'none' , color: 'white'}}> <h4>TEMPLATES</h4> </Link>
                        <Link to='/' style={{ textDecoration: 'none' , color: 'white'}}><h4>HOME</h4> </Link>
                        <Link to='/build' style={{ textDecoration: 'none' , color: 'white'}}><h4>CREATE</h4></Link>
                    </div>
              
        </div>
    )
}

export default Footer

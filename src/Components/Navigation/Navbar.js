import React from 'react'
import {FileEarmarkTextFill} from 'react-bootstrap-icons'
import {Link} from 'react-router-dom'

function NavBar(){
    return(
      
        <div className='build-nav'>
                      
                    <div className='nav-left'>AceResume</div>
                    
                    <div className='nav-right'>
                        <Link to='/about' style={{ textDecoration: 'none' , color: 'white'}}>Templates</Link> 
                        <button>
                            Login
                        </button>
                    </div>
              
        </div>
    )
}

export default NavBar

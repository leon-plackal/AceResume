import React from 'react'
import { Link } from 'react-router-dom'
import acelogo from '../Data/images/aceresume.png'

function NavBar() {
    return (

        <div className='build-nav'>

            <div className='nav-left'>
                <img src={acelogo} alt={"logo"}/>
            </div>

            <div className='nav-right'>
                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>HOME</Link>
                <Link to='/about' style={{ textDecoration: 'none', color: 'white' }}>TEMPLATES</Link>
                <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
                    <button>
                        Login
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default NavBar

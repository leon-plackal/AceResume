import React from 'react'
import { FileEarmarkTextFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function NavBar() {
    return (

        <div className='build-nav'>

            <div className='nav-left'>AceResume</div>

            <div className='nav-right'>
                <Link to='/about' style={{ textDecoration: 'none', color: 'white' }}>Templates</Link>
                <Link to='/preview' style={{ textDecoration: 'none', color: 'white' }}>
                    <button>
                        Export
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default NavBar

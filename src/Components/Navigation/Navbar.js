import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (

        <div className='build-nav'>

            <div className='nav-left'>AceResume</div>

            <div className='nav-right'>
                <Link to='/about' style={{ textDecoration: 'none', color: 'white' }}>Templates</Link>
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

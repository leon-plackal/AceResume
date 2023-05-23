import React from 'react'
import NavBar from '../Navigation/Navbar'
//this Home component is rendering various resume templates on to the screen and the user can select either of them and proceed further. 
function Home() {

    return (
        <div className='background-2'>
            <div><NavBar></NavBar></div>
            <section id='home-header'>
                <div className='' style={{height:'100vh'}}>
                    <h1>Coming Soon!</h1>
                </div>

            </section>
        </div>

    )
}

export default Home

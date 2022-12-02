import { useState } from 'react'
import Header from '../partials/Header'
import Main from '../components/Home/Main'
import Footer from '../partials/Footer'

function Home() {

  return (
    <div style={{height:'100%'}}>
        <div style={{height:'15%'}}>
            <Header/>
        </div>
        <div style={{height:'75%'}}>
            <Main/>
        </div>
        <div style={{height:'10%'}}>
            <Footer/>
        </div>
    </div>
  )
}

export default Home

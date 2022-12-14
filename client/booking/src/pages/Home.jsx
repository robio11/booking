import React from 'react'
import Navbar from '../components/navbar/Navbar';
import Header from '../components/header/Header';
import './Home.css';
import Featured from '../components/featured/Featured';
import Propertly from '../components/propertly/Propertly';
import FeaturedProperties from '../components/featuredProperties/FeaturedProperties';
import MailList from '../components/mailList/MailList';
import Footer from '../components/footer/Footer';

function Home() {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
            <Featured/>
            <h1 className="homeTitle">Browse by  property type</h1>
            <Propertly/>
            <h1 className="homeTitle">Homes guests love</h1>
            <FeaturedProperties/>
            <MailList/>
            <Footer/>
        </div>
        </div>
  )
}


export default Home
import React from 'react';
import { faLocationDot, faChevronCircleLeft, faCircleChevronRight, faFileCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import useFetch from '../../components/hooks/useFetch';
import MailList from '../../components/mailList/MailList';
import Navbar from '../../components/navbar/Navbar';
import { SearchContext } from '../../context/SearchContext';
import './Hotel.css';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

function Hotel() {

  const location = useLocation();

  const id = location.pathname.split('/')[2];

  const [sliderNumber, setSliderNumber] = useState(0);

  const [open, setOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const { dates, options } = useContext(SearchContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setSliderNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSliderNumber;
    if (direction === 'l') {
      newSliderNumber = sliderNumber === 0 ? 5 : sliderNumber - 1
    }
    else {
      newSliderNumber = sliderNumber === 5 ? 0 : sliderNumber + 1
    }
    setSliderNumber(newSliderNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate('/login')
    }
  };

  return (
    <div>
      <Navbar />
      <Header type='list' />
      {loading ? ('loading') : (
        <div className="hotelContainer">
          {open && <div className="slider">
            <FontAwesomeIcon className='close' icon={faFileCircleXmark} onClick={() => setOpen(false)} />
            <FontAwesomeIcon className='arrow' icon={faChevronCircleLeft} onClick={() => handleMove("l")} />
            <div className="silderWrapper">
              <img className='sliderImg' src={data.photos[sliderNumber]} alt="" />
            </div>
            <FontAwesomeIcon className='arrow' icon={faCircleChevronRight} onClick={() => handleMove("r")} />
          </div>}
          <div className="hotelWrapper">
            <button className='bookNow' >Reserve or Book Now!</button>
            <h1 className="hotleTilte">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
              <span className="hotelDistance">Excellent location - {data.distance}m from center</span>
              <span className="hotelPriceHeightlight">Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
              <div className="hotelImage">
                {data.photos?.map((photo, i) => (
                  <div onClick={() => handleOpen(i)} className="hotelImgWrapper" key={i}>
                    <img src={photo} alt="" className="hotelImg" />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsText">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className='hotelDesc' >
                    {data.desc}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et corrupti earum ipsam.</span>
                  <h2>
                    <b>${days * data.cheapestPrice * options.room}</b>({days}{''} nights)
                  </h2>
                  <button onClick={handleClick} >Reserve or Book</button>
                </div>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  )
}

export default Hotel
import React from 'react'
import useFetch from '../hooks/useFetch';
import './Featured.css';

function Featured() {

  const {data,loading,error} = useFetch('/hotels/countByCity?cities=berlin,madrid,london');
  // console.log(data);

  return (
    <div className='featured' >
      {loading ? ("Loading please wait") :(
        <> <div className="featuredItem">
        <img className='featuredImg' src="https://www.ourescapeclause.com/wp-content/uploads/2019/08/Ireland-24.jpg" alt="" />
        <div className="featuredTitles">
          <h1>Berlin</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img className='featuredImg' src="https://cdn.britannica.com/51/117751-050-1B1627AA/Texas-State-Capitol-Austin.jpg" alt="" />
        <div className="featuredTitles">
          <h1>Madrid</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div  className="featuredItem">
        <img className='featuredImg' src="https://upload.wikimedia.org/wikipedia/commons/4/41/Reno_arch.jpg" alt="" />
        <div className="featuredTitles">
          <h1>London</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div> </>)}
    </div>
  )
}

export default Featured
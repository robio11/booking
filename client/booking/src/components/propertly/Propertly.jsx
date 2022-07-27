import React from 'react';
import './Propertly.css';
import useFetch from '../hooks/useFetch';

function Propertly() {

    const { data, loading, error } = useFetch('/hotels/countByType');
    //   console.log(data);
    const images = [
        'https://www.ihgplc.com/en/-/media/ihg/images/brands/regent/regent_carousel_1.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/1e/AIMCO_apartment_interior.jpg',
        'https://www.holidify.com/images/cmsuploads/compressed/27494946425_1fb0d9b619_h_20181213175425.jpg',
        'https://is1-2.housingcdn.com/4f2250e8/9096a6794223415f1eb954424919c400/v0/fs/morton_villas-suraram-hyderabad-my_square_construction.jpeg',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/64/1a/36/walnut-cabin.jpg?w=900&h=-1&s=1',
    ];
    return (
        <div className='pList' >
            {loading ? ('loading') : (
                <>
                {data && images.map((img,i) =>
                    
                    <div className="pListItem" key={i}>
                        <img className='pListImg' src={img} alt="" />
                        <div className="pListTitles">
                            <h1>{data[i]?.type}</h1>
                            <h2>{data[i]?.count} {data[i]?.type} </h2>
                        </div>
                        </div>
                        )}
                    </>)}
        </div>
    )
}

export default Propertly
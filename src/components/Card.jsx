import React from 'react'
import { Link } from 'react-router-dom';

const Card = (props) => {
    const { info } = props
    console.log(info)
    return (
        <div className="carddiv ">
            <div className=" mt-3 ">
                <div > <Link className="text-decoration-none text-muted fs-5 px-2" to={`/pair/${info.id}`}  state={{ info:{info}}} ><span >{info.id.slice(0,-4)}</span></Link></div>
           
            </div>
        </div>
    )
}

export default Card

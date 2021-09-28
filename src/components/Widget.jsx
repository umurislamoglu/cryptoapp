import React from 'react'

const Widget = (props) => {
    return (
        <div className="widget d-flex flex-row text-light" style={{"background":`${props.color}`}}>
            <i className={`${props.icon} col-4 fs-1 mt-2 ms-3`} ></i>
            <div className="d-flex flex-column align-items-between col-7 me-5 ">
            <p className="mt-2 ms-2 fs-5 text-light me-3  d-flex justify-content-end">{props.title}   </p>
            <p className=" mb-2 fs-2 d-flex justify-content-end me-3" ><span>{props.data}</span></p>
            </div>
           
        </div>
    )
}

export default Widget

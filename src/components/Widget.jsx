import React from 'react'

const Widget = (props) => {
    return (
        <div className="widget d-flex flex-column text-light" style={{"background":`${props.color}`}}>
            <p className="mt-2 ms-2 fs-5">{props.title}</p>
            <p className="ms-5 mb-2 fs-2">{props.data}</p>
        </div>
    )
}

export default Widget

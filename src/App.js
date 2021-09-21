import './App.css';
import {getPrice} from './websocket/webSocket';
import React , {useState , useEffect} from 'react'


function App() {


  const [price , setPrice] = useState("")

  useEffect(()=>{
    let str = `wss://stream.binance.com:9443/ws/etheur@trade`
    let ws = new WebSocket(str)
    ws.onmessage = (e) => {
        let stockObject =JSON.parse(e.data)
        setPrice(stockObject.p)
    }
   
  },[])


  return (
    <div className="App">
        <span>Etherium(EUR) :</span><span>{price}</span>
    </div>
  );
}

export default App;

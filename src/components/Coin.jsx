import React , {useState , useEffect , useRef } from 'react'


const Coin = (props) => {

  const [pastData, setpastData] = useState({});
  const [price, setprice] = useState("0.00");
  const [pair, setpair] = useState("");
  const ws = useRef(null);
    

const { first , coin} = props
  useEffect(() => {

    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
   
    if (!first.current) {
      
        return;
      }
  
    
    let msg = {
      type: "subscribe",
      product_ids: [coin.id],
      channels: ["ticker"]
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }

      if (data.product_id === coin.id) {
        setprice(data.price);
      }
    };
  }, [coin.id]);
//   useEffect(()=>{
//     let str = `wss://stream.binance.com:9443/ws/${props.coin.toLowerCase()}@trade`
//     let ws = new WebSocket(str)
//     ws.onmessage = (e) => {
//         let stockObject =e.data
//         setPrice(stockObject.p)
//         setCoinAlias(stockObject.s.substring(0,stockObject.s.length-props.currency.length))
// console.log(stockObject)
//     }
//   },[])
    return (
        <div className="col-md-4 col-sm-6 col-lg-3">
            <div className="card mt-3 ">
                <div className="card-header"> <span> {coin.base_currency}:</span></div>
                <div className="card-body d-flex flex-row justify-content-between px-5">
                  
                   
                    <span>{price}</span>
                    
                    
                
                
                <span>{props.currency}</span>
                </div>
            

            </div>
        </div>
    )
}

export default Coin

import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { formatData } from "../utils";

const Pair = (props) => {
  const [price, setPrice] = useState(0.0);
  const [productId, setProductId] = useState("");
  const [openingPrice, setOpeningPrice] = useState(0.0);
  const [pair, setPair] = useState(props.match.params.id);
  const [pastData, setpastData] = useState({});
  const [priceArr , setPriceArr] = useState([])
  const ws = useRef(null);
  let first = useRef(false);

  useEffect(() => {
    first.current = true;
  }, []);

  useEffect(() => {
    if (!first.current) {
      return;
    }

    let unmounted = false;
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    setTimeout(() => {
      if (ws.current.readyState === 1) {
        let msg = {
          type: "subscribe",
          product_ids: [pair],
          channels: [
            "ticker",
            {
              name: "ticker",
              product_ids: [pair],
            },
          ],
        };

        let jsonMsg = JSON.stringify(msg);
        ws.current.send(jsonMsg);

        

        ws.current.onmessage = (e) => {
          let data = JSON.parse(e.data);
          setPrice(data.price);
          setProductId(data.product_id);
          setOpeningPrice(data.open_24h);
        };

        console.log("bağlandı");
      } else {
        console.log("bağlanamadı");
      }
      ws.current.onerror = function (event) {
        console.error("WebSocket error observed:", event);
      };
    }, 2000);



    //Historical Data Fetching
    let historicalDataURL = `https://api.pro.coinbase.com/products/${pair}/candles?granularity=86400`;
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));
      
      let formattedData = formatData(dataArr);
      setpastData(formattedData);
    };

    
    fetchHistoricalData();


    return () => {
      unmounted = true;
    };
  }, []);
  useEffect(() => {
    let priceArray = priceArr
    priceArray.push(price)
    setPriceArr(priceArray)
  }, [price])

  

  const handleClose = () => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: [
        "ticker",
        {
          name: "ticker",
          product_ids: [pair],
        },
      ],
    };
    let unsub = JSON.stringify(unsubMsg);
    ws.current.send(unsub);

    setPair("");

    props.history.goBack();
  };

  const opts = {
    tooltips: {
      intersect: false,
      mode: "index"
    },
    responsive: true,
    maintainAspectRatio: false
  };

  let priceDiffPercentage = (((priceArr[priceArr.length-1]-priceArr[priceArr.length-2])/priceArr[priceArr.length-2])*100).toFixed(3)

 
 


  return (
    <div className="container">
      <div className="card h-75 mb-5"  > 
        <div className=" cardheader fw-normal fs-2 text d-flex flex-row justify-content-between px-5" style={{ "border":"none"}}>
          <div className="d-flex flex-column">
          <span>{productId}</span>
          <span> Price: {price}</span>
          <span className="text-muted"> Opening Price: {openingPrice}</span>
          </div>
          <div className="d-flex align-items-center justify-content-center">
              {
                  priceDiffPercentage<0?(<span className="badge rounded-pill bg-danger">{priceDiffPercentage}%</span>):(<span className="badge rounded-pill bg-success">+{priceDiffPercentage}%</span>)
              }
          </div>
        </div>
        <div className="card-body">
            <div className="dashboard">
            <div className="chart-container">
        <Line data={pastData} options={opts} />
      </div>
      
            </div>
        
        </div>
        <div className=" cardfooter d-flex justify-content-center" style={{ "border":"none"}}>
          <button className="btn btn-outline-success rounded px-5"  onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Pair;

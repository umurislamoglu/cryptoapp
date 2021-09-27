import React, { useState , useEffect  ,useRef} from "react";
import Coin from "./Coin";



const CoinList = () => {

  const [currencies, setCurrencies] = useState([]);
  const [usdCurrencies, setUsdCurrencies] = useState([]);
  const [eurCurrencies, setEurCurrencies] = useState([]);
  const [gbpCurrencies, setGbpCurrencies] = useState([]);


  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";

  useEffect(() => {

    let pairs = [];

    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));
      
      let usdFiltered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair;
        }
      });

      usdFiltered = usdFiltered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      
      setUsdCurrencies(usdFiltered);



      let eurFiltered = pairs.filter((pair) => {
        if (pair.quote_currency === "EUR") {
          return pair;
        }
      });

      eurFiltered = eurFiltered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      
      setEurCurrencies(eurFiltered);


      
      let gbpFiltered = pairs.filter((pair) => {
        if (pair.quote_currency === "GBP") {
          return pair;
        }
      });

      gbpFiltered = gbpFiltered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      
      setGbpCurrencies(gbpFiltered);




      

      first.current = true;
    };

    apiCall();
  }, []);


  
//   const [coinPairs , setCoinsPairs] = useState([])
//   const [usdCoins , setUsdCoins] = useState([])
//   const [eurCoins , setEurCoins] = useState([])
//   const [tryCoins , setTryCoins] = useState([])
//   const [display , setDisplay] = useState("EUR")

//   useEffect(() => {
//     axios.get("https://api.binance.com/api/v1/exchangeInfo").then((res) => {
//     let symbols = res.data.symbols
//     let coins = []
//     symbols.forEach((x)=>{
         
//       coins.push(x.symbol)
      
//   })
//   setCoinsPairs(coins)
//   let  eurCoinsT = []
//   coins.forEach((coinPair)=>{
    
//      if(coinPair.substr(coinPair.length - 3) === "EUR"){
//        eurCoinsT.push(coinPair)
//      }
    

//    })
//    setEurCoins(eurCoinsT)
 
   
//    let  usdCoinsT = []
//    coins.forEach((coinPair)=>{
     
//       if(coinPair.substr(coinPair.length - 4) === "USDT"){
//         usdCoinsT.push(coinPair)
//       }
     
 
//     })
//     setUsdCoins(usdCoinsT)

//     let  tryCoinsT = []
//     coins.forEach((coinPair)=>{
      
//        if(coinPair.substr(coinPair.length - 3) === "TRY"){
//         tryCoinsT.push(coinPair)
//        }
      
  
//      })
//      setTryCoins(tryCoinsT)
  

//   })},[])



// console.log(coinPairs)
// console.log(eurCoins)
// console.log(usdCoins)
// console.log(tryCoins)
// console.log(display)
   
const handleSelect =(e) => {
  if(e.target.value === "EUR") {
    setCurrencies(eurCurrencies)
  } else if (e.target.value === "USD") {
    setCurrencies(usdCurrencies)

  } else  {
    setCurrencies(gbpCurrencies)

  }
}
console.log(currencies)


  return (
    <div>
    <select className="form-select" onChange = {handleSelect}>
  <option defaultValue>Choose currency</option>
  <option value="EUR">EUR</option>
  <option value="USD">USD</option>
  <option value="GBP">GBP</option>
</select>
{
<div className = "row">
  {
   currencies.map((val,idx)=> {
return <Coin key={idx} coin={val}  first = {first}/>
   }) 
  }
  </div>
}




    </div>
    // <div className="container">
    //   <div className="d-flex flex-row justify-content-evenly mt-3" >
    //     <button className="btn btn-primary  " style={{ width: "10rem" }} onClick={()=>{setDisplay("EUR")}}>EUR</button>
    //     <button className="btn btn-primary  " style={{ width: "10rem" }} onClick={()=>{setDisplay("USDT")}}>USDT</button>
    //     <button className="btn btn-primary  " style={{ width: "10rem" }} onClick={()=>{setDisplay("TRY")}}>TRY</button>
    //   </div>










      
        // {display==="EUR" &&
        //     (<div className="row ">
        //         {eurCoins.map((coin, idx) => {
        //           return <Coin key={idx} coin={coin} currency={display} />;
        //         })}
        //       </div>)}{

        //       display==="USDT" &&
        //       (<div className="row ">
        //           {usdCoins.map((coin, idx) => {
        //             return <Coin key={idx} coin={coin} currency={display} />;
        //           })}
        //         </div>)
        // }
        // {
                
        //         display==="TRY" &&
        //         (<div className="row ">
        //             {tryCoins.map((coin, idx) => {
        //               return <Coin key={idx} coin={coin} currency={display} />;
        //             })}
        //           </div>)
        //   }
        
      
    // </div>
  );
};







export default CoinList;

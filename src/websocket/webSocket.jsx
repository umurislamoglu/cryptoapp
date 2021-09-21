

export const getPrice = (coin , currency) => {
    let str = `wss://stream.binance.com:9443/ws/${coin}${currency}@trade`
    let ws = new WebSocket(str)
    ws.onmessage = (e) => {
        let stockObject =JSON.parse(e.data)
        return stockObject.p
    }
   
     
    
    
}
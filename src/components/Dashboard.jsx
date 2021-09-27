import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import Widget from "./Widget";

const Dashboard = () => {
  const [currencies, setCurrencies] = useState([]);
  const [usdCurrencies, setUsdCurrencies] = useState([]);
  const [eurCurrencies, setEurCurrencies] = useState([]);
  const [gbpCurrencies, setGbpCurrencies] = useState([]);
  const [news, setNews] = useState([]);
  const [clickedId, setClickedId] = useState("BTC-USD");
  const [clickedData, setClickedData] = useState({});

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

    const newsApiCall = () =>
      axios
        .get(
          "https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=30582ee0f42e4b48b68da929be86d4e2"
        )
        .then((res) => setNews(res.data.articles.slice(0, 3)));

    newsApiCall();

    apiCall();
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.pro.coinbase.com/products/${clickedId}/stats`)
      .then((res) => {
        setClickedData(res.data);
        console.log(clickedData);
      });
  }, [clickedId]);

  const handleSelect = (e) => {
    if (e.target.value === "EUR") {
      setCurrencies(eurCurrencies);
    } else if (e.target.value === "USD") {
      setCurrencies(usdCurrencies);
    } else {
      setCurrencies(gbpCurrencies);
    }
  };
  return (
    <div>
      {news.length && (
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <a href={news[0].url} target="_blank">
                <img
                  src={news[0].urlToImage}
                  className="d-block w-100 opacity-75"
                  alt="..."
                />
              </a>

              <div className="carousel-caption d-none d-md-block">
                <h5>{news[0].title}</h5>
                <p>{news[0].description}</p>
              </div>
            </div>
            <div className="carousel-item">
              <a href={news[1].url} target="_blank">
                <img
                  src={news[1].urlToImage}
                  className="d-block w-100 opacity-75"
                  alt="..."
                />
              </a>
              <div className="carousel-caption d-none d-md-block">
                <h5>{news[1].title}</h5>
                <p>{news[1].description}</p>
              </div>
            </div>
            <div className="carousel-item">
              <a href={news[2].url} target="_blank">
                <img
                  src={news[2].urlToImage}
                  className="d-block w-100 opacity-75"
                  alt="..."
                />
              </a>
              <div className="carousel-caption d-none d-md-block">
                <h5>{news[2].title}</h5>
                <p>{news[2].description}</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
      <div className="container mh-100">
        <div className="row mt-3">
          <div
            className="col-3 w-25 mt-3  overflow-auto "
            style={{ height: "40rem" }}
          >
            <select
              className="form-select mt-3 w-75 mx-auto"
              onChange={handleSelect}
            >
              <option defaultValue>Choose currency</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
            {currencies.map((curr, idx) => {
              return (
                <div
                  className="w-75 mx-auto px-auto"
                  onMouseEnter={() => {
                    setClickedId(curr.id);
                  }}
                  onMouseLeave={() => {
                    setClickedId("BTC-USD");
                  }}
                >
                  <Card info={curr} key={idx} />
                </div>
              );
            })}
          </div>

          <div className="col-9  w-75">
            <div className="card w-100 h-100 d-flex flex-column">
              <h3 className="align-self-center mb-5">24h Stats of currency</h3>
              <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-evenly mt-5">
                  <Widget
                    title="Opening Value:"
                    data={parseFloat(clickedData.open).toFixed(2)}
                    color={"#5DB0C2"}
                  ></Widget>
                  <Widget
                    title="Lowest Value:"
                    data={parseFloat(clickedData.low).toFixed(2)}
                    color={"#FF4C38"}
                  ></Widget>
                  <Widget
                    title="Highest Value:"
                    data={parseFloat(clickedData.high).toFixed(2)}
                    color={"#E6B414"}
                  ></Widget>
                </div>
                <div className="d-flex flex-row justify-content-evenly mt-5">
                  <Widget
                    title="Last Value:"
                    data={parseFloat(clickedData.last).toFixed(2)}
                    color={"#98B913"}
                  ></Widget>
                  <Widget
                    title="Volume for 30 days:"
                    data={parseFloat(clickedData.volume_30day).toFixed(2)}
                    color={"#C769B7"}
                  ></Widget>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

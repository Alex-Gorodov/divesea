import axios from "axios";
import { useState, useEffect } from "react";

export const useBtcPrice = () => {
  const [bitcoinData, setBitcoinData] = useState<any>(null);

  const fetchBitcoinData = () => {
    axios.get('https://api.coincap.io/v2/assets/bitcoin')
    .then(response => {
      setBitcoinData(response.data.data);
    })
    .catch(error => {
      console.error('Error fetching Bitcoin data:', error);
    });
  }

  useEffect(() => {
    fetchBitcoinData();
  }, []);

  return bitcoinData && Number(bitcoinData.priceUsd).toFixed(2);
}

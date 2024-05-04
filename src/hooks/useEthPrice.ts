import axios from "axios";
import { useState, useEffect } from "react";

export const useEthPrice = () => {
  const [ethereumData, setEthereumData] = useState<any>(null);
  
  const fetchEthereumData = () => {
    axios.get('https://api.coincap.io/v2/assets/ethereum')
    .then(response => {
      setEthereumData(response.data.data);
    })
    .catch(error => {
      console.error('Error fetching Ethereum data:', error);
    });
  }

  useEffect(() => {
    fetchEthereumData();
  }, []);

  return ethereumData && Number(ethereumData.priceUsd).toFixed(2);
}

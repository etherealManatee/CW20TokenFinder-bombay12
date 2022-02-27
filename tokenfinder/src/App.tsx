import { Component, createResource, createSignal } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const fetchData = async (data) => 
  (await fetch(`https://bombay-lcd.terra.dev/terra/wasm/v1beta1/contracts/${data}`)).json()


const App: Component = () => {
  const [address, setAddress] = createSignal("");
  const [data] = createResource(address, fetchData);

  const [name, setName] = createSignal("")
  const [symbol, setSymbol] = createSignal("")
  const [totalSupply, setTotalSupply] = createSignal("")

  

  const checkInput = () => {
    const details = document.getElementById("details")
    const error = document.getElementById("error")
    if (data().code) {
      error.style.display = "block"
      details.style.display = "none"
      return
    }
    setName(data().contract_info.init_msg.name)
    setSymbol(data().contract_info.init_msg.symbol)
    let decimals: number = data().contract_info.init_msg.decimals
    let totalSupplyWithDecimals: number = parseInt(data().contract_info.init_msg.mint.cap)
    // console.log(decimals, totalSupplyWithDecimals)
    let totalSupplyWithoutDecimals = (totalSupplyWithDecimals/(Math.pow(10,decimals)))
    // console.log(typeof totalSupplyWithoutDecimals)
    setTotalSupply(totalSupplyWithoutDecimals.toString())
    
    console.log(name(), symbol(), totalSupply())
    
    details.style.display = "block"
    error.style.display = "none"
    
  }

  return (
    <div class={styles.App}>
      <div class="container-md">
        <h1 class="p-5">CW20 Token Finder - Terra Bombay-12 Testnet</h1>
        <div>
          <input type="text" 
              placeholder='Search Token Address'
              onInput={(e)=>setAddress(e.target.value)}/>
          <button class="search_button" onClick={checkInput}>check</button>
        </div>
        
        <div class="card text-dark" style="display: none" id="details">
          <div class="card-body">
            <p class="card-text">{name() && `Name: ${name()}`}</p>
            <p class="card-text">{symbol() && `Symbol: ${symbol()}`}</p>
            <p class="card=text">{totalSupply() ? `Total Supply: ${totalSupply()}` : "Total Supply: N/A"}</p>
          </div>
        </div>
        <div class="card text-dark" style="display: none" id="error">
          <div class="card-body">
            <p class="card-text">The address you input does not exist. Please check and try again.</p>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default App;

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
    console.log(address())
    
    setName(data().contract_info.init_msg.name)
    setSymbol(data().contract_info.init_msg.symbol)
    setTotalSupply(data().contract_info.init_msg.mint.cap)
    
    console.log(name(), symbol(), totalSupply())
  }

  return (
    <div class={styles.App}>
      <h1>CW20 Token Finder - Terra Bombay-12 Testnet</h1>
        <div>
          <input type="text" 
              placeholder='Search Token Address'
              onInput={(e)=>setAddress(e.target.value)}/>
          <button onClick={checkInput}>check</button>
        </div>
        <div>
          <ul>{name() && `Name: ${name()}`}</ul>
          <ul>{symbol() && `Symbol: ${symbol()}`}</ul>
          <ul>{totalSupply() ? `Total Supply: ${totalSupply()}` : "Total Supply: N/A"}</ul>
        </div>
      
       <span>{data.loading && "fetching..."}</span>
    </div>
  );
};

export default App;

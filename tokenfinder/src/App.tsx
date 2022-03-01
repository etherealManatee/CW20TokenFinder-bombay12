import { Component, createResource, createSignal } from "solid-js";

//install prettier, ensure that i end everything with a ;

import styles from "./App.module.css";

const fetchData = async (data: string) => {
  try {
    const response = await (
      await fetch(
        `https://bombay-fcd.terra.dev/wasm/contracts/${data}/store?query_msg={%22token_info%22:{}}`
      )
    ).json();
  } catch (err) {
    console.log(err);
  }
};

const App: Component = () => {
  const [address, setAddress] = createSignal<string>("");
  const [data] = createResource(address, fetchData);

  //test out Show, if not class list
  //redeploy a contract that mints the correct amount
  //on enter for the input

  const [name, setName] = createSignal<string>("");
  const [symbol, setSymbol] = createSignal<string>("");
  const [totalSupply, setTotalSupply] = createSignal<string>("");

  //when user clicks on the search button after inputting address
  const checkInput = () => {
    const details = document.getElementById("details");
    const error = document.getElementById("error");
    //check if api has pulled information of a token
    if (data().code) {
      error.style.display = "block";
      details.style.display = "none";
      return;
    }
    setName(data().contract_info.init_msg.name);
    setSymbol(data().contract_info.init_msg.symbol);
    let decimals: number = data().contract_info.init_msg.decimals;
    let totalSupplyWithDecimals: number = parseInt(
      data().contract_info.init_msg.mint.cap
    );
    // console.log(decimals, totalSupplyWithDecimals)
    let totalSupplyWithoutDecimals =
      totalSupplyWithDecimals / Math.pow(10, decimals);
    // console.log(typeof totalSupplyWithoutDecimals)
    setTotalSupply(totalSupplyWithoutDecimals.toString());

    // console.log(name(), symbol(), totalSupply())
    details.style.display = "block";
    error.style.display = "none";
  };

  return (
    <div class={styles.App}>
      <div class="container-md">
        <div class="row">
          <h1 class="p-5 col align-self-center">CW20 Finder - Terra Testnet</h1>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search Token Address"
            onInput={(e) => setAddress(e.target.value)}
          />
          <button
            class="fa-solid fa-magnifying-glass"
            onClick={checkInput}
          ></button>
        </div>
        <div class="row">
          <div
            class="card text-dark m-5 col align-self-center"
            style="display: none;"
            id="details"
          >
            <div class="card-body">
              <p class="card-text">{name() && `Name: ${name()}`}</p>
              <p class="card-text">{symbol() && `Symbol: ${symbol()}`}</p>
              <p class="card=text">
                {totalSupply()
                  ? `Total Supply: ${totalSupply()}`
                  : "Total Supply: N/A"}
              </p>
            </div>
          </div>
          <div
            class="card text-dark mt-5 col align-self-center"
            style="display: none"
            id="error"
          >
            <div class="card-body">
              <p class="card-text">
                The address you input does not exist. Please check and try
                again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

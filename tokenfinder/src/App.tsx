import {
  Component,
  createResource,
  createSignal,
  Match,
  Switch,
} from "solid-js";

import styles from "./App.module.css";

const fetchData = async (data: string) => {
  try {
    const response = (
      await fetch(
        `https://bombay-fcd.terra.dev/wasm/contracts/${data}/store?query_msg={%22token_info%22:{}}`
      )
    ).json();
    return response;
  } catch (err) {
    console.log(err);
  }
};

const App: Component = () => {
  const [address, setAddress] = createSignal<string>("");
  const [data] = createResource(address, fetchData);

  const [name, setName] = createSignal<string>("");
  const [symbol, setSymbol] = createSignal<string>("");
  const [totalSupply, setTotalSupply] = createSignal<string>("");

  const [display, setDisplay] = createSignal<boolean>(false);
  const [didItFetch, setDidItFetch] = createSignal<boolean>(false);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      checkInput();
    }
  };

  //when user clicks on the search button after inputting address
  const checkInput = () => {
    setDisplay(true);
    //check if api has pulled information of a token
    if (!data().result) {
      setDidItFetch(false);
      return;
    }

    setName(data().result.name);
    setSymbol(data().result.symbol);

    //some math for totalSupply
    let decimals: number = data().result.decimals;
    let totalSupplyWithDecimals: number = parseInt(data().result.total_supply);
    let totalSupplyWithoutDecimals: number =
      totalSupplyWithDecimals / Math.pow(10, decimals);

    setTotalSupply(totalSupplyWithoutDecimals.toString());

    setDidItFetch(true);
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
            onInput={(e) => setAddress(e.currentTarget.value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <button
            class="fa-solid fa-magnifying-glass"
            onClick={checkInput}
          ></button>
        </div>
        <div class="row">
          <Switch fallback={<p>Input address above and hit 'Enter'</p>}>
            <Match when={display() && didItFetch()}>
              <div class="card text-dark m-5 col align-self-center">
                <div class="card-body">
                  <p class="card-text">{`Name: ${name()}`}</p>
                  <p class="card-text">{`Symbol: ${symbol()}`}</p>
                  <p class="card=text">{`Total Supply: ${totalSupply()}`}</p>
                </div>
              </div>
            </Match>
            <Match when={display() && !didItFetch()}>
              <div class="card text-dark mt-5 col align-self-center">
                <div class="card-body">
                  <p class="card-text">
                    The address you input does not exist. Please check and try
                    again.
                  </p>
                </div>
              </div>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;

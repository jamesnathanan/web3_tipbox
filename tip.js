const web3 = new Web3(Web3.givenProvider);

const form = document.querySelector("form");

const send = async (amount) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const wei = web3.utils.toWei(amount, "ether");

  if (accounts.length > 0) {
    window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          to: "0x39028F3B21672777E5B9B165f1B698e03FF0685C",
          value: web3.utils.toHex(wei),
        },
      ],
    });
  }
};

if (window.ethereum) {
  form.classList.add("has-eth");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (window.ethereum) {
    const input = form.querySelector("input");
    send(input.value);
  } else {
    alert("Please install a wallet !");
  }
});

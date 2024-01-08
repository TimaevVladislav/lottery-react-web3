import Web3 from "web3"

// @ts-ignore
const web3 = new Web3(window.ethereum)

// @ts-ignore
window.ethereum.request({ method: "eth_requestAccounts" })
// @ts-ignore

const connect: boolean = window.ethereum.isConnected()

export { web3, connect }
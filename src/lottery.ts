import {web3} from "./web3"

const address: string = ""

const abi: [] = []

// eslint-disable-next-line import/no-anonymous-default-export
export default new web3.eth.Contract(abi, address)
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react"
import lottery from "../lottery"
import {web3} from "../web3"

export const ManagerCard = () => {
    const [manager, setManager] = useState<string>("")
    const [players, setPlayers] = useState<string[]>([])
    const [balance, setBalance] = useState<string>("0")
    const [amount, setAmount] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        fetchContractInformation()
    }, [])

    const fetchContractInformation = async () => {
        const manager: string = await lottery.methods.manager().call()
        const players: [] = await lottery.methods.getPlayers().call()
        const balance: bigint = await web3.eth.getBalance(lottery.options.address as string)

        // @ts-ignore
        setBalance(balance)
        setPlayers(players)
        setManager(manager)
        setMessage("")
    }

    const enterAccountAmount = async () => {
        try {
            const accounts: string[] = await web3.eth.getAccounts()
            setMessage("Waiting on transaction success...")
            await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei(amount, "ether")})
            setMessage("You have been entered!")
        } catch (e: any) {
            setMessage(e.message)
        }
    }

    const pickWinnerRandom = async () => {
        try {
            const accounts: string[] = await web3.eth.getAccounts()
            setMessage("Waiting on transaction success...")
            await lottery.methods.pickPlayerWinner().send({ from: accounts[0], value: web3.utils.toWei(amount, "ether")})
            setMessage("A winner has been picked!")
        } catch (e: any) {
            setMessage(e.message)
        }
    }

    const submitContractInformation = async (e: FormEvent) => {
       e.preventDefault()
       await enterAccountAmount()
    }

    return (
        <>
            <div className="lottery-container">
                <h2 className="lottery-title">Lottery Contract</h2>

                <p className="lottery-description">
                    This contract is managed by {manager}. There are currently {players.length} people entered,
                    competing to win {" "}
                    {web3.utils.fromWei(balance, "ether").toString()} ether!
                </p>

                <hr className="lottery-divider" />

                <form className="lottery-form">
                    <h4>Want to try your luck?</h4>

                    <div className="lottery-form-group">
                        <label>Amount of ether to enter</label>

                        <input
                            value={amount}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
                            className="lottery-input"
                        />
                    </div>

                    <button
                        className="lottery-button"
                        onClick={submitContractInformation}
                    >
                        Enter
                    </button>
                </form>

                <hr className="lottery-divider" />

                <h4>Ready to pick a winner?</h4>

                <button
                    className="lottery-button"
                    onClick={pickWinnerRandom}
                >
                    Pick a winner!
                </button>

                <hr className="lottery-divider" />

                <h2>{message}</h2>
            </div>
        </>
    )
}
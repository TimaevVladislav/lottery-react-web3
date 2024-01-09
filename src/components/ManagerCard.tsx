import React, {ChangeEvent, FormEvent, useEffect, useState} from "react"
import lottery from "../lottery"
import {web3} from "../web3"

export const ManagerCard = () => {
    const [manager, setManager] = useState<string>("")
    const [players, setPlayers] = useState<[]>([])
    const [balance, setBalance] = useState<number>(0)
    const [amount, setAmount] = useState<string>("")

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
    }

    const submitContractInformation = async (e: FormEvent) => {
       e.preventDefault()
    }

    return (
        <>
            <div className="lottery-container">
                <h2 className="lottery-title">Lottery Contract</h2>
                <p className="lottery-description">
                    This contract is managed by {manager}. There are currently {players.length} people entered,
                    competing to win{" "}
                    {web3.utils.fromWei(balance, "ether")} ether!
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
            </div>
        </>
    )
}
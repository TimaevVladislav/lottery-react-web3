import React, {useEffect, useState} from "react"
import lottery from "../lottery"

export const ManagerCard = () => {
    const [manager, setManager] = useState<string>("")

    const fetchContractManager = async () => {
        const manager = await lottery.methods.manager().call()
        // @ts-ignore
        setManager(manager)
    }

    useEffect(() => {
        fetchContractManager()
    }, [])

    return (
        <>
            <h2>Lottery Contract</h2>
            <p>This contract is managed by { manager }</p>
        </>
    )
}
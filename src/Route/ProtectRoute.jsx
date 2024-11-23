import { useEffect, useState } from "react"
import fetchingStore from "../Store/fetchingStore"
import {  useNavigate } from "react-router-dom"






const ProtectRoute = ({ element , allow}) => {
    const navigate = useNavigate()
    const [isAllowed, setIsAllowed] = useState(null)
    // const token = axios((state) => state.token)
    const token = fetchingStore((state)=>state.token)
    const user = fetchingStore((state) => state.user)
    const currentUser = fetchingStore((state => state.currentUser))


  


    useEffect(() => {
        checkRole()
    }, [])

    const checkRole = async () => {
        console.log(token)
        try {
            const resp = await currentUser(token)
            console.log(resp)
            const role = resp.data.member.role
            console.log('role from backend', role)

            if (allow.includes(role)) {
                setIsAllowed(true)
            } else {
                setIsAllowed(false)
            }

        } catch (err) {
            console.log(err)
            setIsAllowed(false)
        }
    }
    if(isAllowed === null){
        return <div>Loading...</div>
    }
    if(!isAllowed){
        return navigate('/')
    }


    return element

}

export default ProtectRoute
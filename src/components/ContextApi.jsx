import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

let ApiData = createContext()

const ContextApi = ({children}) => {
    let [info, setInfo] = useState([])
    let [dummy, setDummy] = useState([])

    let getData = ()=>{
        axios.get("https://furniture-api.fly.dev/v1/products?limit=100&offset=0").then((response)=>{
            setInfo(response.data.data)
        });
        axios.get("https://dummyjson.com/products").then((response)=>{
            setDummy(response.data.products)
        });
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <ApiData.Provider value={{info, dummy}}>{children}</ApiData.Provider>
  )
}

export {ApiData, ContextApi}
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {create, createStore } from "zustand"
import { persist } from "zustand/middleware"
import { createJSONStorage  } from 'zustand/middleware'



const fetchingStore = create(persist((set)=>({
    user:null,
    token:'',
    role:'',
    TimerResult:null,
    FieldTimerStore:[],
    events:[],
    addTimerRecord: (newField) => {
        set(state => ({
            ...state,
            FieldTimerStore: [...state.FieldTimerStore, newField]
        }))
    },
    Register : async(formLogin) => {

        try{
            const resp = await axios.post('http://localhost:9999/auth/register',formLogin)
            console.log(resp.data)
            set({token:resp.data.token,user:resp.data.user})
        
        }catch(err){
            console.log(err)
            throw err.response?.data || err
        }
    },
    Login : async(formLogin) => {
        try{
            const resp = await axios.post('http://localhost:9999/auth/login',formLogin)
            
            set({
                token: resp.data.token,
                role: resp.data.user.role
            })
           
            return resp.data  
            
        }catch(err){
            throw(err)
        }
    },
     currentUser : (token) => {

        return axios.post('http://localhost:9999/auth/getData',{},{
             headers:{
                 Authorization:`Bearer ${token}`
                }
            })
        },

        createEvent : async(body,token,user) => {
            const rs = await axios.post('http://localhost:9999/event/',body,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            set(state => ({
                events : [{...rs.data, user} , ...state.events ]
            }))
         },
         DeleteTimerData : (id) => {
           
            set((state) => ({
                // filter จะสร้าง array ใหม่โดยเอาเฉพาะข้อมูลที่ไม่ตรงกับ index ที่ต้องการลบ
                FieldTimerStore: state.FieldTimerStore.filter((item, index) => index !== id)
              }))

              


         },
         ClearAllTimeData : () => {
            //  set local storage เป็นอาเรย์ว่าง
            set({
                FieldTimerStore:[]
            })
         },
         ClearLoginData : () => {
            //  set local storage เป็นอาเรย์ว่าง

       
            set({
                token:'',
                user:null
            })
            
         },


        
         
        

}),{
    name:'state',
    storage:createJSONStorage(()=>localStorage)
}

))

export default fetchingStore
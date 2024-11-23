import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTimer } from 'react-timer-hook';
import MapTimer from './MapTimer';
import Weather from './Weather';
import fetchingStore from '../../../Store/fetchingStore';
import axios from 'axios';

const WaterTimerContainer = () => {


  const FieldTimerStore = fetchingStore((state) => state.FieldTimerStore)
  const DeleteTimerData = fetchingStore((state) => state.DeleteTimerData)
  const  ClearAllTimeData = fetchingStore((state)=> state.ClearAllTimeData)
  const [DataDate, setDataDate] = useState({})
  const [FormWater, setFormWater] = useState({})
  const token = fetchingStore((state)=>state.token)


  useEffect(() => { console.log(FormWater) }, [FormWater])

  const hdlDeleteTimerData = (id) => {
    console.log(id)
    DeleteTimerData(+id)

  }

  const hdlChangeDate = async(e) => {
    setDataDate(e)
   
  }

  
  
  const hdlSubmitFormWater = () => {
    
    console.log('hi')
    setFormWater({ date: DataDate , 
      fields: FieldTimerStore.map((field) => ({
        fieldName: field.field, 
        firstTime: field.TimerResult.firstTime, 
        lastTime: field.TimerResult.lastTime,
        duration: field.TimerResult.duration,
        status: 'Complete'
        
      }))
    })
    
    SendDataToBackEnd()
  }
  
  
  const SendDataToBackEnd = async() => {
    
    const body = FormWater
    console.log(body)
    const rs = await axios.post('http://localhost:9999/water/',body,{
      headers:{
        Authorization:`Bearer ${token}`
    }
    })
    console.log(rs)
    ClearAllTimeData()

  }
  
  
  return (

      

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 mt-[30vh]">
      {/* Top Section */}
      <div className="w-full bg-white shadow-lg rounded-xl p-6 mb-8">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              วันที่บันทึก
            </label>
            <input 

              type="date" 
              value={DataDate} 
              onChange={(e) => hdlChangeDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
            />
          </div>
          <button 
            onClick={() => hdlSubmitFormWater()} 
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md h-[42px] mt-7"
          >
            บันทึกข้อมูลทั้งหมด
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-10">
        
        <div className="col-span-3">
          <Weather />
        </div>

        {/* MapTimer */}
        <div className="col-span-4">
          <MapTimer />
        </div>

        {/* Records List */}
        <div className="col-span-5 space-y-4 bg-slate-200 p-3 rounded-md">
          {FieldTimerStore.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 border border-gray-100"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold text-gray-800">
                    Field: {item.field}
                  </h1>
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                    Timer #{index + 1}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Start Time</span>
                    <h1 className="text-lg font-medium text-gray-700">
                      {item.TimerResult.firstTime}
                    </h1>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">End Time</span>
                    <h1 className="text-lg font-medium text-gray-700">
                      {item.TimerResult.lastTime}
                    </h1>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Duration</span>
                    <h1 className="text-lg font-medium text-gray-700">
                      {item.TimerResult.duration} seconds
                    </h1>
                  </div>
                </div>

                <div className="w-full mt-4">
                  <button
                    value={index}
                    onClick={(e) => hdlDeleteTimerData(e.target.value)}
                    className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )

}

export default WaterTimerContainer
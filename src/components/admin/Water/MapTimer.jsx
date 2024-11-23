import React, { useEffect, useState } from 'react'

import axios from 'axios'
import TimerComponent from './TimerComponent'
import fetchingStore from '../../../Store/fetchingStore'

const MapTimer = () => {
    const [field, setField] = useState('')
    const TimerResult = fetchingStore((state) => state.TimerResult)
    const FieldTimerStore = fetchingStore((state) => state.FieldTimerStore)
    const addTimerRecord = fetchingStore((state) => state.addTimerRecord)




    useEffect(() => {
        console.log('TimerStore updated:', FieldTimerStore)
    }, [FieldTimerStore])


    const hdlSetField = () => {
        if (!field) {
            alert('โปรดตั้งชื่อพื้นที่')
            return
        }
        if (!TimerResult) {
            alert('กรุณาจับเวลาก่อน')
            return
        }
        const newField = {
            field,
            TimerResult
        }
        // console.log('hi field')
        addTimerRecord(newField) //ไปเรียกทำfnเพื่อsetเข้าstore zustand
        setField('')




    }

    const hdlFieldChange = (e) => {
        setField(e.target.value)

    }



    return (
        
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full bg-white rounded-xl shadow-lg overflow-hidden'>
                <div className='bg-indigo-600 p-4'>
                    <h2 className='text-xl font-semibold text-white text-center'>
                        ตั้งเวลาการรดน้ำ
                    </h2>
                </div>

                <div className='p-6 space-y-6'>
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>
                            ชื่อพื้นที่
                        </label>
                        <input
                            type='text'
                            value={field}
                            onChange={hdlFieldChange}
                            className='w-full px-4 py-2 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-800 bg-gray-50'
                            placeholder='กรุณาระบุชื่อพื้นที่'
                        />
                    </div>

                    <div className='bg-gray-50 rounded-lg p-4'>
                        <TimerComponent />
                    </div>

                    <button
                        onClick={() => hdlSetField()}
                        className='w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md'
                    >
                        บันทึกข้อมูล
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MapTimer
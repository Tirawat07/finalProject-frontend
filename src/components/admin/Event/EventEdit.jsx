import axios from 'axios'
import React, { useState } from 'react'

import { toast } from 'react-toastify'
import fetchingStore from '../../../Store/fetchingStore'





const EventEdit = (props) => {
    const { eventId, MapAxios } = props
    const token = fetchingStore(state => state.token)
    const [file, setFile] = useState(null)
    const [header, setHeader] = useState('')
    const [detail, setDetail] = useState('')




    const hdlSubmitEdit = async () => {

        const body = new FormData()
        body.append('header', header)
        body.append('detail', detail)
        if (file) {
            body.append('image', file)
        }

        const resp = await axios.put(`http://localhost:9999/event/${eventId}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // console.log(resp)
        toast.success('Edited')
        MapAxios()

    }



    const hdlFileChange = (e) => {
        e.stopPropagation()
        setFile(e.target.files[0])
    }



    return (
    
        

        <dialog id="my_modal_Edit" className="modal">
            <div className="modal-box max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
                {/* Close Button */}
                <form method="dialog" className="absolute right-4 top-4">
                    <button className="btn btn-sm btn-circle hover:bg-gray-100 transition-colors">
                        <span className="text-gray-500">✕</span>
                    </button>
                </form>

                {/* Form Content */}
                <div className="space-y-6 mt-4">
                    {/* Header Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            หัวข้อ
                        </label>
                        <input
                            type="text"
                            placeholder="กรอกหัวข้อ"
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-800 bg-gray-50"
                        />
                    </div>

                    {/* Detail Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            เนื้อหา
                        </label>
                        <textarea
                            placeholder="กรอกรายละเอียด"
                            value={detail}
                            onChange={(e) => setDetail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-800 bg-gray-50 min-h-[100px]"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 relative">
                        <label className="block text-sm font-medium text-gray-700">
                            อัปโหลดรูปภาพ
                        </label>
                        <input
                            id="image"
                            type="file"
                            onChange={hdlFileChange}
                            accept="image/*"
                            className="w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100
                                transition-colors"
                        />
                        {file && (
                            <div className="mt-2 relative">
                                <img 
                                    src={URL.createObjectURL(file)} 
                                    alt="Preview" 
                                    className="h-32 w-auto mx-auto rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={hdlSubmitEdit}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md mt-6"
                    >
                        บันทึกการแก้ไข
                    </button>
                </div>
            </div>

            {/* Modal Backdrop */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default EventEdit
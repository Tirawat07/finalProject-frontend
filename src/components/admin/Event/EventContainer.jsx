import React, { useState, useCallback, useEffect } from 'react'
import { DownIcon, ImageIcon, NoImage, SearchIcon, UpIcon } from '../../../assets/svgComponents'
import fetchingStore from '../../../Store/fetchingStore'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EventEdit from '../Event/EventEdit'
import { toast } from 'react-toastify'

const EventContainer = () => {

    const token = fetchingStore(state => state.token)
    const user = fetchingStore(state => state.user)
    const createEvent = fetchingStore(state => state.createEvent)
    const DeleteEvent = fetchingStore(state => state.DeleteEvent)
    const [file, setFile] = useState(null)
    const [header, setHeader] = useState('')
    const [detail, setDetail] = useState('')
    const [eventId, setEventId] = useState('')
    const [headerShow, setHeaderShow] = useState(null)
    const [isOpen, setIsOpen] = useState(true)
    const [loading,setLoading] = useState(false)







    //for map ===============

    const [events, setEvents] = useState([])
    const [eventMapShow, setEventMapShow] = useState(true)


    // =================




    const hdlReset = e => {

        setHeaderShow(null)
        // e.preventdefault()
        e.stopPropagation()
        document.getElementById('image').value = "";
        setFile(null)


    }

    const handleImageChange = e => {
        setHeaderShow(null) // 

        e.stopPropagation()
        setFile(e.target.files[0])
    }

    const hdlHeaderChange = e => {
        setHeaderShow(null) //
        setHeader(e.target.value)

    }

    const hdlDetailChange = e => {
        setHeaderShow(null) // 


        setDetail(e.target.value)
    }

    const hdlCreateEvent = async e => {
        setLoading(true)
        setHeaderShow(null) // 


        const body = new FormData()
        body.append('header', header)
        body.append('detail', detail)
        if (file) {
            body.append('image', file)
        }
        // console.log(body)
        const rs = await createEvent(body, token, user)
        // console.log(rs)
        setLoading(false)
        setHeaderShow(header) //
        setHeader('')
        setFile(null)
        setDetail('')
        toast.success('created new item')
        MapAxios()



    }




    // map-----------------------------------------------------------------------------------------------------------------------------------


    const MapAxios = async () => {
        try {

            if (!token) return;
            console.log(token)
            const resp = await axios.get('http://localhost:9999/event', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            console.log(resp)
            console.log(resp.data.events)
            setEventMapShow(false)
            setEvents(resp.data.events)
            MapEvent()
        } catch (err) {
            console.log(err)

        }
    }

    useEffect(() => {
        MapAxios();
    }, [token]);





    const MapEvent = () =>
        events.map((item, index) => {
            const hdlOpenModal = (id) => {
                setEventId(id)
                setTimeout(() => {
                    document.getElementById('my_modal_Edit').showModal()
                }, 0)
            }

            const hdlDeleteEvent = async (id) => {

                console.log(id)

                await axios.delete(`http://localhost:9999/event/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                toast.success(`deleted item ${id}`)
                MapAxios()


            }


            return (<div key={index}>


                <div className="card bg-base-100 w-96 shadow-xl text-white">
                    <figure className='h-56'>

                        {
                            item.image ? <img src={item.image} className='w-fit h-fit' /> : <NoImage />
                        }


                    </figure>

                    <div className="card-body">
                        <h2 className="card-title">
                            {item.header}
                            <div className="badge badge-secondary">no.{item.id}</div>
                        </h2>
                        <p>{item.detail}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">
                                <button onClick={() => hdlOpenModal(item.id)}>Edit</button>
                                <EventEdit eventId={eventId} MapAxios={MapAxios} key={eventId} />
                            </div>
                            <div className="badge badge-outline"><button onClick={() => hdlDeleteEvent(item.id)}>deleted</button>

                            </div>
                        </div>
                    </div>
                </div>


            </div>

            )

        })






    useEffect(() => {
        if (events) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }, [events])

    const ClearDataAxios = () => {
        setEvents([])
        setEventMapShow(true)
    }

    //searchText
    const [textInput, setTextInput] = useState('')
    const [searchText, setSearchText] = useState('')



    const axiosSearchData = async () => {
        const rs = await axios.get(`http://localhost:9999/event/search/${searchText}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setEvents([])
        setEvents(rs.data.results)
    }



    useEffect(() => {
        const delayInput = setTimeout(() => {

            setSearchText(textInput)
            axiosSearchData()
        }, 1000)
        console.log(textInput)
        clearTimeout()
    }, [textInput])








    // ===================================================================================================================================mapend


    return (
        

        <div className="mt-[30vh] min-h-screen bg-gray-100">
            <div className="fixed top-20 right-0 z-50 text-white">
                {/* ปุ่ม Search */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`fixed top-20 right-0 bg-indigo-600 p-3 rounded-l-lg shadow-md text-white hover:bg-indigo-700 transition-colors
            ${isOpen ? 'hidden' : 'block'}`}
                >
                    <SearchIcon className="h-5 w-5" />
                </button>

                {/* Panel */}
                <div className={`fixed top-20 right-0 w-64 bg-white shadow-lg rounded-l-xl p-6 transition-all duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <SearchIcon className="h-5 w-5" />
                    </button>

                    <div className="space-y-4 mt-4">
                        <button
                            onClick={MapAxios}
                            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            All Event
                        </button>
                        <button
                            onClick={ClearDataAxios}
                            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Clear
                        </button>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Create Event Form */}
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8 text-white">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">หัวข้อ</label>
                        <input
                            value={header}
                            onChange={hdlHeaderChange}
                            placeholder="กรอกหัวข้อ"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
                        <textarea
                            value={detail}
                            onChange={hdlDetailChange}
                            placeholder="กรอกรายละเอียด"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">อัปโหลดรูปภาพ</label>
                        <input
                            id="image"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="w-full"
                        />
                        {file && (
                            <>
                                <img src={URL.createObjectURL(file)} className="mt-2 h-32 mx-auto rounded-lg" />
                                <button
                                    onClick={hdlReset}
                                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                >
                                    ×
                                </button>
                            </>
                        )}
                        {loading == true? <span className="loading loading-spinner text-error"></span>: ''}
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={hdlCreateEvent}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            ส่งข้อมูล
                        </button>
                        {headerShow && (
                            <span className="text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                                Event created successfully
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            {!eventMapShow && (
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <MapEvent />
                    </div>
                </div>
            )}

            <EventEdit eventId={eventId} MapAxios={MapAxios} />
        </div>
    )
}

export default EventContainer
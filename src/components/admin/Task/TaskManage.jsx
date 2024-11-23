import React, { useEffect, useState } from 'react'
import axios from 'axios'
import fetchingStore from '../../../Store/fetchingStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TaskManage = () => {
  const navigate = useNavigate()
  const token = fetchingStore((state) => state.token)
  const [waterData, setWaterData] = useState([])
  const [i, setI] = useState(0)

  const BackendData = async () => {
    try {
      const rs = await axios.get('http://localhost:9999/water/getAllDataWater', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Response:', rs.data)

      if (rs.data) {
        setWaterData(rs.data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    BackendData()
  }, [])

  const getAllRows = () => {
    if (!waterData.dates) return [];

    const result = waterData.dates.map(date => {
      const fieldsData = date.field.map(field => {
        const wateringsData = field.waterings.map(water => ({
          dateId: date.id,
          date: date.date,
          fieldName: field.fieldName,
          ...water
        }));
        return wateringsData;
      });
      return fieldsData;
    });
    // console.log(result)
    // console.log(result.flat(2))
    return result.flat(2);
  };
  
  console.log(waterData)

  const rows = getAllRows().slice(0, 10 + i);

  const hdlDeleteDate = async (dateId) => {
    const rs = await axios.delete(`http://localhost:9999/water/dateId/${dateId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(rs)
    toast.success('deleted !!')
    document.getElementById('my_modal_confirm').close()
    BackendData()
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white pt-20 px-4 sm:px-6 lg:px-8 mt-[30vh]' >
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Field</th>
                <th className="px-6 py-4 text-left font-semibold">Start Time</th>
                <th className="px-6 py-4 text-left font-semibold">End Time</th>
                <th className="px-6 py-4 text-left font-semibold">Duration</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">

              {rows.length > 0 ? (
                rows.map((item, index) => {

                  const showDate = rows.findIndex(row => row.date === item.date) === index;

                  const hdlOpenModal = (id) => {
                    setTimeout(() => {
                      document.getElementById('my_modal_confirm').showModal()
                    }, 0)
                  }

                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {showDate ? <div className='flex justify-between items-baseline'>{item.date} <button value={item.dateId}
                          onClick={() => hdlOpenModal(item.dateId)}
                          className='bg-red-200 btn btn-primary'>Delete</button> </div>
                          : ''}

                        <dialog id="my_modal_confirm" className="modal">
                          <div className="modal-box w-96 bg-white rounded-xl shadow-lg p-6">
                            ปุ่มปิด
                            <form method="dialog" className="absolute right-3 top-3">
                              <button className="btn btn-sm btn-circle hover:bg-gray-100 transition-colors">
                                <span className="text-gray-500">✕</span>
                              </button>
                            </form>

                            <div className="flex justify-center mb-3">
                              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-red-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                  />
                                </svg>
                              </div>
                            </div>

                            <div className="text-center mb-4">
                              <h3 className="text-base font-semibold text-gray-900 mb-2">ยืนยันการลบข้อมูล</h3>
                              <p className="text-sm text-gray-600">
                                การลบข้อมูลวันนี้จะทำให้ข้อมูลการรดน้ำ
                                <br />ทั้งหมดของวันนี้หายไป
                                <span className="text-red-500 font-semibold"> และไม่สามารถกู้คืนได้</span>
                              </p>
                            </div>

                            <div className="flex justify-center gap-2 mb-3">
                              <form method="dialog">
                                <button className="btn btn-sm px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 border-none">
                                  ยกเลิก
                                </button>
                              </form>
                              <button
                                className="btn btn-sm px-4 bg-red-500 hover:bg-red-600 text-white border-none"
                                onClick={() => hdlDeleteDate(item.dateId)}
                              >
                                ยืนยันการลบ
                              </button>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                              <p className="text-xs text-gray-500 text-center">
                                <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1"></span>
                                โปรดตรวจสอบให้แน่ใจก่อนดำเนินการ
                              </p>
                            </div>
                          </div>
                        </dialog>

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.fieldName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.firstTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.lastTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium
                          ${item.status === 'Complete'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No data available</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between">
            {rows.length >= 10 + i ? (
              <button
                onClick={() => setI(i + 10)}
                className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full
                  shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  transform transition-all duration-200 hover:scale-105"
              >
                Next Page
              </button>
            ) : (
              <button
                onClick={() => setI(0)}
                className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full
                  shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  transform transition-all duration-200 hover:scale-105"
              >
                Back to Start
              </button>
            )}

            <button
              className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full
                shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transform transition-all duration-200 hover:scale-105"
              onClick={() => navigate('/task/water-dataShard')}>
              ดูหน้าสรุปผล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskManage
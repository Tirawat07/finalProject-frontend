import React, { useEffect, useState } from 'react'
import fetchingStore from '../../../Store/fetchingStore';
import { toast } from 'react-toastify';

const TimerComponent = () => {



  const [firstTime, setFirstTime] = useState(""); // เก็บเวลาเริ่มต้น
  const [lastTime, setLastTime] = useState(""); // เก็บเวลาสิ้นสุด
  const [duration, setDuration] = useState(0); // เก็บระยะเวลาเป็นวินาที
  const [progress, setProgress] = useState(0); // เก็บค่าโปรเกรส
  const [finalResult, setFinalResult] = useState(null); // ผลลัพธ์สุดท้าย


//setข้อมูลลงstate
  const setTimerResult = (result) => {
    console.log(result)
    fetchingStore.setState({ TimerResult: result });
  }

  // ฟังก์ชันคำนวณเวลาเป็นวินาที
  const timeToSeconds = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60;
  };

  // ฟังก์ชันเริ่มจับเวลา
  const startTimer = () => {

    if (firstTime && lastTime) {
      const firstTimeInSeconds = timeToSeconds(firstTime)
      const lastTimeInSeconds = timeToSeconds(lastTime);

      const calculatedDuration = lastTimeInSeconds - firstTimeInSeconds;



      if (calculatedDuration > 0) {
        setDuration(calculatedDuration);
        setProgress(0); // รีเซ็ตโปรเกรส
      } else {
        alert("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น");
      }
    } else {
      alert("กรุณาเลือกเวลาให้ครบ");
    }
  };

  useEffect(() => {
    if (duration > 0) {
      const endTime = Date.now() + duration * 1000;
      const interval = setInterval(() => {
        const remainingTime = Math.floor((endTime - Date.now()) / 1000); // เวลาที่ผ่านไปในวินาที
        const progressValue = ((duration - remainingTime) / duration) * 100;
        console.log(progress)
        setProgress(Math.min(progressValue, 100)); // จำกัดโปรเกรสไม่ให้เกิน 100% เพื่อ%set progressในแต่ละวินาที


        



        if (remainingTime == 0) {
          clearInterval(interval)
          const result = { firstTime, lastTime, duration }  
          console.log(result)
          setFinalResult(result)
          setTimerResult(result)
          toast.success('The timer is finished.')
        }

      }, 1000); // อัพเดตโปรเกรสทุก 1000ms

      return () => clearInterval(interval);
    }
  }, [duration, firstTime, lastTime]);

  const resetTimer = () => {
    setFirstTime("");
    setLastTime("");
    setDuration(0);
    setProgress(0);
    setFinalResult(null);
  };




  return (

    <div className='space-y-4'>
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <label className='w-24'>First Time:</label>
          <input
            type="time"
            value={firstTime}
            onChange={(e) => setFirstTime(e.target.value)}
            className='flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white'
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='w-24'>Last Time:</label>
          <input
            type="time"
            value={lastTime}
            onChange={(e) => setLastTime(e.target.value)}
            className='flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white'
          />
        </div>
      </div>

      <div className='flex gap-2'>
        <button
          onClick={startTimer}
          className='flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors'
        >
          Start Timer
        </button>
        <button
          onClick={resetTimer}
          className='flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors'
        >
          Reset
        </button>
      </div>

      <div className='space-y-2'>
        <div>Progress: {progress.toFixed(2)}%</div>
        <div className='w-full bg-gray-200 rounded-full h-2.5'>
          <div
            className='h-full bg-green-500 rounded-full transition-all duration-1000'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {finalResult && (
        <div className='mt-4 p-4 bg-gray-50 rounded-lg shadow space-y-2'>
          <h3 className='font-semibold'>Final Result:</h3>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <div>First Time:</div>
            <div>{finalResult.firstTime}</div>
            <div>Last Time:</div>
            <div>{finalResult.lastTime}</div>
            <div>Duration:</div>
            <div>{finalResult.duration} seconds</div>
          </div>
        </div>
      )}
    </div>
  );

}



export default TimerComponent



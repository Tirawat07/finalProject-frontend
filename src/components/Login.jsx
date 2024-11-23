import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchingStore from '../Store/fetchingStore'
import { toast } from 'react-toastify'
import LoadingAnimation from './LoadingAnimation'



const dataState = {
    username: "",
    password: ""

}


const Login = () => {
    const navigate = useNavigate()

    const LoginAxios = fetchingStore((state) => state.Login)
    const role = fetchingStore((state) => state.role)

    const [formLogin, setFormLogin] = useState({

        username: "",
        password: ""

    })


    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});
    const [Loading, setLoading] = useState(false)
    
    // const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const validateUserName = /^[a-zA-Z][a-zA-Z0-9._]{2,19}$/
    // const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*_]{6,}$/


    const isValidPassword = (password) => {
        const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*_]{6,}$/;
        return (passwordTest.test(password));
    }
    const isValidUsername = (username) => {
        const passwordTest = /^[a-zA-Z][a-zA-Z0-9._]{2,19}$/;
        return (passwordTest.test(username));
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formLogin.username.trim()) {
            newErrors.username = "กรุณากรอกusername";
        } else if (!isValidUsername(formLogin.username)) {
            newErrors.username = "กรุณากรอกชื่อผู้ใช้ 3-20 ตัวอักษร ขึ้นต้นด้วยตัวอักษร ตามด้วยตัวอักษร ตัวเลข จุด หรือขีดล่าง ";
        }

        if (!formLogin.password) {
            newErrors.password = "กรุณากรอกรหัสผ่าน";
        } else if (!isValidPassword(formLogin.password)) {
            newErrors.password = "กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร ประกอบด้วยตัวพิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข และอาจมีอักขระพิเศษ ";
        } else if (formLogin.password.length < 6) {
            newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัว";
        }

        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        setIsValid(isValid);
        return isValid;
    }




    const hdlOnChange = (e) => {

        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    };
    const hdlSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm(formLogin)) return toast.error('โปรดตรวจสอบฟอร์มอีกครั้ง')
        try {

            console.log(formLogin)

            const respData = await LoginAxios(formLogin)

            console.log(respData)
            setLoading(true)
            setTimeout(() => {
                roleDirect(respData.user.role)
            }, 4000)
            toast.success(`welcome!! ${respData.user.username}`)  
            return respData


        } catch (err) {

            toast.error(err.response.data.message)

        }

    }
    const roleDirect = (role) => {
        console.log(role)
        if (role === 'ADMIN') {
            navigate('/admin')
        } else {
            navigate('/')
        }
    }


    const hdlNavigateToLogin = (path) => {
        navigate(path)
    }



    if (Loading) {
        return <LoadingAnimation />
      }




    return (
        <div>
            <div>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100 text-white">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-green-200">
                        <h2 className="text-3xl font-semibold mb-6 text-green-800 text-center">เข้าสู่ระบบ</h2>
                        <form onSubmit={hdlSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">
                                    username
                                </label>
                                <input
                                    name="username"
                                    type="text"
                                    value={formLogin.username}
                                    onChange={hdlOnChange}
                                    id="email"
                                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                                {!isValid && errors.username && (
                                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-green-700 mb-1">
                                    password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        name='password'
                                        onChange={hdlOnChange}
                                        value={formLogin.password}
                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                    {!isValid && errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                    )}

                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                >
                                    เข้าสู่ระบบ
                                </button>
                            </div>
                        </form>

                        <button onClick={() => hdlNavigateToLogin('/register')} className=" hover:text-green-800 text-green-700 underline">ลงทะเบียน</button>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
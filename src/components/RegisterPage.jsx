import React, { useState } from 'react'
import fetchingStore from '../Store/fetchingStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'





const RegisterPage = () => {
    const dataState = {
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    }
    

     const navigate = useNavigate()
    const RegisterAxios = fetchingStore((state) => state.Register)

    const [formRegister, setFormRegister] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })
    const hdlOnChange = (e) => {
        console.log(e.target.value)
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value
        })
    };



    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});

    

    const isValidEmail = (email) => {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (emailTest.test(email));
    }

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

        if (!formRegister.username.trim()) {
            newErrors.username = "กรุณากรอกusername";
        }else if (!isValidUsername(formRegister.username)) {
            newErrors.email = "กรุณากรอกชื่อผู้ใช้ 3-20 ตัวอักษร ขึ้นต้นด้วยตัวอักษร ตามด้วยตัวอักษร ตัวเลข จุด หรือขีดล่าง ";
        }
    
    
        if (!formRegister.email) {
            newErrors.email = "กรุณากรอกอีเมล";
        } else if (!isValidEmail(formRegister.email)) {
            newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง (example@email.com)";
        }
    
    
        if (!formRegister.password) {
            newErrors.password = "กรุณากรอกรหัสผ่าน";
        } else if (!isValidPassword(formRegister.password)) {
            newErrors.password = "กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร ประกอบด้วยตัวพิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข และอาจมีอักขระพิเศษ ";
        } else if (formRegister.password.length < 6) {
            newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัว";
        }
    
        if (formRegister.password !== formRegister.confirmPassword) {
            newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
        }
    
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        setIsValid(isValid);
        return isValid;
    }





    const hdlSubmit = async(e) => {
        e.preventDefault()
        if(!validateForm(formRegister)) return
        try{
            await RegisterAxios(formRegister)
            setFormRegister(dataState)
            toast.success('Registration successful!')
            navigate('/login')

        }catch(err){
            
            toast.error("An unexpected error occurred. Please try again.");
            
        }
        
       
    }
    




    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100 text-white">
                <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-green-200">
                    <h2 className="text-3xl font-semibold mb-6 text-green-800 text-center">ลงทะเบียน</h2>
                    <form onSubmit={hdlSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-green-700 mb-1">
                                username
                            </label>
                            <input
                                type="username"
                                name="username"
                                id="username"
                                value={formRegister.username}
                                onChange={hdlOnChange}
                                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            {!isValid && errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">
                                email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formRegister.email}
                                onChange={hdlOnChange}
                                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            {!isValid && errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-green-700 mb-1">
                                password
                            </label>
                            <input
                                type="password"
                                name='password'
                                id="password"
                                value={formRegister.password}
                                onChange={hdlOnChange}
                                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            {!isValid && errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-green-700 mb-1">
                                confirm-Password
                            </label>
                            <input

                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formRegister.confirmPassword}
                                onChange={hdlOnChange}
                                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            {!isValid && errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                                สมัครสมาชิก
                            </button>
                        </div>



                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-green-600">
                            มีบัญชีอยู่แล้ว? <button onClick={()=>navigate('/login')} className="underline hover:text-green-800"  >เข้าสู่ระบบ</button>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegisterPage
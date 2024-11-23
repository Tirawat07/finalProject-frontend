import React from 'react'
import durianImage1 from '../image/istockphoto-1324661148-2048x2048.jpg'
import durianImage2 from '../image/istockphoto-1492642232-2048x2048.jpg'
import durianImage3 from '../image/istockphoto-1767924861-2048x2048.jpg'
import durianImage4 from '../image/istockphoto-1767920547-2048x2048.jpg'
import durianImage5 from '../image/istockphoto-1772113474-2048x2048.jpg'
import durianImage6 from '../image/istockphoto-2034956244-2048x2048.jpg'
import durianImage7 from '../image/istockphoto-2152594845-2048x2048.jpg'
import durianImage8 from '../image/istockphoto-2072186376-2048x2048.jpg'
import durianImage9 from '../image/istockphoto-1529524954-2048x2048.jpg'

import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigateBar from './NavigateBar'
import { GardenLogo } from '../assets/svgComponents';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import fetchingStore from '../Store/fetchingStore'




export default function HomePage() {


    const role = fetchingStore((state)=>state.role)


    const navigate = useNavigate()
    const hdlNavigateTo = (path) => {
        if(role == "USER"){
            navigate(path)
            
        }else{
            toast.error('โปรดเข้าสู่ระบบก่อนสั่งซื้อสินค้า')
            navigate('/login')
        }
    }


    return (


        



        <div >
            <div>

            </div>
            <div className="h-screen w-screen  flex flex-col content-center   " >

                <NavigateBar />


                <div className="container h-fit flex flex-col pb-[100px] bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300 ">





                    <div id='main' className="container flex flex-col  mt-[175px] justify-center  ">
                        <Carousel className='flex flex-col justify-center h-fit w-[75%]  p-8 m-auto '>
                            <Carousel.Item >
                                <img
                                    className='w-screen h-[500px]'
                                    src={durianImage1}
                                    alt="durianImage1"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className='w-screen h-[500px]'
                                    src={durianImage2}
                                    alt="durianImage2"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className='w-screen h-[500px]'
                                    src={durianImage3}
                                    alt="durianImage3"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col  ">

                        <div className="text-center bg-amber-500 rounded-lg shadow-lg flex flex-col mt-[96px]">
                            <h1 className="text-4xl font-bold text-green-800 mb-4 p-8">
                                "It's not just a durian orchard... it's 'our' pride and joy."
                            </h1>
                            <div className="flex flex-col items-end mr-[10%]">
                                <button className="text-xl text-yellow-500 bg-green-900 p-3 mb-6 rounded-2xl w-[150px] h-fit  ">ดูเพิ่มเติม</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-12  ">
                            <div className="  shadow-md flex items-center bg-[#ecfccb] rounded-md">
                                <img src={durianImage1} alt="Stock" className=" w-full h-full" />

                            </div>

                            <div className="bg-white  shadow-md rounded-md">
                                <img src={durianImage2} alt="Greenhouse" className="w-full h-full object-cover mb-4 " />

                            </div>
                        </div>


                        <div>

                        </div>
                    </div>

                    <div id='our-garden'>
                        <div className="container mx-auto px-4">
                            {/* Season-Extending Techniques Section */}
                            <div className="flex flex-col md:flex-row items-center my-8 p-4 bg-gray-100 rounded-lg">
                                <div className="md:w-2/3 pr-4">
                                    <img src={durianImage4} alt="Garden with season extending techniques" className="w-full h-auto rounded-lg" />
                                </div>
                                <div className="md:w-1/3 mt-4 md:mt-0">
                                    <h2 className="text-2xl font-bold text-brown-600">Durian Tasting Experience</h2>
                                    <p className="mt-2 text-gray-700">"The Best Durian Eating Experience": Offer tips on how to enjoy durian to its fullest, with advice on how to select the best durians and enjoy their unique taste.</p>
                                    <button className="mt-4 px-4 py-2 bg-brown-500 text-white rounded hover:bg-brown-600">LEARN MORE</button>
                                </div>
                            </div>

                            {/* A Guide to Pickling & Fermentation Section */}
                            <div className="flex flex-col-reverse md:flex-row items-center my-8 p-4 bg-gray-100 rounded-lg">
                                <div className="md:w-1/3 mt-4 md:mt-0">
                                    <h2 className="text-2xl font-bold text-brown-600"> The Uniqueness of Durian</h2>
                                    <p className="mt-2 text-gray-700">"From Our Farm to Your Hands": Share the story of how the durians are grown, from planting and nurturing to harvesting, highlighting the care taken throughout the process to ensure quality.</p>
                                    <button className="mt-4 px-4 py-2 bg-brown-500 text-white rounded hover:bg-brown-600">LEARN MORE</button>
                                </div>
                                <div className="md:w-2/3 pl-4">
                                    <img src={durianImage5} alt="Pickling and fermentation jars" className="w-full h-auto rounded-lg" />
                                </div>
                            </div>

                            {/* Unlocking the Flavor of Garlic Section */}
                            <div className="flex flex-col md:flex-row items-center my-8 p-4 bg-gray-100 rounded-lg">
                                <div className="md:w-1/2 pr-4">
                                    <img src={durianImage6} alt="Various types of garlic" className="w-full h-auto rounded-lg" />
                                </div>
                                <div className="md:w-1/2 mt-4 md:mt-0">
                                    <h2 className="text-2xl font-bold text-brown-600"> Durian Farming Tips</h2>
                                    <p className="mt-2 text-gray-700">"Expert Tips from Our Durian Farm": Share small tips and insights on how to properly grow and care for durians, giving your followers a deeper understanding of the delicate process behind a good harvest.</p>
                                    <button className="mt-4 px-4 py-2 bg-brown-500 text-white rounded hover:bg-brown-600">LEARN MORE</button>
                                </div>
                            </div>
                        </div>
                    </div>






                </div>

                <div id='contract' className=" mx-auto p-8 pt-[100px] w-screen bg-orange-200 h-fit">
                    <h1 className="text-4xl font-bold text-brown-700 mb-6">Customer Service Center</h1>

                    <div className="flex flex-wrap -mx-2 mb-8">

                        


                        <div className="w-full md:w-1/3 px-2 mb-4">
                            <img
                                id='LinkOrderProduct'
                                src={durianImage7}
                                onClick={()=>hdlNavigateTo('/orderProduct')}
                                alt="Customer service"
                                className="w-full h-48 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4">
                            <img

                                src={durianImage8}
                                alt="Garden center"
                                className="w-full h-48 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4">
                            <img
                                src={durianImage9}
                                alt="Online support"
                                className="w-full h-48 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </div>


                    <h2 className="text-2xl font-semibold text-brown-600 mb-4">How Can We Help?</h2>

                    <p className="text-gray-700 mb-4">
                        We're in business to spread the joys and rewards of gardening, and our mission
                        hinges on your success. Customer satisfaction is the heart of Gardener's Supply
                        and the biggest source of pride for our employee-owners. If you have any
                        questions about our guarantee, products, policies, or website, please explore the
                        links below.
                    </p>

                    <p className="text-gray-700 mb-4">
                        If you have a question about an order you've already placed, contact one of our
                        customer service representatives in Burlington, VT.
                    </p>

                    <p className="font-semibold text-gray-800 mb-2">Customer Contact Center hours:</p>

                    <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>8:30 AM - 4:30 PM EST Monday-Saturday</li>
                    </ul>
                </div>

            </div>








        </div>



    )
}

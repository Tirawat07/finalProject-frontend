import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import LoadingAnime  from "../assets/Animation/AnimationLoading.json"

const LoadingAnimation = () => {
    const [text, setText] = useState('')
    const [showAnimation,setShowAnimation] = useState(false)


    
  
  
    useEffect(() => {
      
      setTimeout(() => {
        setShowAnimation(true)
        setText('Loading')
      }, 0)
  
    }, [])
    
    return (
      <div>
        <div className='w-screen h-screen flex flex-col justify-center items-center'>       
          {
            showAnimation? (<Player
              src={LoadingAnime}
              className="w-[300px] h-[300px]"
              loop
              autoplay
              background="transparent"
            />) : (<h2>{text}</h2> )
          }
        </div>
      </div>
    )
}

export default LoadingAnimation
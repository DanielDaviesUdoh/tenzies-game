import React, {useEffect, useRef} from 'react'

export default function Time({time, setTime, startTimer, gameOver, runGetTime}) {
  const timeRef = useRef(null)
  
  useEffect(() => {
    if (startTimer) {
      timeRef.current =setInterval(()=>{
        setTime(t => t + 1 )
      }, 1000)
    } else {
      clearInterval(timeRef.current)
    }

    if(gameOver) {
      runGetTime(timer)
    }

    return ()=> clearInterval(timeRef.current)
   
  }, [startTimer, gameOver])

  function renderTime() {
    const getSeconds = `0${time % 60}`.slice(-2)
    const minutes = Math.floor(time/60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(time/3600)}`.slice(-2)
  
    return `${getHours}:${getMinutes}:${getSeconds}`
  }

  const timer = renderTime()

  return (
    <>
      {!gameOver && <h3 className='timer'>{timer}</h3>}
      {gameOver && <p className='recent-time'>Your current game time is {timer}</p>}
    </>
  )
}
  
  
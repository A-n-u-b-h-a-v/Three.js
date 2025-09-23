import React, { useEffect, useState } from 'react'

const Time = () => {
    const [date, setdate] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }));
  useEffect(() => {
    const timeInt=setInterval(()=>{
      const currTime=new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
      setdate(currTime)
    },1000)
  
    return () => {
      clearInterval(timeInt)
    }
  }, []);
  return (
    <>
    {date}
    </>
  )
}

export default Time

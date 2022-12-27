import { useState, useEffect } from 'react'

const  SimTyping = (prop:any)=> {
  const {str} = prop;
  const [output, setOutput] = useState('')
  useEffect(() => {
    let i = 0
  
    const interval = setInterval(() => {
      if (i >= str.length) {
        return
      }
  
      setOutput(output + str[i])
      i++
    }, 100)
  
    if (i >= str.length) {
      clearInterval(interval)
    }
  
    return () => clearInterval(interval)
  }, [str, output])
  

  return (<>{output}</>)
}

export default SimTyping
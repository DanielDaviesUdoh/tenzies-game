import React from 'react'

export default function Die(props) {
  const styles= { backgroundColor: props.isHeld ? 'green' : 'white' }
  const dots = { backgroundColor: props.isHeld ? 'white' : 'black' }

  function renderDots() {
    if (props.value === 1) {
      return <div className='dice-dots' style={dots} />
    } else if (props.value === 2) {
      return (
        <>
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
        </>
      )
    } else if (props.value === 3) {
      return (
        <>
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
        </>
      )
    } else if (props.value === 4) {
      return (
        <>
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
        </>
      )
    } else if (props.value === 5) {
      return (
        <>
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
        </>
      )
    } else if (props.value === 6) {
      return (
        <>
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
          <div className='dice-dots' style={dots} />
        </>
      )
    }
  }

  const dotsNumber = renderDots()

  return (
    <div
      className='dice'
      style={styles}
      onClick={props.handleIsHeld}
    >
      {dotsNumber}
    </div>
  )
}
        
          
       
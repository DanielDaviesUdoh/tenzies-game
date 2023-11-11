import React, {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import Die from './Die'
import Time from './Time'
import Confetti from 'react-confetti'


function ParentTenzi() {
  const [values, setValues] = useState(doArray())
  const [gameOver, setGameOver] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [time, setTime] = useState(0)
  const [startTimer, setStartTimer] = useState(false)
  const [getTime, setGetTime] = useState([])

  useEffect(()=> {
    const savedTime = JSON.parse(localStorage.getItem('getTime'))
    if(savedTime) {
      setGetTime(savedTime)
    }
  }, [])

  useEffect(() => {
    function checkWin() {
      const allDiceHeld = values.every(dice => dice.isHeld)
      const diceNumber = values[0].value
      const allDiceSame = values.every(dice => dice.value === diceNumber)

      if (allDiceHeld && allDiceSame) {
        setGameOver(true)
        setStartTimer(false)
      }
    }
    checkWin()

  }, [values])

  useEffect(()=> {
    if(getTime.length > 0) {
        localStorage.setItem('getTime', JSON.stringify(getTime))
      }
  }, [getTime])

  function runGetTime(timer) {
    const newTime = [...getTime.sort().slice(0,1), timer]
    setGetTime(newTime)
  }

  function createDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function doArray() {
    const newArray = []
    for (let i = 0; i < 10; i++) {
      newArray.push(createDice())
    }
    return newArray
  }

  const newDices = () => {
    if (!gameOver) {
      setStartTimer(true)
      setValues(prevDices => {
        return prevDices.map(dices => {
          return dices.isHeld ? dices : createDice()
      })
    })
    setRolls(rolls => rolls + 1)
   }
  }

  const handleIsHeld = (id) => {
    setStartTimer(true)
    setValues(prevDices => {
     return prevDices.map(dice => {
       return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
     })
    })
   }

   const handleReset = ()=> {
    if (gameOver) {
     setGameOver(false)
     setRolls(0)
     setStartTimer(false)
     setTime(0)
     setValues(prevDices => {
       return prevDices.map(dice => {
         return dice.isHeld ? {...dice, isHeld: !dice.isHeld} : dice
       })
     })
     setValues(doArray())
    }
   }

   const dice = values.map(element => (
    <Die 
      key={element.id} 
      value={element.value}
      isHeld={element.isHeld}
      handleIsHeld={()=> handleIsHeld(element.id)} />
  ))

  return (
    <div className='app-container'> 
      {gameOver && <Confetti />}
      <div className='tenzi-container'>
        <h2>Tenzies</h2>
        <p>
          Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.
        </p>
        <p className='best-time'>
          Best Time - {getTime.length < 1 ? '00:00:00' : getTime.sort().slice(0,1)}
        </p>
        <Time 
          startTimer={startTimer} 
          gameOver={gameOver}
          time={time}
          setTime={setTime}
          runGetTime={runGetTime}
        />
        <div className='dice-container'>{dice}</div>
        <div className='button-container'>
          <button onClick={newDices}>
            {
              rolls === 0 ? 'Roll' :
              (rolls <= 1 ? `Roll - ${rolls}` : `Rolls - ${rolls}`)
            }
          </button>
          <button onClick={handleReset}>Reset Game</button>
        </div>
      </div>
    </div>
  )
}

export default ParentTenzi
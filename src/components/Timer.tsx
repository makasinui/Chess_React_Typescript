import { FC, useEffect, useRef, useState } from "react"
import { Colors } from "../models/Colors"
import { Player } from "../models/Player"

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(()=>{
        startTimer()
    },[currentPlayer])

    function startTimer() {
        if(timer.current) {
            clearInterval(timer.current)
        }
        
        timer.current = setInterval(decrementTimer, 1000)
    }

    function decrementTimer() {
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        callback()
    }

    function decrementBlackTimer() {
        setBlackTime(prev=>prev!==0?prev-1:0)
    }
    
    function decrementWhiteTimer() {
        setWhiteTime(prev=>prev!==0?prev-1:0)
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }
    return(
        <div>
            <div>
                <button onClick={handleRestart}>restart game</button>
            </div>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
            <div>
                {blackTime === 0 ? <div className="alert">Чёрные проиграли!</div>:''}
            </div>
            <div>
                {whiteTime === 0 ? <div className="alert">Белые проиграли!</div>:''}
            </div>
        </div>
    )
}

export default Timer

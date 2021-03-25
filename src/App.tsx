import React from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import { HappyBirthday, Upcoming } from "./Birthday"
import { getUpcomingBirthdays } from "./utils/birthdays"

export const App = () => {
    const { width, height } = useWindowSize()

    const allBirthdays = getUpcomingBirthdays();

    const today = allBirthdays.filter(x => x.in === 0).map(x => x.name).sort()
    const upcoming = allBirthdays.filter(x => x.in !== 0).sort((a, b) => a.in - b.in)

    return (
        <div>
            <div 
                style={{
                    display: 'flex',
                    gap: 180,
                    marginTop: 96,
                    marginBottom: 96,
                    flexDirection: 'column',
                    width: '100%'
                }}
            >
                <HappyBirthday names={today} />
                <Upcoming birthdays={upcoming}></Upcoming>
            </div>
            {
                today.length !== 0 &&
                <div
                    style={{
                        zIndex: -1,
                        position: 'fixed',
                        top: 0,
                        left: 0
                    }}
                >
                    <Confetti width={width} height={height} />
                </div>
            }
        </div>
    )
}
import React from "react"
import { getRandomEmoji, UpcomingBirthday } from "./utils/birthdays"
import Twemoji from "react-twemoji"
import styled from "styled-components"

export const HappyBirthday = ({ names: birthdays }: { names: string[]}) => {
    if (!birthdays || birthdays.length <= 0)
        return null

    return (
        <div style={{
            display: 'flex',
            gap: 0,
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 'max(400px, 20vh)',
            marginBottom: 'max(400px, 20vh)',
        }}>
            <Twemoji><h1>
                {getRandomEmoji()} <span style={{ marginLeft: 24, marginRight: 24 }}>Happy Birthday</span>{getRandomEmoji()}</h1></Twemoji>
            {birthdays.map(x => <h2>{x}</h2>)}
        </div>
    )
}

export const Upcoming = ({birthdays}: { birthdays: UpcomingBirthday[]}) => {
    if (!birthdays || birthdays.length <= 0)
        return null

    return <div>
        <h2 style={{ fontWeight: 800 }}>Upcoming Birthdays</h2>
        { birthdays.map(x => <Birthday birthday={x} />)}
    </div>
}

const Birthday = ({ birthday }: { birthday: UpcomingBirthday }) => {
    return (
        <BirthdayContainer>
            <BirthdayName>{birthday.name}</BirthdayName>
            <BirthdayIn>{birthday.in} day{birthday.in !== 1 ? 's' : ''}</BirthdayIn>
        </BirthdayContainer>
    )
}

const BirthdayContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
`

const BirthdayName = styled.h3`
    font-weight: 800;
    margin-bottom: 0;
`

const BirthdayIn = styled.h3`
    opacity: 0.67;
`
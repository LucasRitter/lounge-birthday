import React from 'react'
import { formatDate, getRandomEmoji, UpcomingBirthday } from './utils/birthdays'
import Twemoji from 'react-twemoji'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

export const HappyBirthday = ({ names: birthdays }: { names: string[] }) => {
    if (!birthdays || birthdays.length <= 0) return null

    return (
        <div
            style={{
                display: 'flex',
                gap: 0,
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 'max(400px, 20vh)',
                marginBottom: 'max(400px, 20vh)',
            }}
        >
            <Twemoji>
                <h1>
                    {getRandomEmoji()}{' '}
                    <span style={{ marginLeft: 24, marginRight: 24 }}>
                        Happy Birthday
                    </span>
                    {getRandomEmoji()}
                </h1>
            </Twemoji>
            {birthdays.map((x) => (
                <h2>{x}</h2>
            ))}
        </div>
    )
}

export const Upcoming = ({ birthdays }: { birthdays: UpcomingBirthday[] }) => {
    if (!birthdays || birthdays.length <= 0) return null

    return (
        <div>
            <h2 style={{ fontWeight: 800 }}>Upcoming Birthdays</h2>
            {birthdays.map((x) => (
                <Birthday birthday={x} />
            ))}
        </div>
    )
}

const Birthday = ({ birthday }: { birthday: UpcomingBirthday }) => {
    const [isHovered, setHovered] = React.useState(false)

    return (
        <BirthdayContainer>
            <BirthdayName>
                {birthday.name}{' '}
                {birthday.nickname && (
                    <BirthdayNickname>{birthday.nickname}</BirthdayNickname>
                )}
            </BirthdayName>
            <BirthdayDate
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                layout
                transition={{
                    duration: 0.1,
                }}
            >
                <AnimatePresence>
                    {birthday.in === 69 && <Nice>nice</Nice>}
                    <BirthdayIn>
                        {birthday.in} day{birthday.in !== 1 ? 's' : ''}
                    </BirthdayIn>
                    {isHovered && (
                        <motion.div
                            style={{
                                marginLeft: 8,
                            }}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 0.5,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                        >
                            <BirthdayIn>{formatDate(birthday.date)}</BirthdayIn>
                        </motion.div>
                    )}
                </AnimatePresence>
            </BirthdayDate>
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

const BirthdayNickname = styled.span`
    font-weight: 500;
    font-size: 67%;
    opacity: 0.67;
    margin-left: 4px;
`

const BirthdayDate = styled(motion.div)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const BirthdayIn = styled.h3`
    opacity: 0.67;
`

const Nice = styled.h3`
    animation: nice 1s infinite;
    animation-timing-function: linear;
    color: red;
    margin-right: 8px;
`

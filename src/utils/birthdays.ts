import data from '../../data/birthdays.yaml'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]
const DAY_LENGTH = 1000 * 60 * 60 * 24

export interface Birthday {
    name: string
    nickname?: string
    month: string
    day: number
}

export interface UpcomingBirthday {
    name: string
    nickname?: string
    in: number
    date: Date
}

interface Date {
    day: number
    month: string
}

const birthdays: Birthday[] = data

export const getUpcomingBirthdays = (): UpcomingBirthday[] => {
    const dateNow = new Date(Date.now())
    dateNow.setHours(0, 0, 0, 0)

    const [yearNow, monthNow, dayNow] = [
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate(),
    ]

    return birthdays.map((x) => {
        let day = x.day
        let month = 1

        let nextYear = false

        // Typecheck month
        month =
            typeof x.month === 'string'
                ? Math.max(months.indexOf(x.month) || 0, 0)
                : x.month - 1

        if (monthNow === month && dayNow === day)
            return {
                name: x.name,
                nickname: x.nickname,
                in: 0,
                date: { day, month: x.month },
            }

        if (monthNow >= month) {
            if (monthNow === month && dayNow < day) {
                nextYear = false
            } else {
                nextYear = true
            }
        }

        const birthdayDate = new Date(yearNow + Number(nextYear), month, day)

        return {
            name: x.name,
            nickname: x.nickname,
            in: Math.ceil(
                (birthdayDate.getTime() - dateNow.getTime()) / DAY_LENGTH
            ),
            date: { day, month: x.month },
        }
    })
}

const EMOJIS = ['🎂', '🎉', '🎊', '🥳', '🌈']

export const getRandomEmoji = (): string => {
    const length = EMOJIS.length
    return EMOJIS[Math.min(Math.floor(Math.random() * length), length - 1)]
}

export const formatDate = (date: Date) => {
    const number = date.day % 10

    return `${date.month} ${date.day}${mapNumberEnding(date.day)}`
}

const mapNumberEnding = (number: number) => {
    switch (number) {
        case 11:
        case 12:
        case 13:
            return 'th'
    }

    const finalNumber = number % 10

    switch (finalNumber) {
        case 1:
            return 'st'
        case 2:
            return 'nd'
        case 3:
            return 'rd'
        default:
            return 'th'
    }
}

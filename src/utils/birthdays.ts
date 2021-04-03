import data from "../../data/birthdays.yaml"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const DAY_LENGTH = 1000 * 60 * 60 * 24

export interface Birthday {
    name: string
    nickname?: string
    month: string | number
    day: number
}

export interface UpcomingBirthday {
    name: string
    nickname?: string
    in: number
}

const birthdays: Birthday[] = data

export const getUpcomingBirthdays = (): UpcomingBirthday[] => {
    const dateNow = new Date(Date.now())
    dateNow.setHours(0, 0, 0, 0)

    const [yearNow, monthNow, dayNow] = [dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDay()]

    return birthdays.map(x => {
        let day = x.day
        let month = 1

        let nextYear = false

        // Typecheck month
        month = typeof x.month === 'string' 
            ? (Math.max(months.indexOf(x.month) || 0, 0)) 
            : x.month - 1

        if (monthNow === month && dayNow === day)
            return { name: x.name, nickname: x.nickname, in: 0 }
            

        if (monthNow >= month) {
            if (monthNow === month && dayNow < day) {
                nextYear = false
            } else {
                nextYear = true
            }
        }
        
        // if (monthNow >= month) {
        //     if (monthNow <= month && dayNow > day) {
        //         nextYear = true
        //     }
        // }

        const birthdayDate = new Date(yearNow + Number(nextYear), month, day)

        return { name: x.name, nickname: x.nickname, in: Math.ceil((birthdayDate.getTime() - dateNow.getTime()) / DAY_LENGTH) }
    })
}

const EMOJIS = ['🎂', '🎉', '🎊', '🥳', '🌈']

export const getRandomEmoji = (): string => {
    const length = EMOJIS.length
    return EMOJIS[Math.min(Math.floor(Math.random() * length), length - 1)]
}
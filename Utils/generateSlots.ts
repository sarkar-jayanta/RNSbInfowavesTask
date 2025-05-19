import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(timezone);

export interface Availability{
    id: number;
    day: string;
    start_at : string;
    end_at : string;
    is_open : string;
}

export interface SlotGroup{
    date : string;
    slots : string[];
}

const DAY_MAP : Record<string,number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
}

export const generateSlots = (availability : Availability[]): SlotGroup[] =>{
    const result : SlotGroup[] = [];
    const now = dayjs().tz('Asia/Kolkata');

    for (let i = 0 ; i< 7 ; i++){
        const date = now.add(i, 'day');
        const dow = date.day();

        const dayData = availability.find(
            (d)=> DAY_MAP[d.day] === dow && d.is_open
        );
        if(!dayData) continue;


        const start = dayjs(`${date.format('YYYY-MM-DD')}T${dayData.start_at}`, {utc : false}).tz('Asia/Kolkata');
        const end = dayjs(`${date.format('YYYY-MM-DD')}T${dayData.end_at}`, {utc : false}).tz('Asia/Kolkata');
    
        let slotStart = roundUpToNext30(start)
        if(i === 0 && slotStart.isBefore(now.add(1, 'hour'))){
            slotStart = roundUpToNext30(now.add(1, 'hour'))
        } 

        const lastSlot = end.subtract(30, 'minute');
        const slots : string[] = [];

        while (slotStart.isSame(lastSlot) || slotStart.isBefore(lastSlot)){
            slots.push(slotStart.format('hh:mm A'))
            slotStart = slotStart.add(30, 'minute')
        }

        if(slots.length > 0){
            result.push({
                date: date.format('dddd, MMM, D'),
                slots
            });
        }
    }

    return result
}

function roundUpToNext30(time : dayjs.Dayjs): dayjs.Dayjs{
    const minutes = time.minute();
    if(minutes === 0 || minutes === 30) return time.second(0).millisecond(0);
    return minutes <30 ? time.minute(30).second(0).millisecond(0) : time.add(1, 'hour').minute(0).second(0).millisecond(0)
}
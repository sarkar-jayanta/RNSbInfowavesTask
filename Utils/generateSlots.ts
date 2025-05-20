export interface Availability {
  id: number;
  day: string;
  start_at: string;
  end_at: string;
  is_open: boolean | string | number;
}

export interface SlotGroup {
  date: string;
  slots: string[];
}

const DAY_MAP: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export const generateSlots = (availability: Availability[]): SlotGroup[] => {
  const result: SlotGroup[] = [];
  const now = new Date();
  const timeZone = 'Asia/Kolkata';

  let i = 0;
  let openDaysCollected = 0;
  const maxDaysLookAhead = 30;

  while (openDaysCollected < 7 && i < maxDaysLookAhead) {
    const date = new Date();
    date.setDate(now.getDate() + i);
    const dayOfWeek = date.getDay();

    const dayData = availability.find(
      d =>
        DAY_MAP[d.day] === dayOfWeek &&
        (d.is_open === true ||
          d.is_open === 'true' ||
          d.is_open === 1 ||
          d.is_open === '1'),
    );

    i++;
    if (!dayData) continue;

    // Construct start and end datetime objects
    const [startHour, startMin, startSec] = dayData.start_at
      .split(':')
      .map(Number);
    const [endHour, endMin, endSec] = dayData.end_at.split(':').map(Number);

    const start = new Date(date);
    start.setHours(startHour, startMin, startSec || 0, 0);

    const end = new Date(date);
    end.setHours(endHour, endMin, endSec || 0, 0);

    // Round up start time to next 30 min
    let slotStart = roundUpToNext30(new Date(start));

    // If it's today, ensure we add 1 hour buffer
    const isToday = isSameDate(now, date);
    if (isToday) {
      const oneHourLater = new Date(now);
      oneHourLater.setHours(oneHourLater.getHours() + 1);
      if (slotStart < oneHourLater) {
        slotStart = roundUpToNext30(oneHourLater);
      }
    }

    const lastSlot = new Date(end.getTime() - 30 * 60000); // 30 mins before end
    const slots: string[] = [];

    while (slotStart <= lastSlot) {
      slots.push(formatTime(slotStart, timeZone));
      slotStart = new Date(slotStart.getTime() + 30 * 60000); // +30 mins
    }

    if (slots.length > 0) {
      result.push({
        date: formatDate(date, timeZone),
        slots,
      });
      openDaysCollected++;
    }
  }

  return result;
};

function roundUpToNext30(date: Date): Date {
  const minutes = date.getMinutes();
  if (minutes === 0 || minutes === 30) return new Date(date.setSeconds(0, 0));
  if (minutes < 30) {
    date.setMinutes(30, 0, 0);
  } else {
    date.setHours(date.getHours() + 1, 0, 0, 0);
  }
  return date;
}

function formatTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(date);
}

function formatDate(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    timeZone,
  }).format(date);
}

function isSameDate(d1: Date, d2: Date): boolean {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

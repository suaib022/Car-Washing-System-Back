export const incrementTime = (time: string, duration: number) => {
  const hour = Number(time.split(':')[0]);
  const minute = Number(time.split(':')[1]);

  if (minute + duration < 60) {
    if (minute + duration < 10 || hour < 10) {
      if (hour < 10) {
        return `0${hour}:0${minute + duration}`;
      } else {
        return `${hour}:0${minute + duration}`;
      }
    } else {
      return `${hour}:${minute + duration}`;
    }
  } else if (minute + duration === 60) {
    if (hour + 1 < 10) {
      return `0${hour + 1}:00`;
    } else {
      return `${hour + 1}:00`;
    }
  } else if (minute + duration > 60) {
    const extraHour = Math.floor((minute + duration) / 60);
    let extraMinute = minute + duration - 60 * extraHour;
    let totalHour = hour + extraHour;
    if (totalHour < 10) {
      totalHour = `0${totalHour}`;
    }
    if (extraMinute < 10) {
      extraMinute = `0${extraMinute}`;
    }

    return `${totalHour}:${extraMinute}`;
  }
};

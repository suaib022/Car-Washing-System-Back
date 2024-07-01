export const incrementTime = (time: string, duration: number) => {
  const hour = Number(time.split(':')[0]);
  const minute = Number(time.split(':')[1]);

  if (minute + duration < 60) {
    return `${hour}:${minute + duration}`;
  } else if (minute + duration === 60) {
    return `${hour + 1}:00`;
  } else if (minute + duration > 60) {
    const extraHour = Math.floor((minute + duration) / 60);
    let extraMinute = minute + duration - 60 * extraHour;
    if (extraMinute < 10) {
      extraMinute = `0${extraMinute}`;
    }

    return `${hour + extraHour}:${extraMinute}`;
  }
};

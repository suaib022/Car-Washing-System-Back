export const incrementTime = (time: string, duration: number) => {
  const hour = Number(time.split(':')[0]);
  const minute = Number(time.split(':')[1]);

  if (minute + duration < 60) {
    console.log('<');
    return `${hour}:${minute + duration}`;
  } else if (minute + duration === 60) {
    console.log('=');
    return `${hour + 1}:00`;
  } else if (minute + duration > 60) {
    console.log('>');
    const extraHour = Math.floor((minute + duration) / 60);
    // console.log('exHr', extraHour);
    let extraMinute = minute + duration - 60 * extraHour;
    if (extraMinute < 10) {
      extraMinute = `0${extraMinute}`;
    }
    // console.log('exMin', extraMinute);
    // console.log('min', minute);
    // console.log('dur', duration);
    // console.log('exMin', extraMinute);
    // const extraMinute = minute + duration - 60;
    return `${hour + extraHour}:${extraMinute}`;
  }
};

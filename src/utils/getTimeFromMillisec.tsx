const pad = (value: number) => {
    const paddedValue = String(value).length <= 2 ? 2 : String(value).length
    return String(value).padStart(paddedValue, '0');
  };

  const getTimeComponents = (time: number) => {
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
  };

export default getTimeComponents
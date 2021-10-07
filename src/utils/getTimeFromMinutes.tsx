const pad = (value: number) => {
    const paddedValue = String(value).length <= 2 ? 2 : String(value).length
    return String(value).padStart(paddedValue, '0');
  };

  const getTimeComponents = (time: number) => {
    const hours = pad(Math.floor((time % (60 * 24)) / (60)));
    const mins = pad(Math.floor((time % (60))));

    return { hours, mins };
  };

export default getTimeComponents
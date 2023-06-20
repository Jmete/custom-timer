export const TimeFormat = (duration) => {
  // Hours, minutes and seconds
  // Credit to Vishal from stackoverflow
  // https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds

  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = Math.round(~~duration % 60);

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let fTime = "";

  if (hrs > 0) {
    fTime += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  fTime += "" + mins + ":" + (secs < 10 ? "0" : "");
  fTime += "" + secs;

  return fTime;
};

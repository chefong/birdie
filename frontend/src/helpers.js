import moment from 'moment';

export function getTimeSince(timestamp) {
  const minutesSince = moment().diff(timestamp, "minutes");
  const hoursSince = moment().diff(timestamp, "hours");
  const daysSince = moment().diff(timestamp, "days");
  const weeksSince = moment().diff(timestamp, "weeks");
  const monthsSince = moment().diff(timestamp, "months");
  const yearsSince = moment().diff(timestamp, "years");
  
  let timeSince = yearsSince;

  if (minutesSince < 60) {
    console.log("Returning minutesSince", minutesSince);
    timeSince = minutesSince.toString() + " minute";
    if (minutesSince !== 1) {
      timeSince += "s";
    }
  } else if (hoursSince < 24) {
    console.log("Returning hoursSince", hoursSince);
    timeSince = hoursSince.toString() + " hour";
    if (hoursSince !== 1) {
      timeSince += "s";
    }
  } else if (daysSince < 7) {
    console.log("Returning daysSince", daysSince);
    timeSince = daysSince.toString() + " day";
    if (daysSince !== 1) {
      timeSince += "s";
    }
  } else if (weeksSince < 4) {
    console.log("Returning weeksSince", weeksSince);
    timeSince = weeksSince.toString() + " week";
    if (weeksSince !== 1) {
      timeSince += "s";
    }
  } else if (monthsSince < 12) {
    console.log("Returning monthsSince", monthsSince);
    timeSince = monthsSince.toString() + " month";
    if (monthsSince !== 1) {
      timeSince += "s";
    }
  }

  return timeSince + " ago";
}
import moment   from 'moment';
import business from 'moment-business';

export const getWorkingDays = () => {
    // get the current year
    const currentYear = parseInt(moment().format('YYYY'), 10);

    // January 1st of the year before
    const lastYearJanuary = moment([currentYear - 1, 0, 1]);
    const nextYearDec     = moment([currentYear + 1, 11, 31]);

    const workingDays = {};

    let loopDate = lastYearJanuary;
    while (true) {
        if (business.isWeekDay(loopDate)) {
            const monthYear = loopDate.format("MMMM") + " " + loopDate.format("YYYY");

            const existingValue    = workingDays[monthYear] === undefined ? 0 : workingDays[monthYear].days;
            workingDays[monthYear] = {days: existingValue + 1, hours: 8 * (existingValue + 1)};
        }

        loopDate = loopDate.add(1, "day");
        if (loopDate.isAfter(nextYearDec)) {
            break;
        }
    }

    return workingDays;

};
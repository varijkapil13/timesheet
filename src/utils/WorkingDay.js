import moment   from 'moment';
import business from 'moment-business';

export const getWorkingDays = (holidays) => {
    // get the current year

    const currentYear = parseInt(moment().format('YYYY'), 10);

    // January 1st of the year before
    const lastYearJanuary = moment([currentYear, 0, 1]);
    // const lastYearJanuary = moment([currentYear - 1, 0, 1]);
    // const nextYearDec     = moment([currentYear + 1, 11, 31]);
    const nextYearDec = moment([currentYear, 11, 31]);
    const workingDays = {};
    let loopDate      = lastYearJanuary;
    while (true) {
        if (business.isWeekDay(loopDate)) {
            if (holidays !== null && doesNotContainsDate(holidays, loopDate)) {
                const monthYear        = loopDate.format("MMMM") + " " + loopDate.format("YYYY");
                const existingValue    = workingDays[monthYear] === undefined ? 0 : workingDays[monthYear];
                workingDays[monthYear] = existingValue + 1;
            }

        }

        loopDate = loopDate.add(1, "day");
        if (loopDate.isAfter(nextYearDec)) {
            break;
        }
    }

    return workingDays;

};

const doesNotContainsDate = (array, date) => {

    const filteredDates = array.filter(element => {
        return element === date.format();
    });

    return filteredDates.length <= 0;
};
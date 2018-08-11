export const sortByMonth = (arr) => {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    arr.sort(function (a, b) {
        return months.indexOf(a.key)
            - months.indexOf(b.key);
    });
};

export const convertToHours = (time) => {
    const remainder     = time % 1;
    const remainderTime = new Date(remainder * 3600 * 1000);
    return Math.floor(time) + ':' + ('0' + remainderTime.getMinutes()).slice(-2);
};
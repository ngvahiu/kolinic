export function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [year, month, day].join('-');
}

const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function formatDateHour(date = new Date()) {
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = months[+date.toLocaleString('default', { month: '2-digit' })];
    const year = date.toLocaleString('default', { year: 'numeric' });
    const hour = date.toLocaleString('default', { hour: '2-digit' }).split(' ');
    const minute = date.toLocaleString('default', { minute: '2-digit' });

    return `${day} ${month} ${year}, ${hour[0]}:${minute} ${hour[1]}`;
}

export function getNextDate(date = new Date()) {
    const tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1); // Add 1 to today's date and set it to tomorrow
    return formatDate(tomorrow);
}
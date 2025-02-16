const SERVER_URL = "https://goalsappback-production.up.railway.app";

function formatDate(input, weekday=false, year=false) {
    const options =  {
        month: '2-digit',
        day: '2-digit'
    };
    if(weekday) {
        options.weekday = 'long';
    }
    if(year) {
        options.year = 'numeric';
    }
    const date = new Date(input+" GMT-0300");
    const str = date.toLocaleString('es', options);
    return str.charAt(0).toUpperCase() + str.slice(1);
}
//Concierte el timestamp a texto de fecha
export function formatDateHour(timeStamp: string | number ) {
    let forceCast : Number = Number(timeStamp);
    let  d = new Date(new Date( Number(forceCast) * 1000 )),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    let fecha = [year, month, day].join('-');

    let hour = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    return fecha + 'T' + hour.replace(new RegExp(escapeStr('.'), 'g'), ':');;
}

function escapeStr(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

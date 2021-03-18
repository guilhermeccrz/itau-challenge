
const translateIdToMonth = (id) => {
    const month = {
        '01': 'Janeiro',
        '02': 'Fevereiro',
        '03': 'Março',
        '04': 'Abril',
        '05': 'Maio',
        '06': 'Junho',
        '07': 'Julho',
        '08': 'Agosto',
        '09': 'Setembro',
        '10': 'Outubro',
        '11': 'Novembro',
        '12': 'Dezembro',
    };

    return month[id];
}
const normalizeKey = (key) => {
   return key.replace(/[\s]/g, '').toLowerCase().replace(/[ç]/g,'c').replace(/ê/g,'e');
}

const normalizeTransactionValue = (value) => {
    return value.replace(/[R$\s]/g, '').replace(/[.]/g, '').replace(/[,]/g, '.');
}

const maskTransactionValue = (value) => {
    value += '';
    let x = value.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? ',' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

export {translateIdToMonth, normalizeKey, normalizeTransactionValue, maskTransactionValue};

const translateIdToMonth = (id) => {
    const month = {
        '1': 'Janeiro',
        '2': 'Fevereiro',
        '3': 'Março',
        '4': 'Abril',
        '5': 'Maio',
        '6': 'Junho',
        '7': 'Julho',
        '8': 'Agosto',
        '9': 'Setembro',
        '10': 'Outubro',
        '11': 'Novembro',
        '12': 'Dezembro',
    };

    return month[id];
}

const translateIdToCategory = (id) => {
    const month = {
        '1': 'Transporte',
        '2': 'Compras Online',
        '3': 'Saúde e Beleza',
        '4': 'Serviços Automotivos',
        '5': 'Restaurantes',
        '6': 'Super Mercados',
    };

    return month[id];
}

const normalizeKey = (key) => {
   return key.replace(/[\s]/g, '').toLowerCase().replace(/[ç]/g,'c').replace(/ê/g,'e');
}

const normalizeTransactionValue = (value) => {
    return value.replace(/[R$\s]/g, '').replace(/[.]/g, '').replace(/[,]/g, '.');
}

const maskTransactionValueToFixed = (value) => {
    value = value.toFixed(2);
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

export {translateIdToMonth, translateIdToCategory, normalizeKey, normalizeTransactionValue, maskTransactionValueToFixed, maskTransactionValue};
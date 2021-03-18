import { translateIdToMonth, normalizeKey, normalizeTransactionValue, maskTransactionValue } from './helpers' ;

const list = [];

const mapRow = (headings) => {
    return function mapRowToObject({ cells }) {
        return list.push( [...cells].reduce(function(result, cell, i) {
            const value = cell.innerText;

            return Object.assign(result, { [headings[i]]: value });
            }, {})
        );
    };
}

const parseTable = (table) => {
    var headings = [...table.tHead.rows[0].cells].map(
        heading => normalizeKey(heading.innerText)
    );
  
    return [...table.tBodies[0].rows].map(mapRow(headings));
}


let totalMonths = {
    '01':0,
    '02':0,
    '03':0,
    '04':0,
    '05':0,
    '06':0,
    '07':0,
    '08':0,
    '09':0,
    '10':0,
    '11':0,
    '12':0,
}

const generateMonthObjects = () => {
    Object.keys(totalMonths).map(function(key, index) {
        list.map((transaction) => {
            if(key === transaction.mesdelancamento) {
                totalMonths[key] = totalMonths[key] + parseFloat(normalizeTransactionValue(transaction.valor));
            }
        });
        totalMonths[key] = parseFloat(totalMonths[key]).toFixed(2);
    });

    generateConsolidatedTable(totalMonths);
}

const generateConsolidatedTable = (totalMonths) => {
    Object.keys(totalMonths).sort(function(a,b) { return +a - +b }).map(function(key, index) {
        let tr = '';
        if(parseFloat([totalMonths[key]][0]) > 0 ) {
            tr = '<tr>';
            tr += '<td>' + translateIdToMonth(key) + '</td><td>R$ ' + maskTransactionValue(totalMonths[key]) + '<td></tr>' ;
        }

        document.getElementById('tb_consolidado').getElementsByTagName('tbody')[0].innerHTML += tr;
    })
} 

const table = document.getElementById('tb_fatura');
const tableConsolidado = document.getElementById('tb_consolidado');

parseTable(table);
generateMonthObjects();
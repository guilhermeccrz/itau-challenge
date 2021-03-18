import React from "react";
import { translateIdToMonth, translateIdToCategory, normalizeKey, normalizeTransactionValue, maskTransactionValueToFixed,  maskTransactionValue } from 'helpers' ;

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/tabsStyle.js";

const useStyles = makeStyles(styles);

const generateMonthObjects = (lancamentos, totalMonths ) => {
  Object.keys(totalMonths).map(function(key, index) {
    lancamentos.map((transaction) => {
          if(key == transaction.mes_lancamento) {
              totalMonths[key] = totalMonths[key] + transaction.valor;
          }
      });
      totalMonths[key] = parseFloat(totalMonths[key]).toFixed(2);
  });

  return totalMonths;
}

const generateCategoriesObjects = (lancamentos, totalCategories ) => {
  //console.log(lancamentos);
  Object.keys(totalCategories).map(function(key, index) {
    lancamentos.map((transaction) => {
        if(key == transaction.categoria) {
          totalCategories[key] = totalCategories[key] + transaction.valor;
        }
    });
    totalCategories[key] = parseFloat(totalCategories[key]).toFixed(2);
  });

  //console.log(totalCategories);

  return totalCategories;
}

const generateTotalCategories = (category) => {
  const totalCategories = {};
  category.map((categorie) => {
      totalCategories[(categorie.id).toString()] = 0;
  });
  console.log(totalCategories);

  return totalCategories;
}


export default function SectionTabs(props) {
  const classes = useStyles();
  const totalMonths = {
    '1':0,
    '2':0,
    '3':0,
    '4':0,
    '5':0,
    '6':0,
    '7':0,
    '8':0,
    '9':0,
    '10':0,
    '11':0,
    '12':0,
  }

  const totalCategories = generateTotalCategories(props.categorias);
  
  const lancamentosConsolidados = generateMonthObjects(props.lancamentos, totalMonths);
  const lancamentosCategorias = generateCategoriesObjects(props.lancamentos, totalCategories);

  return (
    <div id="nav-tabs" className={classes.navItau}>
          <CustomTabs
            plainTabs
            headerColor="danger"
            tabs={[
              {
                tabName: "Lista Geral",
                tabContent: (
                  <ul className={classes.listaItau}>
                    {props.lancamentos.map((lancamento) => (
                      <li className={classes.item}>
                        <React.Fragment key={lancamento.id}>
                            {lancamento.origem}
                            <strong className={classes.valor} >R$ {maskTransactionValueToFixed(lancamento.valor)}</strong>
                        </React.Fragment>
                      </li>
                    ))}
                  </ul>
                )
              },
              {
                tabName: "Por mês",
                tabContent: (
                  <ul className={classes.listaItau}>
                    {Object.keys(lancamentosConsolidados).sort(function(a,b) { return +a - +b }).map((key, index) => (
                        parseInt(totalMonths[key]) > 0 &&
                        <React.Fragment key={lancamentosConsolidados[key]}>
                            <li className={classes.item}>
                              {translateIdToMonth(key)}
                              <strong className={classes.valor} >R$ {maskTransactionValue(totalMonths[key])}</strong>
                            </li>
                        </React.Fragment> 
                      ))
                    }
                  </ul>
                )
              },
              {
                tabName: "Por categoria",
                tabContent: (
                  <ul className={classes.listaItau}>
                    {Object.keys(lancamentosCategorias).sort(function(a,b) { return +a - +b }).map((key, index) => (
                        parseInt(totalCategories[key]) > 0 &&
                        <React.Fragment key={lancamentosCategorias[key]}>
                            <li className={classes.item}>
                              {translateIdToCategory(key)}
                              <strong className={classes.valor} >R$ {maskTransactionValue(totalCategories[key])}</strong>
                            </li>
                        </React.Fragment> 
                      ))
                    }
                  </ul>
                )
              }
            ]}
          />
    </div>
  );
}

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { translateIdToMonth, translateIdToCategory, normalizeKey, normalizeTransactionValue, maskTransactionValueToFixed,  maskTransactionValue } from '../helpers' ;
import Head from 'next/head';
import '../public/styles.global.css';
import TBGeral from '../components/tb_geral';
import TBConsolidado from '../components/tb_consolidado';

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

function Home(props) {
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

  const lancamentosConsolidados = generateMonthObjects(props.lancamentos, totalMonths);

  return (
    <div className="container">
      <Head>
        <title>Challenge#2 - Guilherme Cruz</title>
      </Head>

      <main>
        <h2 className="title">Itaú <strong>Challenge#2</strong></h2>        
        <p className="description">Usando <code>React/NextJS</code></p>

        <div className="grid">
          <div className="card">
              <h2>Consolidado</h2>
              <TBConsolidado>
                  { Object.keys(lancamentosConsolidados).sort(function(a,b) { return +a - +b }).map((key, index) => (
                       parseInt(totalMonths[key]) > 0 &&
                        <React.Fragment key={lancamentosConsolidados[key]}>
                            <tr>
                              <td>{translateIdToMonth(key)}</td>
                              <td>{maskTransactionValue(totalMonths[key])}</td>
                            </tr>
                        </React.Fragment>
                      
                  ))}
              </TBConsolidado>
              
              <h2>Geral</h2>
              <TBGeral>
                {props.lancamentos.map((lancamento) => (
                  <React.Fragment key={lancamento.id}>
                    <tr>
                      <td>{lancamento.origem}</td>
                      <td>{translateIdToCategory(lancamento.categoria)}</td>
                      <td><strong>R$ {maskTransactionValueToFixed(lancamento.valor)}</strong></td>
                      <td>{translateIdToMonth(lancamento.mes_lancamento)}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </TBGeral>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {

  const res = await fetch('https://desafio-it-server.herokuapp.com/lancamentos');
  const lancamentos = await res.json();

  return {
    props: {
      lancamentos,
    },
  }
}

export default Home;
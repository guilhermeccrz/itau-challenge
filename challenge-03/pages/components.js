import React from "react";
import fetch from 'isomorphic-unfetch';
import classNames from "classnames";
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import GridItem from "components/Grid/GridItem.js";
import SectionTabs from "pages-sections/Components-Sections/SectionTabs.js";
import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import { translateIdToMonth, translateIdToCategory, normalizeKey, normalizeTransactionValue, maskTransactionValueToFixed,  maskTransactionValue } from '../helpers' ;
import TBGeral from '../components/tb_geral';
import TBConsolidado from '../components/tb_consolidado';

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Itaú Gastos Cartão"
        fixed
      />

      <GridItem md={12} className={classes.textCenter}>
        <SectionTabs lancamentos={props.lancamentos} categorias={props.categorias} />
      </GridItem>
    </div>
  );
}

export async function getStaticProps() {

  const res = await fetch('https://desafio-it-server.herokuapp.com/lancamentos');
  const res2 = await fetch('https://desafio-it-server.herokuapp.com/categorias');
  const lancamentos = await res.json();
  const categorias = await res2.json();

  return {
    props: {
      lancamentos,
      categorias,
    },
  }
}
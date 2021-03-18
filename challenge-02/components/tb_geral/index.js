import React, { Children } from 'react';
import styled from 'styled-components';

const TBGeral= styled.table`

`;

function Component(props) {
  return (
    <TBGeral className="table" id="tb_">
      <thead>
        <tr>
          <th scope="col">Origem</th>
          <th scope="col">Categoria</th>
          <th scope="col">Valor gasto</th>
          <th scope="col">Mês</th>
        </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </TBGeral>
  )
} 

export default Component;
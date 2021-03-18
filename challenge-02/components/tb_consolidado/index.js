import React, { Children } from 'react';
import styled from 'styled-components';

const TBConsolidado= styled.table`

`;

function Component(props) {
  return (
    <TBConsolidado className="table" id="tb_consolidado">
      <thead>
        <tr>
          <th scope="col">Mês</th>
          <th scope="col">Total gasto</th>
        </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </TBConsolidado>
  )
} 

export default Component;
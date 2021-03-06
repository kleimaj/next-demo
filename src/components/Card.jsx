import styled from '@emotion/styled';

export const CardHeader = styled.h3`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  border-radius: 8px 8px 0 0;
  background: ${(props) => (props.darker ? `#36847F` : `#73b899`)};
  color: white;
  margin: 0;
  padding: 12px;
`;
export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => (props.column ? `column` : `row`)};
  padding: 25px;
`;

export const Card = styled.div`
  border: 3px solid ${(props) => (props.darker ? `#36847F` : `#73b899`)};
  width: 300px;
  border-radius: 12px;
  // padding: 12px 24px;
  margin: 15px;
`;

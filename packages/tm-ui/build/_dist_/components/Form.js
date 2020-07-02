import styled from '/web_modules/@emotion/styled.js';
const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  margin-top: 0.3rem;
`;
const FormInput = styled.input`
  display: block;
  margin-bottom: 0.5rem;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  outline: none;
  border: 1px solid #000;
  font-size: 1rem;
  line-height: 1.4;
  width: 100%;
`;
const FormSelect = styled.select`
  display: block;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.4rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #000;
  border-radius: 5px;
  outline: none;
  width: 100%;

  & option {
  }
`;
export { FormInput, FormLabel, FormSelect };

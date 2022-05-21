import styled from 'styled-components';

export const CadastroDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 800px;
  padding: 0 2rem;
`;

export const FormCadastro = styled.form.attrs( props => ({
  onSubmit: props.onSubmit
}))`
  border-color: black;
  height:500px;
  width: 100%;
  max-width: 400px;
  padding: .5rem;
  label {
    margin-bottom: 5px;
    margin-top: 5px;
    display: block;
  };
  input {
    width: 100%;
    height: auto;
  };
  div .button {
    text-align: center;
    margin-top: 0.7rem;
  };
  p {
    color: red;
    font-size: smaller;
  }
`;


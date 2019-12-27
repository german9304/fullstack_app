import styled from 'styled-components';

const FormStyles = styled.form`
  padding: 1em;
  width: 430px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  label {
    font-family: var(--global-font);
    display: block;
    margin-bottom: 0.2em;
  }

  input {
    padding: 0.4em 0.4em;
    font-size: 1em;
    outline: none;
    box-sizing: border-box;
    width: 100%;
  }

  .form {
    margin-bottom: 1.2em;
  }
`;

export default FormStyles;

import styled from 'styled-components';
import FormStyles from './components/styles/FormStyles';
import WithLayout from './components/Layout';
import StyledButton from './components/styles/ButtonStyles';

const StyledAuthForm = styled.div``;
function Signup() {
  const FORM_FIELDS = ['name', 'email', 'last name', 'password', 'age'];

  return (
    <StyledAuthForm className='auth signup-form'>
      <header>
        <h1>Sign up to digital libray</h1>
      </header>
      <FormStyles>
        {FORM_FIELDS.map((field, i) => {
          return (
            <div key={`${field}${i}`} className='form form-formgroup'>
              <label htmlFor={field}>{field}</label>
              <input type='text' name={field} />
            </div>
          );
        })}
        <div className='form-btn'>
          <StyledButton type='submit'>Join us</StyledButton>
        </div>
      </FormStyles>
    </StyledAuthForm>
  );
}

export default WithLayout(Signup);

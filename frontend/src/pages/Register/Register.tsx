import { Field, Formik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import { RegisterContainer, Logo, RegisterForm, Title } from './Register.style';

import logo from 'assets/logo.svg';
import { useHistory, useLocation } from 'react-router';
import { CreateUserDto, useCreateUser } from './Register.hooks';
import InputRow from 'components/InputRow';
import Button from 'components/Button';
import { PATHS } from 'routes';

const CreateAccountSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Register: React.FC = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const intl = useIntl();
  const [state, doCreateUser] = useCreateUser();
  const association = query.get('association');
  const inscriptionToken = query.get('inscriptionToken');

  if (association === null || inscriptionToken == null) {
    return (
      <div>
        <FormattedMessage id="register.incorrect-url" />
      </div>
    );
  }

  return (
    <RegisterContainer>
      <Logo alt="Forge logo" src={logo} />
      <Title>
        <FormattedMessage id="register.title" values={{ association }} />
      </Title>
      <Formik<Pick<CreateUserDto, 'email' | 'password'> & { passwordConfirmation: string }>
        initialValues={{
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={CreateAccountSchema}
        onSubmit={async ({ passwordConfirmation, ...values }, { setSubmitting }) => {
          await doCreateUser({ ...values, inscriptionToken });
          setSubmitting(false);
          history.push(PATHS.LOGIN);
        }}
      >
        {props => (
          <RegisterForm>
            <Field
              type="text"
              name="email"
              label={<FormattedMessage id="register.email" />}
              placeholder={intl.formatMessage({ id: 'register.email-placeholder' })}
              component={InputRow}
              error={(props.touched.email ?? false) && props.errors.email}
            />
            <Field
              type="password"
              name="password"
              label={<FormattedMessage id="register.password" />}
              placeholder={intl.formatMessage({ id: 'register.password-placeholder' })}
              component={InputRow}
              error={(props.touched.password ?? false) && props.errors.password}
            />
            <Field
              type="password"
              name="passwordConfirmation"
              label={<FormattedMessage id="register.passwordConfirmation" />}
              placeholder={intl.formatMessage({ id: 'register.password-placeholder' })}
              component={InputRow}
              error={(props.touched.password ?? false) && props.errors.password}
            />
            <Button type="submit" disabled={props.isSubmitting || state.loading}>
              <FormattedMessage id="register.submit-button" />
            </Button>
          </RegisterForm>
        )}
      </Formik>
    </RegisterContainer>
  );
};

export default Register;

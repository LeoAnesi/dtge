import { Field, Formik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import { RegisterContainer, Logo, RegisterForm, Title } from './ResetPassword.style';

import logo from 'assets/logo.svg';
import { useHistory, useLocation } from 'react-router';
import { ResetPasswordDto, useResetPassword } from './ResetPassword.hooks';
import InputRow from 'components/InputRow';
import Button from 'components/Button';
import { PATHS } from 'routes';
import { toast } from 'react-toastify';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Register: React.FC = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const intl = useIntl();
  const [state, doResetPassword] = useResetPassword();
  const email = query.get('email');
  const resetPasswordToken = query.get('resetPasswordToken');

  if (email === null || resetPasswordToken == null) {
    return (
      <div>
        <FormattedMessage id="reset-password.incorrect-url" />
      </div>
    );
  }

  return (
    <RegisterContainer>
      <Logo alt="Dtge logo" src={logo} />
      <Title>
        <FormattedMessage id="reset-password.title" values={{ email }} />
      </Title>
      <Formik<Pick<ResetPasswordDto, 'password'> & { passwordConfirmation: string }>
        initialValues={{
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={async ({ passwordConfirmation, ...values }, { setSubmitting }) => {
          await doResetPassword({ ...values, resetPasswordToken });
          setSubmitting(false);
          toast.success(intl.formatMessage({ id: 'reset-password.success' }));
          setTimeout(() => history.push(PATHS.LOGIN), 3000);
        }}
      >
        {props => (
          <RegisterForm>
            <Field
              type="password"
              name="password"
              label={<FormattedMessage id="reset-password.password" />}
              placeholder={intl.formatMessage({ id: 'reset-password.password-placeholder' })}
              component={InputRow}
              error={(props.touched.password ?? false) && props.errors.password}
            />
            <Field
              type="password"
              name="passwordConfirmation"
              label={<FormattedMessage id="reset-password.passwordConfirmation" />}
              placeholder={intl.formatMessage({ id: 'reset-password.password-placeholder' })}
              component={InputRow}
              error={(props.touched.password ?? false) && props.errors.password}
            />
            <Button type="submit" disabled={props.isSubmitting || state.loading}>
              <FormattedMessage id="reset-password.submit-button" />
            </Button>
          </RegisterForm>
        )}
      </Formik>
    </RegisterContainer>
  );
};

export default Register;

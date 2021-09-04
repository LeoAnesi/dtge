import React, { useEffect } from 'react';
import { HomeContainer, Logo, Title } from './Admin.style';
import logo from 'assets/logo.svg';
import { FormattedMessage, useIntl } from 'react-intl';
import { CreateUserDto, useAssociations, useCreateUser, useGetUser } from './Admin.hooks';
import MembersTable from './UsersTable';
import { Field, Form, Formik } from 'formik';
import InputRow from 'components/InputRow';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';

const CreateAccountSchema = Yup.object().shape({
  association: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Home: React.FunctionComponent = () => {
  const intl = useIntl();
  const [{ value: users }, doGetUsers] = useGetUser();
  const { value: associations } = useAssociations();
  const [state, doCreateUser] = useCreateUser();

  useEffect(() => {
    doGetUsers();
  }, [doGetUsers]);

  return (
    <HomeContainer>
      <Logo alt="DTGE logo" src={logo} />
      <Title>
        <FormattedMessage id="admin.title" />
      </Title>
      {users !== undefined && <MembersTable users={users} />}
      <Formik<CreateUserDto>
        initialValues={{ email: '', password: '', association: '' }}
        validationSchema={CreateAccountSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await doCreateUser(values);
          await doGetUsers();
          setSubmitting(false);
        }}
      >
        {/* eslint-disable-next-line complexity */}
        {props =>
          associations !== undefined && (
            <Form>
              <Autocomplete
                id="association"
                options={associations}
                getOptionLabel={option => option}
                style={{ width: 300 }}
                onChange={(event, value) =>
                  props.handleChange('association')({
                    ...event,
                    target: { ...event.target, value },
                  })
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    label={<FormattedMessage id="admin.createUser.association" />}
                    variant="outlined"
                  />
                )}
              />
              <Field
                type="text"
                name="email"
                label={<FormattedMessage id="admin.createUser.email" />}
                placeholder={intl.formatMessage({ id: 'admin.createUser.email-placeholder' })}
                component={InputRow}
                error={(props.touched.email ?? false) && props.errors.email}
              />
              <Field
                type="password"
                name="password"
                label={<FormattedMessage id="admin.createUser.password" />}
                placeholder={intl.formatMessage({ id: 'admin.createUser.password-placeholder' })}
                component={InputRow}
                error={(props.touched.password ?? false) && props.errors.password}
              />
              <button type="submit" disabled={props.isSubmitting || state.loading}>
                <FormattedMessage id="admin.createUser.submit-button" />
              </button>
            </Form>
          )
        }
      </Formik>
    </HomeContainer>
  );
};

export default Home;

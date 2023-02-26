import { Theme, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm, SubmitHandler } from 'react-hook-form';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '2rem',
    backgroundColor: 'rgba(255,255,255,0.5)',
    boxShadow: '0 2px 30px rgba(0,0,0,0.29)',
  },
  inputFieldTitle: {},
  inputField: {
    padding: theme.spacing(3, 1),
    border: '1px #bbb solid',
    borderRadius: '0.6rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.29)',
    margin: theme.spacing(1, 1),
  },
  submit: {
    border: '1px #bbb solid',
    borderRadius: '4rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.29)',
    padding: theme.spacing(3, 20),
    margin: theme.spacing(4, 0),
  },
  form: {
    padding: theme.spacing(5, 3),
    display: 'flex',
    justifyContent: 'center',
  },
  formContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

export default function ContactForm() {
  const classes = useStyles();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: '',
    },
  });
  // Submit your data into Redux store
  const onSubmit = data => console.log(data);

  return (
    <Container className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formContainer}>
          <div>
            <h3>Kom i kontakt med oss</h3>
            <p>Du är bara steg iväg från att få din installation eller inspektion bokad!</p>
          </div>
          <input
            placeholder="Förnamn"
            className={classes.inputField}
            {...register('firstName', { required: true })}
            aria-invalid={errors.firstName ? 'true' : 'false'}
          />
          {errors.firstName?.type === 'required' && <p role="alert">First name is required</p>}
          <input
            placeholder="Efternamn"
            className={classes.inputField}
            {...register('lastName', { required: true })}
            aria-invalid={errors.lastName ? 'true' : 'false'}
          />
          {errors.lastName?.type === 'required' && <p role="alert">Last name is required</p>}
          <input
            placeholder="Mobil +046"
            className={classes.inputField}
            {...register('phoneNumber')}
          />

          <input
            placeholder="E-post"
            className={classes.inputField}
            {...register('email', { required: 'Email Address is required' })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email?.type === 'required' && <p role="alert">Email is required</p>}

          <input placeholder="Adress" className={classes.inputField} {...register('address')} />
          {errors.address?.type === 'required' && <p role="alert">Address is required</p>}
          <input className={classes.submit} type="submit" />
        </div>
      </form>
    </Container>
  );
}

import * as React from 'react'
import * as Styled from './LogIn.styled'
import * as Salem from '../Salem'

import useAuthStore from '../../stores/authStore'

export const LogIn = (props) => {
  const authStore = useAuthStore()
  const [email, setEmail] = React.useState('colshacol@gmail.com')
  const [password, setPassword] = React.useState('Mellow122093')
  const [error, setError] = React.useState()

  const onChange = (setter) => (event) => {
    setter(event.target.value)
  }

  // NOTE: authStore will handle route change if successful.
  const onSubmit = () => {
    authStore.signIn({ email, password }).catch(setError)
  }

  // TODO: Error handling.
  return (
    <Styled.LogInContainer>
      <Salem.H1>templar</Salem.H1>
      <Salem.Text>Log in to continue.</Salem.Text>
      <Styled.LogInFieldsContainer>
        <Styled.LogInField
          value={email}
          type='email'
          placeholder='email address'
          onChange={onChange(setEmail)}
        />

        <Styled.LogInField
          value={password}
          type='password'
          placeholder='password'
          onChange={onChange(setPassword)}
        />
      </Styled.LogInFieldsContainer>
      <Styled.LogInButton onClick={onSubmit}>Log In</Styled.LogInButton>
    </Styled.LogInContainer>
  )
}

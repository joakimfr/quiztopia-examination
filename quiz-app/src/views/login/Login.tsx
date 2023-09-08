import Header from "../../components/header/Header"
import LoginForm from "../../components/loginForm/LoginForm"
import './Login.scss'


function Login () {

  return (
    <div className="login">
      <Header />
      <LoginForm />
      </div>
  )
}

export default Login
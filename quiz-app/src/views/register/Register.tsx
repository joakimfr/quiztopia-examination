import Header from "../../components/header/Header"
import RegisterForm from "../../components/registerForm/RegisterForm"
import './Register.scss'

RegisterForm

function Register () {

  return (
    <div className="register">
      <Header />
      <RegisterForm />
    </div>
  )
}

export default Register
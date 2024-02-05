import React,{useEffect,useContext} from 'react'
import { AuthContext } from '../context/authContext';
import AuthForm from '../components/AuthForm'
import { useNavigate, } from 'react-router-dom';

function Login() {
  const { isUserLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (isUserLoggedIn) {
      navigate('/dashboard');
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <>
    <AuthForm page={"login"}/>
    </>
  )
}

export default Login
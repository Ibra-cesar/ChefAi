import React from 'react'
import SignUpForm from '../components/AuthForm/SignUpForm';
import Header from '../components/Header';

const SignUpPage = () => {
  return (
    <main className="bg-white mx-auto my-22 md:w-[35rem] sm:w-[25rem] border-4 border-gray-300 rounded-xl">
      <Header/>
      <SignUpForm/>
    </main>
  );
}

export default SignUpPage
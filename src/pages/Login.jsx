import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from "../validation/authSchema.js";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem('token', JSON.stringify("mock-jwt-token"));
      navigate('/dashboard');
    } else {
      setError('root', {
        message: 'Invalid email or password. Please register first.',
      });
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" placeholder="Password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}

        {errors.root && <p style={{ color: 'red' }}>{errors.root.message}</p>}

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account?</p>
      <button onClick={() => navigate('/register')}>Register</button>
    </div>
  );
};

export default Login;

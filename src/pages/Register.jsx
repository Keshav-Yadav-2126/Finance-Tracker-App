import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from "../validation/authSchema.js";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    // 1. Read existing users array (or default to empty array)
    console.log(data)
    const existing = JSON.parse(localStorage.getItem('users')) || [];

    // 2. Check if email is already taken
    const alreadyExists = existing.find((u) => u.email === data.email);
    if (alreadyExists) {
      setError('email', {
        type: 'manual',
        message: 'Email is already registered',
      });
      return;
    }

    // 3. Add new user (storing name, email, password in plain text for demo)
    existing.push({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    localStorage.setItem('users', JSON.stringify(existing));

    // 4. Redirect to login
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

        <input type="password" placeholder="Password" {...register('password')} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

        <button type="submit">Register</button>
      </form>

      <p>Already have an account?</p>
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
};

export default Register;

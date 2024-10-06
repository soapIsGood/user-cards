import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/authSlice';
import './LoginForm.css';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import EyeIcon from '../EyeIcon/EyeIcon';
import Button from '../Button/Button';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<{ name: string; email: string; password: string; confirmPassword: string }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ email: string; password: string, confirmPassword: string}>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Валидация email и пароля

    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: 'Некорректный email' });
    } else {
      setErrors({ ...errors, email: '' });
    }
    // Совпадение паролей
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Пароли не совпадают' });
      return;
    }
    
    // Логика для регистрации
    const resultAction = await dispatch(registerUser(formData));
  if (registerUser.fulfilled.match(resultAction)) {
    // Регистрация успешна
    navigate('/users');
  } else {
    // Ошибка регистрации
    console.error('Ошибка регистрации:', resultAction.payload);
    setErrors({ ...errors, email: 'Ошибка регистрации' });
  }
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className='form-wrapper'>
          <h2>Регистрация</h2>
          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Введите имя"
            />
          </div>
          <div className="form-group">
            <label>Электронная почта (моковая почта - eve.holt@reqres.in)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@mail.ru"
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="******"
              />
              <Button onClick={togglePasswordVisibility}  
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  className="eye-icon-button">
                <EyeIcon/>
              </Button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label>Подтвердите пароль</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="******"
              />
              <Button onClick={togglePasswordVisibility}  
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                    className="eye-icon-button">
                <EyeIcon/>
              </Button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default LoginForm;

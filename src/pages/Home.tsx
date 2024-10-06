import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUsers, incrementPage, resetState } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import classes from '../styles/Home.module.css'
import Button from '../components/Button/Button';
import LikeIcon from '../components/LikeIcon/LikeIcon';
import ExitIcon from '../components/ExitIcon/ExitIcon';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, error, currentPage } = useSelector((state: RootState) => state.users);

  useEffect(() => {
      dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  const handleShowMore = () => {
    dispatch(incrementPage());
  };

  const handleLogout = () => {
    dispatch(resetState());
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки: {error}</p>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.about}>
          <h1>Наша команда</h1>
          <h2>Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций. </h2>
        </div>
        <Button className={classes.exit} onClick={handleLogout}>Выход</Button>
        <ExitIcon className={classes.exitsvg} onClick={handleLogout}/>
      </div>
      <div className={classes['cards-wrapper']}>
        {users.map((user) => (
          <Link to={`/users/${user.id}`} className={classes.card} key={user.id}>
            <img src={`${user.avatar}`} alt="" />
            <h3 className={classes.username}>{user.first_name} {user.last_name}</h3>
            <LikeIcon userId={user.id}/>
          </Link>
        ))}
      </div>
      <Button 
        className={classes.more}
        onClick={handleShowMore}>
          Показать еще 
          <svg width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
          >
          <path d="M19.497 7.98903L12 15.297L4.50299 7.98903C4.36905 7.85819 4.18923 7.78495 4.00199 7.78495C3.81475 7.78495 3.63494 7.85819 3.50099 7.98903C3.43614 8.05257 3.38461 8.12842 3.34944 8.21213C3.31426 8.29584 3.29614 8.38573 3.29614 8.47653C3.29614 8.56733 3.31426 8.65721 3.34944 8.74092C3.38461 8.82463 3.43614 8.90048 3.50099 8.96403L11.4765 16.74C11.6166 16.8765 11.8044 16.953 12 16.953C12.1956 16.953 12.3834 16.8765 12.5235 16.74L20.499 8.96553C20.5643 8.90193 20.6162 8.8259 20.6517 8.74191C20.6871 8.65792 20.7054 8.56769 20.7054 8.47653C20.7054 8.38537 20.6871 8.29513 20.6517 8.21114C20.6162 8.12715 20.5643 8.05112 20.499 7.98753C20.365 7.85669 20.1852 7.78345 19.998 7.78345C19.8108 7.78345 19.6309 7.85669 19.497 7.98753V7.98903Z" fill="#151317" />
          </svg>
      </Button>
      <div></div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from '../styles/UserPage.module.css'
import Button from '../components/Button/Button';
import { useDispatch } from 'react-redux';
import { resetState } from '../redux/userSlice';
import BackIcon from '../components/BackIcon/BackIcon';
import ExitIcon from '../components/ExitIcon/ExitIcon';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleLogout = () => {
    dispatch(resetState())
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <p>Загрузка...</p>; // Индикатор загрузки
  }

  if (!user) {
    return <p>Пользователь не найден.</p>;
  }

  return (
    <>
    <div className={classes.container}>
      <div className={classes['header-wrapper']}>
        <div className={classes["header-mobile-buttons"]}>
          <BackIcon className={classes.backsvg} onClick={() => navigate('/users')}/>
          <ExitIcon className={classes.exitsvg} onClick={handleLogout}/>
        </div>
        <div className={classes['user-header']}>
          <div className={classes['back-button-layout']}>
            <Button className={classes.back} onClick={() => navigate('/users')}>Назад</Button>     
          </div>
          <div className={classes['user-info']}>
            <div className={classes.textgap}>
              <h1>{user.first_name} {user.last_name}</h1>
              <p>Партнер</p>
            </div>
            <img className={classes.avatar} src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          </div>
          <div className={classes['exit-button-layout']}>     
            <Button className={classes.exit} onClick={handleLogout}>Выход</Button>
          </div>
        </div>
      </div>
      
      <div className={classes['user-description']}>
        <div className={classes['user-about']}>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel porro soluta voluptates deserunt laborum, iste doloremque magni quidem natus, dolore doloribus cupiditate maxime quaerat harum assumenda libero provident accusantium consequuntur!
        Necessitatibus veritatis alias sapiente rerum neque magnam quae iure ab! Id, ipsam accusamus, magni explicabo enim odio ut perferendis in corporis obcaecati itaque deserunt veniam iste optio quasi quia voluptate!
        At facilis voluptatibus eos asperiores rem cumque vero, minima beatae cupiditate ullam laboriosam ducimus, perferendis possimus magnam exercitationem animi officia in nihil. Inventore, itaque adipisci ipsa blanditiis sunt temporibus hic.
        Minus, harum eaque! Excepturi est esse atque eos voluptas et amet sit. Vel alias quidem doloribus deleniti impedit, ut nihil. A commodi quos hic, ad nesciunt facere. Tenetur, cumque repudiandae.
        Possimus voluptatibus a quidem aliquid placeat facilis vero nostrum illum commodi consequatur, et quas explicabo suscipit saepe nulla doloremque. Velit numquam suscipit illum sequi expedita perspiciatis maxime, voluptas ratione recusandae.</p>
        </div>
        <div className={classes.contacts}>
        <div className={classes.contact}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.554 6.24003L7.17099 2.33503C6.78099 1.88503 6.06599 1.88703 5.61299 2.34103L2.83099 5.12803C2.00299 5.95703 1.76599 7.18803 2.24499 8.17503C5.10661 14.1 9.88503 18.8851 15.806 21.755C16.792 22.234 18.022 21.997 18.85 21.168L21.658 18.355C22.113 17.9 22.114 17.181 21.66 16.791L17.74 13.426C17.33 13.074 16.693 13.12 16.282 13.532L14.918 14.898C14.8482 14.9712 14.7562 15.0195 14.6563 15.0354C14.5564 15.0513 14.4541 15.0339 14.365 14.986C12.1354 13.7021 10.286 11.8503 9.00499 9.61903C8.95702 9.52978 8.93964 9.42726 8.95554 9.32719C8.97144 9.22711 9.01972 9.13502 9.09299 9.06503L10.453 7.70403C10.865 7.29003 10.91 6.65003 10.554 6.23903V6.24003Z" stroke="#512689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>
              +7 999 333-22-11
            </p>
          </div>
          <div className={classes.contact}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 4.5H3C2.60218 4.5 2.22064 4.65804 1.93934 4.93934C1.65804 5.22064 1.5 5.60218 1.5 6V18C1.5 18.3978 1.65804 18.7794 1.93934 19.0607C2.22064 19.342 2.60218 19.5 3 19.5H21C21.3978 19.5 21.7794 19.342 22.0607 19.0607C22.342 18.7794 22.5 18.3978 22.5 18V6C22.5 5.60218 22.342 5.22064 22.0607 4.93934C21.7794 4.65804 21.3978 4.5 21 4.5ZM19.35 6L12 11.085L4.65 6H19.35ZM3 18V6.6825L11.5725 12.615C11.698 12.7021 11.8472 12.7488 12 12.7488C12.1528 12.7488 12.302 12.7021 12.4275 12.615L21 6.6825V18H3Z" fill="#512689" />
            </svg>
            <p>
              Email: {user.email}
            </p>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default UserDetails;

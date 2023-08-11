import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { supabase } from '../../supabase';

const Main = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const getUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(false);
    } else {
      setUser(user);
      console.log(user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logOut = async () => {
    setUser(false);
    alert('로그아웃 되었습니다.');
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        autoplay={{ delay: 2000 }}
      >
        <SwiperSlide>
          <img src={'https://i.postimg.cc/mZ3qdZLh/croissant.png'} style={{ width: '360px' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'https://i.postimg.cc/PfMZ39Bd/marabeef.png'} style={{ width: '360px' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'https://i.postimg.cc/J4vRdmZB/vegansand.jpg'} style={{ width: '360px' }} />
        </SwiperSlide>
      </Swiper>
      <Swiper
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        autoplay={{ delay: 1000 }}
      >
        <SwiperSlide>
          <Event>
            EVENT
            <img src={'https://i.postimg.cc/YCHX90m7/event.png'} style={{ width: '360px' }} />
          </Event>
        </SwiperSlide>
      </Swiper>

      {user ? (
        <>
          <QuickOrder onClick={() => logOut()}>로그아웃</QuickOrder>
          <QuickOrder onClick={() => navigate('/mypage')}>마이페이지</QuickOrder>
        </>
      ) : (
        <>
          <QuickOrder onClick={() => navigate('/login')}>로그인</QuickOrder>
          <QuickOrder onClick={() => navigate('/join')}>회원가입</QuickOrder>
        </>
      )}
      <QuickOrder
        onClick={() => {
          navigate('/orderpage');
        }}
      >
        퀵오더
      </QuickOrder>
    </>
  );
};

const QuickOrder = styled.button`
  width: 150px;
  height: 40px;
  display: block;
  font-size: 18px;
  background-color: #fce8c7;
  border: none;
  color: #222222;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #facd83;
    color: white;
  }
`;

const Event = styled.div`
  width: 360px;
  margin-top: 20px;
  font-size: 17px;
  font-weight: bold;
`;
export default Main;

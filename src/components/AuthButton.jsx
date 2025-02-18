import { memo, useCallback, useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import styled from 'styled-components';

const AuthButtonContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  background: white;
  border: 2px solid #ee1515;
  color: #ee1515;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background: #ee1515;
    color: white;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
`;

const AuthButton = memo(function AuthButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
    setLoading(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  }, []);

  if (loading) {
    return <Button disabled>로딩중...</Button>;
  }

  if (auth.currentUser) {
    return (
      <AuthButtonContainer>
        <UserInfo>
          <img src={auth.currentUser.photoURL} alt="프로필" />
          <span>{auth.currentUser.displayName}</span>
          <Button onClick={handleLogout}>로그아웃</Button>
        </UserInfo>
      </AuthButtonContainer>
    );
  }

  return <Button onClick={handleLogin}>Google 로그인</Button>;
});

export default AuthButton; 
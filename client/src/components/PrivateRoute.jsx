import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/useAuth';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      return( 
        navigate('/signin', { replace: true })
      )
    }
  }, [loading, user, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // Prevent rendering until redirected

  return children;

};

export default PrivateRoute;
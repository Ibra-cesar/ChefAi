import React from 'react'
import { useAuth } from '../../utils/contexts/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import LoadingContainer from '../../components/ui/LoadingContainer';

const DashboardRedirect = () => {
    const {user, loading} = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!loading && user) {
            navigate(`/dashboard/${user.name}`, { replace: true });
        }
    }, [loading, user, navigate]);

    if(loading || !user) {
        <div className="flex justify-center items-center h-screen">
          <LoadingContainer />
        </div>;
    }

  return null; // This component does not render anything directly
}

export default DashboardRedirect
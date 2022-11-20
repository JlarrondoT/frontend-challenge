import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ProfileSummary from '../../components/profile-summary/profile-summary.component';
import WarningAlert from '../../components/warning-alert/warning-alert.component';
import Services from '../../services/user.services';
import './profile.component.css';

function Profile() {
  const { isSuccess: userSuccess, data } = useQuery(
    ['user'],
    Services.fetchUser,
    {
      staleTime: 60000,
    }
  );
  let navigate = useNavigate();
  return (
    <div className="profile-container">
      <div className="profile">
        {userSuccess ? (
          <div>
            <ProfileSummary user={data} />
            <WarningAlert user={data} />
            <div
              className="my-purchases-box"
              onClick={() => navigate('/purchases', { replace: true })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#8C8C8C"
                  fillRule="evenodd"
                  d="M12 .75c2.898 0 5.247 2.35 5.247 5.247v.753h2.921l1.67 15H2.162l1.668-15h2.923v-.753c0-2.825 2.233-5.13 5.03-5.243zm6.826 7.5H5.172l-1.334 12h16.324l-1.336-12zM12 2.25c-2.07 0-3.747 1.678-3.747 3.747v.753h7.494v-.753c0-2.003-1.571-3.638-3.548-3.742z"
                ></path>
              </svg>
              <p>Mis compras</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;

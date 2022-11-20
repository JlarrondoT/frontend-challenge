import { useQuery } from '@tanstack/react-query';
import UserModel from '../../models/user.interface';
import Services from '../../services/user.services';
import './warning-alert.component.css';

export default function WarningAlert({ user }: UserModel) {
  const { isError, isLoading, isSuccess, data } = useQuery(
    ['userRestriction'],
    () => Services.fetchUserRestriction(String(user.id_usuario)),
    { staleTime: 60000 }
  );

  return (
    <div>
      {isSuccess &&
        data.map((restriction: any, index: number) => (
          <div
            className="alert-container"
            data-testid="warning-alert-message"
            key={index}
          >
            ❗ {restriction.mensaje}
          </div>
        ))}
    </div>
  );
}

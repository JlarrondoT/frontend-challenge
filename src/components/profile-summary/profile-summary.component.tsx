import UserModel from "../../models/user.interface";
import { useQuery } from '@tanstack/react-query';
import { fetchLevelDetail } from "../../services/user.services";
import './profile-summary.component.css';

export default function ProfileSummary({user}: UserModel) {
    const { isError: userError, isLoading: userLoading, isSuccess: levelSuccess, data: levelData } = useQuery(["levelDetail"], () => fetchLevelDetail(user.nivel), {staleTime: 60000});


    return (
        <div className="profile-summary-card">
            <div className='left'>
                <img src={user.imagen} alt={user.nombre} />
            </div>
            <div className='right'>
                <p>{ user.nombre } { user.apellido }</p>
                <p>{levelSuccess && levelData["descripción"]}</p>
            </div>
        </div>
    )
}


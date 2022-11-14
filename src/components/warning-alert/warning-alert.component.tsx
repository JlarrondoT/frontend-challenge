import { useQuery } from "@tanstack/react-query";
import { fetchUserRestriction } from "../../services/user.services";
import UserModel from "../../models/user.interface";
import './warning-alert.component.css'

export default function WarningAlert({user}: UserModel) {
    const { isError, isLoading, isSuccess, data } = useQuery(["userRestriction"],() => fetchUserRestriction(String(user.id_usuario)), {staleTime: 60000});

    return(
        <div>
            {isSuccess && data.map((restriction: any) => {
                return (
                    <div className="alert-container">
                    ❗ {restriction.mensaje}
                    </div>
                )
            })}
        </div>
        
    )
}
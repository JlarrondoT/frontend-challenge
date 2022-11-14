import { useQuery } from '@tanstack/react-query';
import { fetchPurchases, fetchUser } from '../../services/user.services';
import './purchases.component.css'

export default function Purchases() {
    let limit = 5;
    let offset = 0;
    const { data: userData } = useQuery(["user"], fetchUser, {staleTime: 60000});
    const { isError, isLoading, isSuccess, data } = useQuery(["purchases"],() => fetchPurchases(userData.id_usuario, limit, offset), {staleTime: 60000});

    const dateFormat = (input: Date) => {
        const date = new Date(input);
        return date.toLocaleDateString("es-CL", { day: '2-digit', month: 'long'}).replace('-', ' de ');
    }

    return (
        <div className="purchases-container">
            {isSuccess && data.data.map((purchase: any) => {return (
                <div className='purchase-card'>
                    <div className='buying-date'>
                        <p>{dateFormat(purchase.fecha)}</p>
                    </div>
                    <div className='purchase-wrapper'>
                        <div className='left'>
                            <img src={purchase.imagen} alt="" />
                        </div>
                        <div className='right'>
                            <p>{purchase.titulo}</p>
                            <p>{purchase.id_compra}</p>
                            <p>{purchase.precio.total}</p>
                            <p>{purchase.precio.moneda}</p>
                            <p>{purchase.cantidad}</p>
                        </div>
                    </div>
                </div>
            )})}
        </div>
    )
}
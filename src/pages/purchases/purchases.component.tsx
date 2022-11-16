import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Purchase } from '../../models/purchase.interface';
import { fetchPurchases, fetchUser } from '../../services/user.services';
import './purchases.component.css';

export default function Purchases() {
    let limit = 5;
    let offset = 0;
    const { data: userData } = useQuery(["user"], fetchUser, {staleTime: 60000});
    const { isError, isLoading, isSuccess, data: purchasesData } = useQuery(["purchases"],() => fetchPurchases(userData.id_usuario, limit, offset), {staleTime: 60000, enabled: !!userData});

    const navigate = useNavigate();

    const dateFormat = (input: string) => {
        const date = new Date(input);
        return date.toLocaleDateString("es-CL", { day: '2-digit', month: 'long'}).replace('-', ' de ');
    }

    if (!userData) {
        return <div>..cargando</div>;
    }

    return (
        <div className="purchases-container">
            {
                isSuccess && purchasesData.data.map((purchase: Purchase) => {
                    return (
                            <div className='purchase-card'>
                                <div className='buying-date'>
                                    <p>{dateFormat(purchase.fecha)}</p>
                                </div>
                                <div className='purchase-wrapper'>
                                    <div className='left'>
                                        <img src={purchase.imagen} alt="" />
                                    </div>
                                    <div className='mid-left'>
                                        <p>{purchase.id_envio}</p>
                                        <p>{purchase.id_transaccion}</p>
                                        <p>{purchase.titulo}</p>
                                    </div>
                                    <div className='mid-right'>
                                        <p>{purchase.vendedor.nickname}</p>
                                    </div>
                                    <div className='right'>
                                        <button onClick={()=> navigate('/purchase-detail', {replace: true, state: purchase})}>Ver compra</button>
                                        <button>Volver a comprar</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}
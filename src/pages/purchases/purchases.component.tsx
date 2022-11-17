import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Purchase } from '../../models/purchase.interface';
import { fetchPurchases, fetchUser } from '../../services/user.services';
import PurchaseStatus  from '../../components/purchase-status/purchase-status.component'
import './purchases.component.css';

export default function Purchases() {
    let limit = 5;
    let offset = 0;
    const { data: userData, isSuccess: userIsSuccess } = useQuery(["user"], fetchUser, {staleTime: 60000});
    const { isError, isLoading, isSuccess: purchasesIsSuccess, data: purchasesData } = useQuery(["purchases"],() => fetchPurchases(userData.id_usuario, limit, offset), {staleTime: 60000, enabled: userIsSuccess});

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
                purchasesIsSuccess && purchasesData.data.map((purchase: Purchase) => {
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
                                        <PurchaseStatus purchase={purchase}/>
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
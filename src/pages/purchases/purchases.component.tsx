import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Purchase } from '../../models/purchase.interface';
import PurchaseStatus from '../../components/purchase-status/purchase-status.component';
import './purchases.component.css';
import Paginator from '../../components/paginator/paginator.component';
import { useState } from 'react';
import { dateFormat } from '../../utils/utils';
import Services from '../../services/user.services';

export default function Purchases() {
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const { data: userData, isSuccess: userIsSuccess } = useQuery(
    ['user'],
    Services.fetchUser,
    { staleTime: 60000 }
  );
  const {
    isError,
    isLoading,
    isSuccess: purchasesIsSuccess,
    data: purchasesData,
  } = useQuery(
    ['purchases', offset],
    () => Services.fetchPurchases(userData.id_usuario, limit, offset),
    { staleTime: 60000, enabled: userIsSuccess }
  );

  const navigate = useNavigate();

  const handleChangePaginator = (input: number) => {
    let newOffset = offset;
    if (input === 2) {
      newOffset = 5;
    } else if (input === 1) {
      newOffset = 0;
    }
    setOffset((offset) => (offset = newOffset));
  };

  return (
    <div className="purchases-container">
      <Paginator
        itemsPerPage={purchasesData?.limit}
        total={purchasesData?.total}
        stateChanger={handleChangePaginator}
      ></Paginator>
      {purchasesIsSuccess && userIsSuccess ? (
        purchasesData.data.map((purchase: Purchase, index: number) => (
          <div className="purchase-card" key={index}>
            <div className="buying-date">
              <p>{dateFormat(purchase.fecha)}</p>
            </div>
            <div className="purchase-wrapper">
              <div className="left">
                <img src={purchase.imagen} alt="" />
              </div>
              <div className="mid-left">
                <PurchaseStatus purchase={purchase} />
                <p>{purchase.titulo}</p>
              </div>
              <div className="mid-right">
                <p>{purchase.vendedor.nickname}</p>
              </div>
              <div className="right">
                <button
                  onClick={() =>
                    navigate('/purchase-detail', {
                      replace: true,
                      state: purchase,
                    })
                  }
                  data-testid="purchase-detail-navigate"
                >
                  Ver compra
                </button>
                <button>Volver a comprar</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>...cargando</div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PurchaseStatus from '../../components/purchase-status/purchase-status.component';
import { Purchase } from '../../models/purchase.interface';
import { dateFormat, currencyFormat, setQuantityText } from '../../utils/utils';
import './puchase-detail.component.css';

export default function PurchaseDetail() {
  const [purchase, setPurchase] = useState<Purchase>();
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    setPurchase(state);
  }, []);

  if (!purchase) {
    return null;
  }

  return (
    <div className="purchase-detail-container">
      <div
        className="go-back"
        onClick={() =>
          navigate('/purchases', {
            replace: true,
          })
        }
        data-testid="purchases-navigate"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
        Volver
      </div>
      <div className="purchase-header-card">
        <div className="left">
          <p>{purchase.titulo}</p>
          <p>
            {purchase.cantidad} {setQuantityText(purchase.cantidad)}
          </p>
        </div>
        <div className="right">
          <img src={purchase.imagen} alt={purchase.titulo} />
        </div>
      </div>
      <div className="purchase-detail-card">
        <div className="status">
          <PurchaseStatus purchase={purchase} />
        </div>
        <div className="detail">
          <p>
            <strong>Detalle de compra:</strong>
          </p>
          <p>Total: {currencyFormat(purchase.precio.total)}</p>
          <p>Id de compra: {purchase.id_compra}</p>
          <p>Fecha: {dateFormat(purchase.fecha, false)}</p>
        </div>
        <div className="vendor">Vendedor: {purchase.vendedor.nickname}</div>
      </div>
    </div>
  );
}

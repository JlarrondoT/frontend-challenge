import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PurchaseStatus from "../../components/purchase-status/purchase-status.component";
import { Purchase } from "../../models/purchase.interface";
import "./puchase-detail.component.css";

export default function PurchaseDetail() {
  const [purchase, setPurchase] = useState<Purchase>();
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    setPurchase(state);
  }, []);

  const setQuantityText = (quantity: number) => {
    return quantity > 1 ? "unidades" : "unidad";
  };

  const currencyFormat = (value: number) => {
    return value.toLocaleString("es-ar", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });
  };

  return purchase ? (
    <div className="purchase-detail-container">
      <div
        onClick={() =>
          navigate("/purchases", {
            replace: true,
          })
        }
      >
        Volver
      </div>
      <div className="purchase-header-card">
        <div className="left">
          <p>{purchase?.titulo}</p>
          <p>
            {purchase?.cantidad} {setQuantityText(purchase?.cantidad)}
          </p>
        </div>
        <div className="right">
          <img src={purchase.imagen} alt={purchase.titulo} />
        </div>
      </div>
      <div className="purchase-detail-card">
        <PurchaseStatus purchase={purchase} />
        <p>Detalle de compra:</p>
        <div className="total">
          <p>total: {currencyFormat(purchase.precio.total)}</p>
        </div>
      </div>
    </div>
  ) : null;
}

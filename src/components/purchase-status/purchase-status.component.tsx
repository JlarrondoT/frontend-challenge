import { useEffect, useState } from 'react';
import { Purchase } from '../../models/purchase.interface';
import Services from '../../services/user.services';
import './purchase-status.component.css';

export default function PurchaseStatus(props: { purchase: Purchase }) {
  const [payment, setPayment] = useState();
  const [shipment, setShipment] = useState();

  useEffect(() => {
    const setStatusPayment = async () => {
      setPayment(
        await Services.fetchPayment(props.purchase.id_transaccion).then(
          (resp) => {
            return resp.estado;
          }
        )
      );
    };
    const setStatusShipment = async () => {
      setShipment(
        await Services.fetchShipment(props.purchase.id_envio).then((resp) => {
          return resp.estado;
        })
      );
    };
    setStatusPayment();
    setStatusShipment();
  }, []);

  return (
    <div>
      <p data-testid="shipment-status">Envío: {shipment}</p>
      <p data-testid="payment-status">Pago: {payment}</p>
    </div>
  );
}

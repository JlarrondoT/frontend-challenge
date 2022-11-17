import { useEffect, useState } from "react";
import { Purchase } from "../../models/purchase.interface";
import { fetchPayment, fetchShipment } from "../../services/user.services";
import "./purchase-status.component.css";

export default function PurchaseStatus(props: { purchase: Purchase }) {
  const [payment, setPayment] = useState();
  const [shipment, setShipment] = useState();

  useEffect(() => {
    const setStatusPayment = async () => {
      setPayment(
        await fetchPayment(props.purchase.id_transaccion).then((resp) => {
          return resp.estado;
        })
      );
    };
    const setStatusShipment = async () => {
      setShipment(
        await fetchShipment(props.purchase.id_envio).then((resp) => {
          return resp.estado;
        })
      );
    };
    setStatusPayment();
    setStatusShipment();
  }, []);

  return (
    <div>
      <p>Envío: {shipment}</p>
      <p>Pago: {payment}</p>
    </div>
  );
}

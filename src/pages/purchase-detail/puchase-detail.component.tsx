import { useLocation } from "react-router-dom";

export default function PurchaseDetail() {

    const { state } = useLocation();
    return(
        <div>{state.titulo}</div>
    )
}
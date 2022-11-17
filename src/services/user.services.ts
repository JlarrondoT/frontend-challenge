import axios from "axios"

export const fetchUser = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/user');
    if (response) {
        return response.data;
    }
}

export const fetchUserRestriction = async (userId: string) => {
    const response = await axios.get(`http://localhost:3000/api/v1/user/${userId}/restrictions`);
    if (response) {
        return response.data;
    }
}

export const fetchLevelDetail = async (level: string) => {
    const response = await axios.get(`http://localhost:3000/api/v1/level/${level}`);
    if (response) {
        return response.data;
    }
}

export const fetchPurchases = async (user:number, limit: number, offset: number) => {
    const response = await axios.get(`http://localhost:3000/api/v1/user/${user}/purchases?limit=${limit}&offset=${offset}`);
    if (response) {
        return response.data;
    }
}

export const fetchShipment = async (shipment:number) => {
    const response = await axios.get(`http://localhost:3000/api/v1/shipment/${shipment}`);
    if (response) {
        return response.data;
    }
}
export const fetchPayment = async (payment:number) => {
    const response = await axios.get(`http://localhost:3000/api/v1/payment/${payment}`);
    if (response) {
        return response.data;
    }
}
import axios from 'axios';

const url_domain = process.env.REACT_APP_DOMAIN;

export const fetchUser = async () => {
  const response = await axios
    .get(`${url_domain}/api/v1/user`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

export const fetchUserRestriction = async (userId: string) => {
  const response = await axios
    .get(`${url_domain}/api/v1/user/${userId}/restrictions`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

export const fetchLevelDetail = async (level: string) => {
  const response = await axios
    .get(`${url_domain}/api/v1/level/${level}`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

export const fetchPurchases = async (
  user: number,
  limit: number,
  offset: number
) => {
  const response = await axios
    .get(
      `${url_domain}/api/v1/user/${user}/purchases?limit=${limit}&offset=${offset}`
    )
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

export const fetchShipment = async (shipment: number) => {
  const response = await axios
    .get(`${url_domain}/api/v1/shipment/${shipment}`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};
export const fetchPayment = async (payment: number) => {
  const response = await axios
    .get(`${url_domain}/api/v1/payment/${payment}`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

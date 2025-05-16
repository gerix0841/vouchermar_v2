import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/vouchers';

export const listVouchers = () => {
    return axios.get(REST_API_BASE_URL)
}

export const createVoucher = (voucher) => {
    return axios.post(REST_API_BASE_URL,voucher)
}

export const getVoucher = (id) => {
    return axios.get(REST_API_BASE_URL + '/' + id)
}

export const updateVoucher = (id,voucher) => {
    return axios.put(REST_API_BASE_URL + '/' + id,voucher)
}

export const deleteVoucher = (id) => {
    return axios.delete(REST_API_BASE_URL + '/' + id)
}

export function checkCodeExists(code) {
  return axios.get(REST_API_BASE_URL + `/checkCodeExists?code=${code}`);
}

export const redeemVoucher = (code) => {
    return axios.post(`${REST_API_BASE_URL}/redeem`, null, { params: { code } })
}
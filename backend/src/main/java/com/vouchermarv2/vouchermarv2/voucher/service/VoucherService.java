package com.vouchermarv2.vouchermarv2.voucher.service;

import com.vouchermarv2.vouchermarv2.voucher.model.Voucher;

import java.util.List;

public interface VoucherService {

    List<Voucher> getVouchers();
    Voucher getVoucherById(int id);
    Voucher saveVoucher(Voucher voucher);
    String deleteVoucher(int id);
    Voucher updateVoucher(int id, Voucher voucher);
    Voucher redeemVoucher(String code);
}

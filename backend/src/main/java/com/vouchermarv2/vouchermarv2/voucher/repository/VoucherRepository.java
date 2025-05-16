package com.vouchermarv2.vouchermarv2.voucher.repository;

import com.vouchermarv2.vouchermarv2.voucher.model.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoucherRepository extends JpaRepository<Voucher,Integer> {
    Optional<Voucher> findByCode(String code);
    boolean existsByCode(String code);
}

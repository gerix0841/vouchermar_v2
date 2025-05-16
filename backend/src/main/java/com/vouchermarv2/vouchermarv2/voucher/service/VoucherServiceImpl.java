package com.vouchermarv2.vouchermarv2.voucher.service;

import com.vouchermarv2.vouchermarv2.Vouchermarv2Application;
import com.vouchermarv2.vouchermarv2.voucher.model.Voucher;
import com.vouchermarv2.vouchermarv2.voucher.repository.VoucherRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VoucherServiceImpl implements VoucherService{

    @Autowired
    VoucherRepository voucherRepository;

    @Override
    public List<Voucher> getVouchers() {
        List<Voucher> vouchers = new ArrayList<Voucher>();
        voucherRepository.findAll().forEach(voucher -> {
            updateActiveStatus(voucher);
            vouchers.add(voucher);
        });
        return vouchers;
    }

    @Override
    public Voucher getVoucherById(int id) {
        Optional<Voucher> voucher = voucherRepository.findById(id);
        voucher.ifPresent(this::updateActiveStatus);
        return voucher.orElse(null);
    }

    @Override
    public Voucher saveVoucher(Voucher voucher) {
        if (voucher.getId() != null) {
            throw new IllegalArgumentException("New voucher cannot already have an ID");
        }
        updateActiveStatus(voucher);
        return voucherRepository.save(voucher);
    }

    @Override
    public String deleteVoucher(int id) {
        voucherRepository.deleteById(id);
        return "id " + id + "is deleted successfully";
    }

    @Override
    public Voucher updateVoucher(int id, Voucher voucher) {
        Optional<Voucher> voucherById = voucherRepository.findById(id);

        if(voucherById.isPresent()){
            Voucher updatedVoucher = voucherById.get();
            updatedVoucher.setCode(voucher.getCode());
            updatedVoucher.setExpiryDate(voucher.getExpiryDate());
            updatedVoucher.setMaxRedemptions(voucher.getMaxRedemptions());

            updateActiveStatus(updatedVoucher);

            return voucherRepository.save(updatedVoucher);
        }
        return null;
    }

    @Override
    public Voucher redeemVoucher(String code) {
        Voucher voucher = voucherRepository.findByCode(code).orElseThrow(() -> new EntityNotFoundException("Voucher not found"));

        if(!voucher.isActive()){
            throw new IllegalStateException("Voucher is not active");
        }
        if(voucher.getExpiryDate() != null){
            if (voucher.getExpiryDate().isBefore(Instant.now())) {
                throw new IllegalStateException("Voucher has expired");
            }
        }
        if(voucher.getCurrentRedemptions() >= voucher.getMaxRedemptions()){
            throw new IllegalStateException("Voucher limit reached");
        }

        voucher.setCurrentRedemptions(voucher.getCurrentRedemptions()+1);
        updateActiveStatus(voucher);
        return voucherRepository.save(voucher);
    }

    @Override
    public boolean codeExists(String code) {
        return voucherRepository.existsByCode(code);
    }

    @Override
    public void updateActiveStatus(Voucher voucher) {
        if(voucher.getExpiryDate() != null && voucher.getExpiryDate().isBefore(Instant.now())){
            voucher.setActive(false);
            return;
        }
        if(voucher.getCurrentRedemptions() >= voucher.getMaxRedemptions()){
            voucher.setActive(false);
            return;
        }
        voucher.setActive(true);
    }
}

package com.vouchermarv2.vouchermarv2.voucher;

import com.vouchermarv2.vouchermarv2.voucher.model.Voucher;
import com.vouchermarv2.vouchermarv2.voucher.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class VoucherController {

    @Autowired
    VoucherService voucherService;

    @GetMapping("/vouchers")
    public List<Voucher> getVouchers(){
        return voucherService.getVouchers();
    }

    @GetMapping("/vouchers/{id}")
    public Voucher getVoucherById(@PathVariable("id") int id){
        Voucher voucher = voucherService.getVoucherById(id);
        if(voucher == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return voucher;
    }

    @PostMapping("/vouchers")
    public Voucher saveVoucher(@RequestBody Voucher voucher){
        return voucherService.saveVoucher(voucher);
    }

    @DeleteMapping("/vouchers/{id}")
    public String deleteVoucher(@PathVariable("id") int id){
        return voucherService.deleteVoucher(id);
    }

    @PutMapping("/vouchers/{id}")
    public Voucher updateVoucher(@PathVariable("id") int id, @RequestBody Voucher voucher){
        return voucherService.updateVoucher(id,voucher);
    }

    @PostMapping("/vouchers/redeem")
    public ResponseEntity<Voucher> redeemVoucher(@RequestParam String code){
        Voucher redeemedVoucher = voucherService.redeemVoucher(code);
        return new ResponseEntity<>(redeemedVoucher,HttpStatus.OK);
    }
}

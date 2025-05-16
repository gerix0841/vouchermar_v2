import { useState } from "react";
import { redeemVoucher } from "../services/VoucherService";
import { useNavigate } from "react-router-dom";

export default function Redeem(){
    const [code,setCode] = useState('');
    const [message,setMessage] = useState('');
    const [error,setError] = useState('');

    function handleRedeem(e){
        e.preventDefault();
        setMessage("");
        setError("");

        redeemVoucher(code).then(r => {
            setMessage("Voucher redeemed successfully!");
        }).catch(e => {
            if(e.response && e.response.data && e.response.data.message){
                setError(e.response.data.message)
            }
            else{
                setError("Error redeeming Voucher");
            }
        });
    }
    
    return (
        <div className="container mt-4">
            <h2 className="text-center">Redeem Voucher</h2>
            <form onSubmit={handleRedeem}>
                <div className="mb-3">
                    <label  htmlFor="code" className="form-label">Voucher Code</label>
                    <input type="text" id="code" className="form-control" value={code} onChange={e => setCode(e.target.value)} placeholder="Enter Voucher Code" required/>
                </div>
                <button type="submit" className="btn btn-primary">Redeem</button>
            </form>

            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    )
}
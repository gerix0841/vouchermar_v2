import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkCodeExists, createVoucher, getVoucher, updateVoucher } from "../services/VoucherService";

export default function Voucher(){
    const [code,setCode] = useState('');
    const [maxRedemptions,setMaxRedemptions] = useState(0);
    const [expiryDate,setExpiryDate] = useState('');
    const [originalCode, setOriginalCode] = useState('');
    const [errors,setErrors] = useState({code:"",maxRedemptions:"",expiryDate:""});
    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if(id){
            getVoucher(id).then(r => {
                setCode(r.data.code);
                setOriginalCode(r.data.code)
                setMaxRedemptions(r.data.maxRedemptions);
                setExpiryDate(r.data.expiryDate ? r.data.expiryDate.split('T')[0] : '');
            }).catch(e => {
                console.error(e);
            });
        }
    },[id]);

    function pageTitle() {
        return <h2 className="text-center">{id ? "Update Voucher" : "Add Voucher"}</h2>;
    }

    function saveOrUpdateVoucher(e){
        e.preventDefault();

        if(validateForm()){
            const voucher = {code,maxRedemptions,expiryDate: expiryDate ? new Date(expiryDate).toISOString() : null};
            if(id){
                updateVoucher(id,voucher).then(r => {
                    navigator("/vouchers");
                }).catch(e => {
                    console.error(e);
                })
            }
            else{
                createVoucher(voucher).then(response => {
                    navigator("/vouchers");
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    async function validateForm(){
        let valid = true;
        const errorsCopy = {...errors}

        if(code.length != 9){
            errorsCopy.code = "Voucher code must be 9 long";
            valid = false;
        }
        else{
            errorsCopy.code = "";
            if(!id || code !== originalCode){
                try{
                    const exists = await checkCodeExists(code);
                    if(exists){
                        errorsCopy.code = "Voucher code already exists";
                        valid = false;
                    }
                }catch(err){
                    errorsCopy.code = "Error checking voucher code";
                    valid = false;
                }
            }
        }

        if(maxRedemptions <= 0){
            errorsCopy.maxRedemptions = "Maximum Redemptions must be over 0";
            valid = false;
        }
        else{
            errorsCopy.maxRedemptions = "";
        }

        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div className="container">
            <br /><br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb2">
                                <label className="form-label">Code: </label>
                                <input type="text" placeholder="Enter Voucher Code" name="code" value={code} className={`form-control ${errors.code ? 'is-invalid' : ''}`} onChange={e => setCode(e.target.value)}></input>
                                {errors.code && <div className="invalid-feedback">{errors.code}</div>}
                            </div>
                            <div className="form-group mb2">
                                <label className="form-label">Maximum Redemptions: </label>
                                <input type="number" placeholder="Enter Maximum Redemptions" name="maxRedemptions" value={maxRedemptions} className={`form-control ${errors.maxRedemptions ? 'is-invalid' : ''}`} onChange={e => setMaxRedemptions(e.target.value)}></input>
                                {errors.maxRedemptions && <div className="invalid-feedback">{errors.maxRedemptions}</div>}
                            </div>
                            <div className="form-group mb2">
                                <label className="form-label">Expiry Date: </label>
                                <input type="date" placeholder="Enter Voucher Code" name="expiryDate" value={expiryDate} className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`} onChange={e => setExpiryDate(e.target.value)}></input>
                            </div>
                            <button className="btn btn-success mt-4" onClick={saveOrUpdateVoucher}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
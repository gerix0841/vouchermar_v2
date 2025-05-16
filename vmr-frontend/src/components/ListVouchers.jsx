import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteVoucher, listVouchers } from "../services/VoucherService";

export default function ListVouchers(){
    const [vouchers,setVouchers] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllVouchers();
    },[])

    function getAllVouchers(){
        listVouchers().then(r => {
            setVouchers(r.data);
        }).catch(e => {
            console.error(e);
        });
    }

    function addNewVoucher(){
        navigator("/add-voucher")
    }

    function updateVoucher(id){
        navigator(`/edit-voucher/${id}`);
    }

    function removeVoucher(id){
        deleteVoucher(id).then(r => {
            getAllVouchers();
        }).catch(e => {
            console.error(e);
        })
    }

    return (
        <>
            <div className="container">
                <h2 className="text-center">Vouchers List</h2>
                <button className="btn btn-primary mb-2" onClick={addNewVoucher}>Add Voucher</button>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Voucher ID</th>
                            <th>Code</th>
                            <th>Max Redemptions</th>
                            <th>Current Redemptions</th>
                            <th>Expiry Date</th>
                            <th>Activity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vouchers.map(e =>
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.code}</td>
                                    <td>{e.maxRedemptions}</td>
                                    <td>{e.currentRedemptions}</td>
                                    <td>{e.expiryDate ? e.expiryDate.substring(0,10) : ""}</td>
                                    <td>{e.active ? "true" : "false"}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => updateVoucher(e.id)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => removeVoucher(e.id)}>Delete</button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
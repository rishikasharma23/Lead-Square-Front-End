import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';



const LeadDetails = () => {

    const [lead, setLead] = useState([]);
    const accessKey = 'u$r7939d0fd927f58507f51de84d650ce4e';
    const secretKey = '7a16b58bbb26529f16bfafc0aa635884cc6a585b';
    const { phoneNumber } = useParams();

    // Construct the URL with the parameters
    const apiUrl = `https://api-in21.leadsquared.com/v2/LeadManagement.svc/RetrieveLeadByPhoneNumber?accessKey=${accessKey}&secretKey=${secretKey}&phone=${phoneNumber}`;

    useEffect(() => {

        // Use fetch to make the GET request
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (Array.isArray(data)) {
                    setLead(data);
                } else {
                    setLead([data]);
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, [phoneNumber]
    );

    return (
        <div>
            <Header mainHeading="Lead Filling Form" details="Client details below:" />
            <div className="container-fluid ">
                <div className="row mx-0 px-0 mx-md-5 my-3 mb-4 d-flex justify-content-center">
                    <div className="col-7 col-md-5 col-lg-3">
                        <input className="form-control form-control-sm" type="text" placeholder={`Lead ID: ${lead[0]?.ProspectAutoId}`} aria-label="Disabled input example" style={{ textAlign: 'center', fontSize: "16px", fontWeight: "600" }} disabled />
                    </div>
                </div>
                <div className="row mx-0 px-0 mx-md-5 my-3 px-md-5 d-flex justify-content-center">
                    <div className="col-5 col-md-3 col-lg-2">
                        <label className="form-label">Client's Name</label>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <input className="form-control form-control-sm" type="text" placeholder={`${lead[0]?.FirstName || ''} ${lead[0]?.LastName || ''}`} aria-label="Disabled input example" disabled />
                    </div>
                </div>
                <div className="row mx-0 px-0 mx-md-5 px-md-5 d-flex justify-content-center">
                    <div className="col-5 col-md-3 col-lg-2">
                        <label className="form-label">Client's Contact</label>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <input className="form-control form-control-sm" type="text" placeholder={`${lead[0]?.Phone || ''}`} aria-label="Disabled input example" disabled />
                    </div>
                </div>
                <div className="row mx-0 px-0 mx-md-5 px-md-5 my-3 d-flex justify-content-center">
                    <div className="col-5 col-md-3 col-lg-2">
                        <label className="form-label">Gender</label>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <input className="form-control form-control-sm" type="text" placeholder={`${lead[0]?.mx_Gender || ''}`} aria-label="Disabled input example" disabled />
                    </div>
                </div>
                <div className="row mx-0 px-0 mx-md-5 px-md-5 my-3 d-flex justify-content-center">
                    <div className="col-5 col-md-3 col-lg-2">
                        <label className="form-label">Date of Birth</label>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <input className="form-control form-control-sm" type="text" placeholder={`${lead[0]?.mx_Date_of_Birth ? lead[0].mx_Date_of_Birth.split(" ")[0] : 'Undefined'}`} aria-label="Disabled input example" disabled />
                    </div>
                </div>
                <div className="row mx-0 px-0 mx-md-5 px-md-5 my-3 d-flex justify-content-center" >
                    <div className="col-5 col-md-3 col-lg-2">
                        <label className="form-label">Marital Status</label>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <input className="form-control form-control-sm" type="text" placeholder={`${lead[0]?.mx_Marital_Status || ''}`} aria-label="Disabled input example" disabled />
                    </div>
                </div>
                <div className="row mx-0 px-0 mx-md-5 px-md-5 my-3 d-flex justify-content-center">
                    <div className="col-5 col-md-3 col-lg-2">
                        <label className="form-label">Occupation</label>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <input className="form-control form-control-sm" type="text" placeholder={`${lead[0]?.mx_Occupation || ''}`} aria-label="Disabled input example" disabled />
                    </div>
                </div>
                <div className="row mx-0 px-0 mx-md-5 px-md-5 my-3 d-flex justify-content-center">
                    <div className="col-5 col-md-3 col-lg-2">
                        <label className="form-label">Status</label>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <input className="form-control form-control-sm" type="text" placeholder={lead[0]?.mx_Disposition ? lead[0].mx_Disposition : 'Fresh Lead'} aria-label="Disabled input example" disabled />
                    </div>
                </div>
                <div className="row mx-0 px-0 mx-md-5 px-md-5 my-3 d-flex justify-content-center">
                    <div className="col-5 col-md-3 col-lg-2">
                        <label className="form-label">Product</label>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <input className="form-control form-control-sm" type="text" placeholder={`${lead[0]?.mx_Policy_Name || ''}`} aria-label="Disabled input example" disabled />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LeadDetails;

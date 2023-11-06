import { useState } from 'react';
import { Link } from 'react-router-dom';

const RowComponent = ({ item }) => {
    const [status, setStatus] = useState(item.mx_Disposition);
    const [temp, setTemp] = useState("");

    const handleChangeStatus = async (leadId, value) => {
        const accessKey = 'u$r7939d0fd927f58507f51de84d650ce4e';
        const secretKey = '7a16b58bbb26529f16bfafc0aa635884cc6a585b';

        const url = `https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Update?accessKey=${accessKey}&secretKey=${secretKey}&leadId=${leadId}`;

        const data = [
            {
                "Attribute": "mx_Disposition",
                "Value": value
            }
        ]

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                setStatus(value);
                console.log('Response:', responseData);
            } else {
                console.log('Failed to update lead:', response.status, response.statusText);
            }

        } catch (error) {
            console.log('Error:', error);
        }

    };

    const statusArray = [
        'Application Logged In',
        'Appointment Fixed',
        'Call Back',
        'Generate Document',
        'Generate Lead ID',
        'Met Follow Up',
        'Met Not Interested',
        'Non-Contactable',
        'Non-Serviceable',
        'Not Eligible',
        'Not Met Not Interested',
        'Pass to DM',
        'Ringing/Busy Tone',
        'Wrong/Incorrect Number'
    ];

    return (
        <div className="col-12 col-md-6 col-lg-4 px-3 py-2">
            <div className="card">
                <div className="card-header d-flex ps-2 pe-2" style={{ backgroundColor: "#F6F6F6" }}>
                    <p className='fw-bold mb-0 me-2'>Lead ID:</p>
                    <p className="mb-0 ">{item.ProspectAutoId}</p>
                    <div className='ms-auto'>
                        <Link to={`/${item.Phone}${window.location.search}`}>
                            <button type="button" className="btn btn-light text-decoration-underline" >Show Details</button>
                        </Link>
                    </div>
                </div>
                <div className="card-body ps-2 pe-2">
                    <div className="d-flex">
                        <p className='fw-bold me-2 mb-0'>Name:</p>
                        <p className='mb-0'>{item.FirstName} {item.LastName}</p>
                    </div>
                    <div className="d-flex">
                        <p className='fw-bold me-2 mb-0'>Contact:</p>
                        <p className='mb-0'>{item.Phone}</p>
                    </div>
                    <div className='d-flex'>
                        <p className='fw-bold me-2 mb-0'>Status:</p>
                        <p>{status || "Fresh Lead"}</p>
                        <div className='ms-auto'>
                            <button type="button" className="btn btn-light text-decoration-underline" data-bs-toggle="modal" data-bs-target={`#exampleModal-${item.ProspectID}`}>
                                Edit Status
                            </button>
                        </div>

                        <div className="modal fade" id={`exampleModal-${item.ProspectID}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <p style={{fontSize: "15px", fontWeight: "600"} }className="modal-title" id="exampleModalLabel">Select Status for {item.FirstName} {item.LastName}</p>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="list-group" id="list-tab" role="tablist">
                                                    {statusArray.map((item1, index) => (
                                                        <a className="list-group-item list-group-item-action small" key={index} id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home" onClick={(e) => { e.preventDefault(); setTemp(e.target.innerText); }}>{item1}</a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: '#ADADAD', border: "none" }}>Close</button>
                                        <button type="button" className="btn btn-sm btn-primary" data-bs-dismiss="modal" onClick={(e) => { e.preventDefault(); handleChangeStatus(item.ProspectID, temp); }} style={{ backgroundColor: "#dc3545", border: "none" }}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RowComponent;
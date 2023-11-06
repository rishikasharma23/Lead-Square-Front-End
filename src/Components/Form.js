import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import Header from './Header';

const Form = () => {
    const [title, setTitle] = useState("Title");
    const [gender, setGender] = useState("Gender");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [occupation, setOccupation] = useState("");
    const [product, setProduct] = useState("");

    let navigate = useNavigate();

    const location = useLocation();

    const handleSubmit = (event) => {
        const queryString = JSON.parse(atob(window.location.search.split("?")[1]));
        console.log(queryString);
        console.log(occupation);
       
        const ownerId=queryString.ownerId;
        const remarks=queryString.remarks;
        event.preventDefault();

        const accessKey = 'u$r7939d0fd927f58507f51de84d650ce4e';
        const secretKey = '7a16b58bbb26529f16bfafc0aa635884cc6a585b';

        if (gender === "Gender") {
            alert("Please select a gender");
            return;
        }

        const bodyData = [
            {
                "Attribute": "Phone",
                "Value": phoneNumber
            },
            {
                "Attribute": "FirstName",
                "Value": firstName
            },
            {
                "Attribute": "LastName",
                "Value": lastName
            },
            {
                "Attribute": "mx_Gender",
                "Value": gender
            },
            {
                "Attribute": "mx_Date_of_Birth",
                "Value": dob
            },
            {
                "Attribute": "mx_Marital_Status",
                "Value": maritalStatus
            },
            {
                "Attribute": "mx_Occupation",
                "Value": occupation
            },
            {
                "Attribute": "mx_Policy_Name",
                "Value": product
            },
            {
                "Attribute": "OwnerId",
                "Value":ownerId
            },
            {
                "Attribute": "mx_Remarks",
                "Value": remarks
            }
        ];

        const apiUrl = `https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Create?accessKey=${accessKey}&secretKey=${secretKey}`; // replace with your endpoint

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        };


        fetch(apiUrl, options)
            .then(response => {
                debugger;
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.Status === "Success") {
                    console.log("Hello")
                    alert("Your form has been successfully submitted")
                    navigate(`/leads${window.location.search}`);
                }
            })
            .catch(error => {
                alert("Phone Number Already exists, please fill with a new number")
                console.error('Error:', error);
            });

    };

    useEffect(() => {
        if (dob) {
            const dobDate = new Date(dob);
            const today = new Date();
            const age = today.getFullYear() - dobDate.getFullYear();
            setAge(age);
        } else {
            setAge("");
        }
    }, [dob]);

    const handleChangeTitle = (value) => {
        setTitle(value);
    }

    const handleChangeGender = (value) => {
        setGender(value);
    }

    const today = new Date();

    const maxDate = today.toISOString().split("T")[0];

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 80);

    const minDateStr = minDate.toISOString().split("T")[0];
    const occupations = ["Business Owner", "Service", "Professional", "Retired", "Student", "House Wife", "Agriculture", "Driver", "Armed Forces", "Army/Navy/Police", "Skilled Worker", "Jeweler", "Scrap Dealer", "Doctor", "Lawyer", "Architect", "Others"]

    const validDatalist = (e, arr) => {
        console.log(e.target.value)
        console.log(arr)
        console.log(arr.indexOf(e.target.value))
        return arr.indexOf(e.target.value) >= 0 ? true : false
    }

    return (
        <div>
            <Header mainHeading="Lead Filling Form" details="Enter the client details below:" />
            <form onSubmit={handleSubmit}>
                <div className="container-fluid">
                    <div className="row justify-content-center justify-content-md-start d-flex mx-0 mx-md-5 ps-md-5 pt-md-3 pb-md-3 ">
                        <div className="col-5 col-md-3 col-lg-2">
                            <label htmlFor="phoneNumber" className="form-label">Client's Contact <span style={{ color: 'red', opacity: '1' }}>*</span></label>
                        </div>
                        <div className="col-7 col-md-3">
                            <input type="tel" className="form-control form-control-sm" id="phoneNumber" placeholder="Mobile No." maxLength="10" pattern="^\d{10}$"
                                onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')} onChange={e => setPhoneNumber(e.target.value)}
                                style={{ backgroundColor: '#F8F8F8' }} required />
                        </div>
                    </div>
                    <div className="row d-flex mx-0 mx-md-5 ps-md-5 pb-md-2 ">
                        <p>Client Details-</p>
                    </div>
                    <div className="row d-flex mb-3 mx-0 mx-md-5 ps-md-5 pb-md-2">
                        <div className="col-3 col-md-2 col-lg-1">
                            <label htmlFor="title" className="form-label">Title</label>
                            <div className="dropdown" id="title">
                                <button className="btn btn-secondary btn-danger btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {title}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={(e) => { e.preventDefault(); handleChangeTitle('Master'); }}>Master</a></li>
                                    <li><a className="dropdown-item" onClick={(e) => { e.preventDefault(); handleChangeTitle('Mr.'); }}>Mr.</a></li>
                                    <li><a className="dropdown-item" onClick={(e) => { e.preventDefault(); handleChangeTitle('Mrs'); }}>Mrs.</a></li>
                                    <li><a className="dropdown-item" onClick={(e) => { e.preventDefault(); handleChangeTitle('Ms.'); }}>Ms.</a></li>
                                    <li><a className="dropdown-item" onClick={(e) => { e.preventDefault(); handleChangeTitle('Dr.'); }}>Dr.</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="offset-1 col-8 offset-md-1 col-md-4 offset-lg-0">
                            <label htmlFor="firstName" className="form-label">First Name <span style={{ color: 'red', opacity: '1' }}>*</span></label>
                            <input type="text" className="form-control form-control-sm" id="firstName"
                                onInput={e => e.target.value = e.target.value.replace(/[^A-Za-z]/g, '')} onChange={e => setFirstName(e.target.value)}
                                style={{ backgroundColor: '#F8F8F8' }} required />
                        </div>
                        <div className="offset-4 col-8 offset-md-0 col-md-4">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control form-control-sm" id="lastName"
                                onInput={e => e.target.value = e.target.value.replace(/[^A-Za-z]/g, '')} onChange={e => setLastName(e.target.value)}
                                style={{ backgroundColor: '#F8F8F8' }} />
                        </div>
                    </div>
                    <div className="row d-flex mx-0 mx-md-5 ps-md-5 pb-md-2">
                        <div className="col-3 col-md-2 col-lg-1">
                            <label htmlFor="gender" className="form-label">Gender <span style={{ color: 'red', opacity: '1' }}>*</span></label>
                            <div className="dropdown" id="gender">
                                <button className="btn btn-secondary btn-danger btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {gender}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={(e) => { e.preventDefault(); handleChangeGender('Male'); }}>Male</a></li>
                                    <li><a className="dropdown-item" onClick={(e) => { e.preventDefault(); handleChangeGender('Female'); }}>Female</a></li>
                                    <li><a className="dropdown-item" onClick={(e) => { e.preventDefault(); handleChangeGender('Others'); }}>Others</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="offset-1 col-5 offset-md-1 col-md-3 offset-lg-0">
                            <label htmlFor="dob" className="form-label">Date of Birth <span style={{ color: 'red', opacity: '1' }}>*</span></label>
                            <input
                                type="date"
                                className="form-control form-control-sm"
                                id="dob"
                                value={dob}
                                max={maxDate}
                                min={minDateStr}
                                onChange={(e) => setDob(e.target.value)}
                                style={{ backgroundColor: '#F8F8F8' }}
                                onKeyDown={(e) => e.preventDefault()}
                                required
                            />
                        </div>
                        <div className="col-3 col-md-2">
                            <label htmlFor="age" className="form-label">Age <span style={{ color: 'red', opacity: '1' }}>*</span></label>
                            <input type="number" className="form-control form-control-sm" id="age" value={age} style={{ backgroundColor: '#F8F8F8' }} readOnly />
                        </div>

                    </div>
                    <div className="row d-flex pt-2 mx-0 mx-md-5 ps-md-5 pb-md-2">
                        <div className="col-9 col-md-4 col-lg-4">
                            <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
                        </div>
                    </div>
                    <div className="row d-flex mx-0 mx-md-5 ps-md-5 pb-md-2 ">
                        <div className="col-4 d-flex col-9 col-md-4 col-lg-4">
                            <select
                                className="form-select form-select-sm"
                                aria-label="Small select example"
                                value={maritalStatus}
                                onChange={e => setMaritalStatus(e.target.value)}
                                style={{ backgroundColor: '#F8F8F8' }}
                            >
                                <option value="">Select</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Family">Family</option>
                                <option value="Married">Married</option>
                                <option value="Single">Single</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                    </div>
                    <div className="row d-flex pt-2 mx-0 mx-md-5 ps-md-5 pb-md-2">
                        <div className="col-9 col-md-4 col-lg-4">
                            <label htmlFor="occupation" className="form-label">Occupation</label>
                        </div>
                    </div>
                    <div className="row d-flex mx-0 mx-md-5 ps-md-5 pb-md-2">
                        <div className="col-9 col-md-4 col-lg-4 d-flex">
                            <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." onChange={e => (validDatalist(e, occupations) ? ( setOccupation(e.target.value)) : e.target.setCustomValidity("Value not from list"))}
                                style={{ backgroundColor: '#F8F8F8' }} />
                            <datalist id="datalistOptions">
                                <option value="">Select</option>
                                {occupations.map((k, i) => { return (<option key={i} value={k}>{k}</option>) })}
                            </datalist>
                        </div>
                    </div>
                    <div className="row d-flex pt-2 mx-0 mx-md-5 ps-md-5 pb-md-2">
                        <div className="col-9 col-md-4 col-lg-4">
                            <label htmlFor="product" className="form-label">Product <span style={{ color: 'red', opacity: '1' }}>*</span></label>
                        </div>
                    </div>
                    <div className="row d-flex mx-0 mx-md-5 ps-md-5 pb-md-2">
                        <div className="col-9 col-md-4 col-lg-4 d-flex">
                            <select
                                className="form-select form-select-sm"
                                aria-label="Small select example"
                                value={product}
                                onChange={e => setProduct(e.target.value)}
                                style={{ backgroundColor: '#F8F8F8' }}
                                required
                            >
                                <option value="">Select</option>
                                <option value="ABSLI Fortune Elite Plan">ABSLI Fortune Elite Plan</option>
                                <option value="ABSLI Vision Life Income Plan">ABSLI Vision Life Income Plan</option>
                                <option value="ABSLI Wealth Aspire Plan">ABSLI Wealth Aspire Plan</option>
                                <option value="ABSLI Wealth Secure Plan">ABSLI Wealth Secure Plan</option>
                                <option value="ABSLI Akshaya Plan">ABSLI Akshaya Plan</option>
                                <option value="ABSLI Assured Income Plus">ABSLI Assured Income Plus</option>
                                <option value="ABSLI Assured Savings Plan">ABSLI Assured Savings Plan</option>
                                <option value="ABSLI Digi Shield Plan">ABSLI Digi Shield Plan</option>
                                <option value="ABSLI Fixed Maturity Plan">ABSLI Fixed Maturity Plan</option>
                                <option value="ABSLI Guaranteed Milestone Planned">ABSLI Guaranteed Milestone Planned</option>
                                <option value="ABSLI Nischint Aayush Plan">ABSLI Nischint Aayush Plan</option>
                                <option value="ABSLI Nischint Laabh Plan">ABSLI Nischint Laabh Plan</option>
                                <option value="ABSLI Nischint Pension Plan">ABSLI Nischint Pension Plan</option>
                                <option value="ABSLI Poorna Suraksha Kawach">ABSLI Poorna Suraksha Kawach</option>
                                <option value="ABSLI Anmol Suraksha Kawach">ABSLI Anmol Suraksha Kawach</option>
                                <option value="ABSLI Vision Endowment Plus">ABSLI Vision Endowment Plus</option>
                                <option value="ABSLI Cancer Shield Plan">ABSLI Cancer Shield Plan</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="row d-flex pt-2 mx-0 mx-md-5 ps-md-5 pb-md-2">
                        <div className="d-grid col-5 col-md-1 col-lg-1 mt-2 mb-4">
                            <button type="submit" className="btn btn-danger ">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;
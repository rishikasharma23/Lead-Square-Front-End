import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import RowComponent from './RowComp';
import CryptoJS from 'crypto-js';

const LeadBoard = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [actualPage, setActualPage] = useState(1);
    const [isEndOfData, setIsEndOfData] = useState(false);
    const [name, setName] = useState([]);
    const itemsPerPage = 12;
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    const host=process.env.REACT_APP_API_HOST;

    const generateClientHmacSignature = (data, secretKey) => {
        const dataString = JSON.stringify(data);
        return CryptoJS.HmacSHA256(dataString, secretKey).toString();
    };

    useEffect(() => {
        const queryString = JSON.parse(atob(window.location.search.split("?")[1]));
        const name = queryString.name;
        setName(name);
        const remarks = queryString.remarks;
        const requestBody = { remarks, currentPage };
        const signature = generateClientHmacSignature(requestBody, secretKey);

        fetch(`${host}/api/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Signature': signature
            },
            body: JSON.stringify({ remarks, currentPage })
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(({ data, signature }) => {

                const generatedSignature = generateClientHmacSignature(data, secretKey);
                if (generatedSignature === signature) {
                    if (data.length > 0) {
                        setActualPage(currentPage);
                    }
                    if (data.length < itemsPerPage) {
                        setIsEndOfData(true);
                    } else {
                        setIsEndOfData(false);
                    }
                    setData(data);
                } else {
                    console.error('Invalid HMAC Signature');
                }

            })
            .catch(error => {
                console.log('There was a problem with the fetch operation:', error.message);
            });
    }, [currentPage,host, secretKey]);

    const handleClick = (pageNum) => {
        if (!(pageNum > currentPage && isEndOfData)) {
            setCurrentPage(pageNum);
        }
    };

    return (
        <div className="container-fluid " >
            <div className='row'>
                <div className='col-12' style={{ padding: "0" }}>
                    <Header mainHeading="Lead Management" details={`Hi ${name}! Your Leads:`} />
                </div>
            </div>
            <div className="row mt-3">

                <Link to={`/form${window.location.search}`} style={{ color: 'white', textDecoration: 'none' }}>
                    <div className="d-grid gap-2 col-6 col-md-3 mx-auto">
                        <button className="btn btn-danger" type="button">Enter New Lead</button>
                    </div>
                </Link>

            </div>
            {
                isEndOfData && <p>No more data available :(</p>
            }
            <div className="row mt-2">
                {data.map((item, index) => (
                    <RowComponent key={index} item={item} />
                ))}
            </div>
            <div className="row m-4 ">
                <nav aria-label="Page navigation" className="d-flex justify-content-center" style={{ color: 'red' }}>
                    <ul className="pagination">
                        <li className={`list-unstyled page-item ${actualPage === 1 && "disabled"}`}>
                            <span className="page-link" style={{ backgroundColor:actualPage === 1 ? '#ECECEC' : '#dc3545', color: actualPage === 1 ? 'black' : 'white', cursor: 'pointer' }} onClick={() => handleClick(actualPage - 1)}>Prev</span>
                        </li>
                        <li className="page-number list-unstyled">
                            <span className="page-link" style={{ color: '#dc3545' }}>{actualPage}</span>
                        </li>
                        <li className={`page-item list-unstyled ${isEndOfData && "disabled"}`}>
                            <span className="page-link" style={{ backgroundColor: isEndOfData ===true ? '#ECECEC': '#dc3545' , color: isEndOfData ===true ? 'black': 'white', cursor: 'pointer' }} onClick={() => handleClick(actualPage + 1)}>Next</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default LeadBoard;
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import Header from './Header';
import RowComponent from './RowComp';


const LeadBoard = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [actualPage, setActualPage] = useState(1);
    const [isEndOfData, setIsEndOfData] = useState(false);
    const [name,setName]= useState([]);
    const itemsPerPage = 12;

    useEffect(() => {

        const queryString = JSON.parse(atob(window.location.search.split("?")[1]));
        console.log(queryString);
        const name=queryString.name;
        setName(name);
        const remarks=queryString.remarks;
        console.log(name);
        console.log(remarks);
        
        const baseURL = "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Leads.Get";
        const params = new URLSearchParams({
            accessKey: "u$r7939d0fd927f58507f51de84d650ce4e",
            secretKey: "7a16b58bbb26529f16bfafc0aa635884cc6a585b"
        });

        const fullURL = `${baseURL}?${params.toString()}`;

        const payload = {
            Parameter: 
                {
                    LookupName: "mx_Remarks",
                    LookupValue: remarks,
                    SqlOperator: "="
                },
            
            "Paging": {
                "PageIndex": currentPage,
                "PageSize": itemsPerPage
            }
        };
        fetch(fullURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data1 => {
                if (data1.length > 0) {
                    setActualPage(currentPage);
                }
                if (data1.length < itemsPerPage) {
                    setIsEndOfData(true);
                } else {
                    setIsEndOfData(false);
                }
                setData(data1); // Removed the slicing logic.
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation:', error.message);
            });
    }, [currentPage]);

    const handleClick = (pageNum) => {
        if (!(pageNum > currentPage && isEndOfData)) {
            setCurrentPage(pageNum);
        }
    };

    return (
        <div className="container-fluid " >
            <div className='row'>
                <div className='col-12' style={{ padding: "0" }}>
                    <Header mainHeading="Lead Management" details={`Hi ${name}! Your Leads:`}  />
                </div>
            </div>
            <div className="row mt-3">

                <Link to={`/form${window.location.search}`} style={{ color: 'white', textDecoration: 'none' }}>
                    <div className="d-grid gap-2 col-6 col-md-3 mx-auto">
                        <button className="btn btn-danger" type="button">Enter New Lead</button>
                    </div>
                </Link>

            </div>
            <div className="row mt-2">
                {data.map((item, index) => (
                    // import component
                    <RowComponent key={index} item={item} />
                ))}
            </div>
            <div className="row m-4 ">
                <nav aria-label="Page navigation" className="d-flex justify-content-center" style={{ color: 'red' }}>
                    <ul className="pagination">
                        <li className={`page-item ${actualPage === 1 && "disabled"}`}>
                            <span className="page-link" style={{ backgroundColor: '#dc3545', color: 'white', cursor: 'pointer' }} onClick={() => handleClick(actualPage - 1)}>Prev</span>
                        </li>
                        <li className="page-item">
                            <span className="page-link" style={{ color: '#dc3545' }}>{actualPage}</span>
                        </li>
                        <li className={`page-item ${isEndOfData && "disabled"}`}>
                            <span className="page-link" style={{ backgroundColor: '#dc3545', color: 'white', cursor: 'pointer' }} onClick={() => handleClick(actualPage + 1)}>Next</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        // </div>
    );
};

export default LeadBoard;
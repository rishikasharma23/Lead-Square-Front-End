import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from "./Components/Form";
import LeadBoard from "./Components/LeadBoard";
import LeadDetails from "./Components/LeadDetails";

// btoa(JSON.stringify(myObject))

// const a={name: 'rishika', email: 'kunal.talakokula-v@adityabirlacapital.com', ownerId: '416d2507-170c-11ed-9700-02e42c58c0d4'}

// btoa(JSON.stringify(a))

// 'leads?eyJuYW1lIjoiS3VuYWwiLCJlbWFpbCI6Imt1bmFsLnRhbGFrb2t1bGEtdkBhZGl0eWFiaXJsYWNhcGl0YWwuY29tIiwib3duZXJJZCI6IjQxNmQyNTA3LTE3MGMtMTFlZC05NzAwLTAyZTQyYzU4YzBkNCJ9'

const App = () => {  
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/leads" element={<LeadBoard />} />
        <Route path="/form" element={<Form/>} />
        <Route path="/:phoneNumber" element={<LeadDetails/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;


//const a={name: 'Beta', email: 'tarun.kant@adityabirlacapital.com', ownerId: 'c9628524-4cb7-11ee-8292-02e42c58c0d4', remarks:'beta@adityabirlacapital.com'}

//btoa(JSON.stringify(a))

//eyJuYW1lIjoiQmV0YSIsImVtYWlsIjoidGFydW4ua2FudEBhZGl0eWFiaXJsYWNhcGl0YWwuY29tIiwib3duZXJJZCI6ImM5NjI4NTI0LTRjYjctMTFlZS04MjkyLTAyZTQyYzU4YzBkNCIsInJlbWFya3MiOiJiZXRhQGFkaXR5YWJpcmxhY2FwaXRhbC5jb20ifQ==

//"OwnerId": "c9628524-4cb7-11ee-8292-02e42c58c0d4",

//http://localhost:3001/leads?eyJuYW1lIjoiQmV0YSIsImVtYWlsIjoidGFydW4ua2FudEBhZGl0eWFiaXJsYWNhcGl0YWwuY29tIiwib3duZXJJZCI6ImM5NjI4NTI0LTRjYjctMTFlZS04MjkyLTAyZTQyYzU4YzBkNCIsInJlbWFya3MiOiJiZXRhQGFkaXR5YWJpcmxhY2FwaXRhbC5jb20ifQ==
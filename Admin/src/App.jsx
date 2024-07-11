import React, { useState } from 'react'
import axios from 'axios'
import './index.css'
function App() {

  const [x, setx] = useState("")
  let array = [];
  let last = x.length - 1;

  axios.get('http://localhost:3000/prowork/Founder')
  .then(function(response){
    setx(response.data);
  })
  
  for( let i = 0; i<=last; i++){
    let j = i+1;
    array.push(`\n` + j + ` Number = ` + x[i].paymentData);
  }

  return (
    <div className='Admin'>
      <h1 className='Admin-Heading'>Welcome AJ</h1>
      <div className="dataDiv">
        <div className="coloumDiv">{array}</div>
      </div>
    </div>
  )
}

export default App
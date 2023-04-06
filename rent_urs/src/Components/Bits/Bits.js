import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Bits() {
  // const [bidsAcquired, setBidsAcquired] = useState([]);
  // const [aprovedProductDetails, setAprovedProductDetails] = useState([]);

  // const userID = localStorage.getItem('userId');

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/sv/user/userDetails/${userID}`)
  //     .then((response) => {
  //       setBidsAcquired(response.data.userDetails.approved);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // useEffect(() => {
  //   const promises = bidsAcquired.map((productID) => {
  //     return axios
  //       .get(`http://localhost:8000/api/sv/admin/${productID}`)
  //       .then((response) => {
  //         return response.data;
  //       })
  //       .catch((error) => console.log(error));
  //   });

  //   Promise.all(promises).then((results) => {
  //     setAprovedProductDetails(results);
  //     console.log(aprovedProductDetails)
  //   });
  // }, [bidsAcquired]);

  return (
    <div>
      hit
      {/* {aprovedProductDetails.map((items) => (
        <div>
          <img src={items.productImageUrl} style={{height:"200px",width:'200px'}}/>
          <p>name:{items.productName}</p>
          <p>price:{items.productPrice}</p>
          <p>available days:{items.productAvailableDays}</p>
        </div>
      ))} */}
    </div>
  );
}

export default Bits;

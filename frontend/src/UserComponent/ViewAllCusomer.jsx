import { useState, useEffect } from "react";
import axios from "axios";

const ViewAllCustomer = () => {
  const [allCustomer, setAllCustomer] = useState([]);

  useEffect(() => {
    const getAllCustomer = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user/customer/all");
        setAllCustomer(response.data.users || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    getAllCustomer();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#d4edda", width: "100vw", padding: "40px", marginTop: "-50px" }}>
      <div className="container" style={{ maxWidth: "90%" }}>
        <div className="card p-5 shadow-lg" style={{ backgroundColor: "#ffffff", borderRadius: "15px" }}>
          <div className="card-header text-center" style={{ backgroundColor: "#28a745", color: "white", borderRadius: "15px 15px 0 0" }}>
            <h2 style={{ fontSize: "28px" }}>All Customers</h2>
          </div>
          <div className="card-body" style={{ overflowY: "auto", maxHeight: "700px" }}>
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead className="table-bordered bg-success text-white" style={{ fontSize: "18px" }}>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Id</th>
                    <th>Phone No</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {allCustomer.map((customer) => (
                    <tr key={customer.emailId} style={{ fontSize: "16px" }}>
                      <td><b>{customer.firstName}</b></td>
                      <td><b>{customer.lastName}</b></td>
                      <td><b>{customer.emailId}</b></td>
                      <td><b>{customer.contact}</b></td>
                      <td><b>{`${customer.street} ${customer.city} ${customer.pincode}`}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllCustomer;

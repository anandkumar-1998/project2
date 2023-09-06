"use client";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "./firebaseConfig";
import Datatable from "@/components/Datatable";
const GetForm = () => {
  let count = 0;
  let [upDoc, setUpDoc] = React.useState("")
  let collectionDb = collection(db, "data");
  const [data, setData] = React.useState([]);
  const [edata, setEdata] = React.useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
  });
  let dataRef = React.useRef(null);
  let refClose = React.useRef(null);

  const getData = async () => {
    try {
      let data = await getDocs(collectionDb);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(filterData);
    } catch (error) {
      console.log(error.message);
    }
  };

  let updateData = async (current) => {
    dataRef.current.click();
    console.log(current);
    setUpDoc(doc(db, "data", current.id))
    setEdata(current);
  };

  let handleClick = async () => {
    await updateDoc(upDoc, edata)
    await getData()
    refClose.current.click();
  };
  let handleChange = (e) => {
    // console.log({ ...edata, [e.target.name]: e.target.value });
    setEdata({ ...edata, [e.target.name]: e.target.value });
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">Modify</th>
          </tr>
        </thead>
        <tbody>
          {data !== [] ? (
            data.map((val) => {
              return (
                <Datatable
                  key={val.id}
                  val={val}
                  updateData={updateData}
                  count={++count}
                />
              );
            })
          ) : (
            <tr scope="row">
              <th>1</th>
              <td>Na</td>
              <td>Na</td>
              <td>Na</td>
              <td>Na</td>
              <td>Na</td>
              <td>Na</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="Modal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={dataRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Data
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={edata.name}
                  name="name"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e)=>{handleChange(e)}}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={edata.email}
                  name="email"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e)=>{handleChange(e)}}
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={edata.password}
                  name="password"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e)=>{handleChange(e)}}
                />
                <label htmlFor="floatingInput">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={edata.city}
                  name="city"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e)=>{handleChange(e)}}
                />

                <label htmlFor="floatingInput">City</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={edata.address}
                  name="address"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e)=>{handleChange(e)}}
                />
                <label htmlFor="floatingInput">Address</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={()=>{handleClick()}}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetForm;

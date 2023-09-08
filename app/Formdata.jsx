"use client";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { db, storage } from "./firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
const Formdata = () => {
  let collectionDb = collection(db, "data");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
  });
  const [image, setImage] = React.useState(null);
  let handleChange = (e) => {
    // console.log({ ...data, [e.target.name]: e.target.value });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let handleClick = async () => {
    console.log(data);
    await addDoc(collectionDb, data);

    setData({
      name: "",
      email: "",
      password: "",
      address: "",
      city: "",
    });
  };

  let uploadImage = async () => {
    console.log(image);
    if (image == null) return;
    const imgRef = ref(storage, `images/${image?.name}`);

    let upload = await uploadBytes(imgRef, image);
    if (upload) {
      console.log("Image is uploaded");
    } else {
      console.log("Image is not uploaded");
    }
  };
  return (
    <div className="border border-2 p-2 my-2">
      <form
        className="row g-3"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="inputEmail4"
            value={data.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="inputEmail4"
            value={data.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="inputPassword4"
            value={data.password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            name="address"
            value={data.address}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            name="city"
            value={data.city}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="col-12 text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              handleClick();
            }}
          >
            Add
          </button>
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="inputGroupFile01">
            Upload
          </label>
          <input
            type="file"
            value={image}
            className="form-control"
            id="inputGroupFile01"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="col-12 text-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              uploadImage();
              setImage(null)
            }}
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formdata;

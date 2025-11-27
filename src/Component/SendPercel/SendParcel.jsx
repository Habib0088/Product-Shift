import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAuth from "../../hook/useAuth";

import axios from "axios";
const SendParcel = () => {
  const navigate =useNavigate()
  // const {user}=useAuth
  const {user}=useAuth()
  const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
 
});
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();

  const regionData = useLoaderData();
  const duplicateRegion = regionData.map((r) => r.region);

  const uniqueRegion = [...new Set(duplicateRegion)];
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const districtByRegion = (region) => {
    const regionDistrict = regionData.filter((r) => r.region === region);
    const districts = regionDistrict.map((rd) => rd.district);
    return districts;
  };

  const handleFormData = (data) => {
    data.paymentStatus="unpaid"
    console.log(data);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    //   console.log(sameDistrict);
    const document = data.parcelType === "document";
    const weight = parseFloat(data.ParcelWeight);

    let cost = 0;
    if (document) {
      if (isSameDistrict) {
        cost = 60;
      } else {
        {
          cost = 80;
        }
      }
    } else {
      if (weight <= 3) {
        if (isSameDistrict) {
          cost = 110;
        } else {
          cost = 150;
        }
      } else {
        if (isSameDistrict) {
          cost = 110 + (weight - 3) * 40;
        } else {
          cost = 150 + (weight - 3) * 40 + 40;
        }
      }
    }
    data.cost=cost;
    // Sweet start
    Swal.fire({
      title: "Are you sure?",
      text: `Your parcel cost is ${cost} $`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I Agree",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.post('/parcels', { ...data})
        .then(response => {
          if(response.data.insertedId){
            navigate('/dashboard/myParcel')
          }
          console.log(response.data)})
        .catch(error => {
          console.error('There was an error!', error);
        });

        Swal.fire({
          title: "Yes",
          text: "Your file has been Added Successfully.",
          icon: "success",
        });
      }
    });
    // Sweet end
    console.log(cost);
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-5xl font-bold ">Add Parcel</h1>
      <h2 className="text-2xl font-semibold mt-4">Enter Your Parcel Details</h2>

      <form onSubmit={handleSubmit(handleFormData)} className="mt-6">
        {/* Parcel tyle Radio */}
        <label className="label mr-2">
          <input
            type="radio"
            {...register("parcelType")}
            value="document"
            className=" radio mr-3"
            defaultChecked
          />
          Document
        </label>
        <label className="label mr-2">
          <input
            type="radio"
            {...register("parcelType")}
            value="non-document"
            className=" radio mr-3"
          />
          Non-Document
        </label>
        <div className="grid grid-cols-2 gap-5">
          {/* Parcel Info name and wight */}
          <fieldset className="fieldset">
            <label className="label font-bold text-xl">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full input"
              placeholder="Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label text-xl font-semibold">Parcel Weight</label>
            <input
              type="number"
              {...register("ParcelWeight")}
              className="w-full input"
              placeholder="Parcel Weight"
            />
          </fieldset>
          <div></div>
        </div>
        {/* sender receiver details  container div*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Sender info */}

          <div>
            <h1 className="text-3xl font-bold">Sender Details</h1>

            <fieldset className="fieldset">
              <label className="label font-bold text-xl">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                // defaultValue={}
                className="w-full input"
                defaultValue={user?.displayName}
                placeholder="Sender Name"
              />
              </fieldset>

              {/* Email */}
              <fieldset className="fieldset">
              <label className="label font-bold text-xl">Email</label>
              <input
                type="text"
                {...register("senderEmail")}
                defaultValue={user?.email}
                className="w-full input"
                placeholder="Email"
              />
              </fieldset>

              {/*Region  */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Region</legend>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a Region"
                  className="select"
                >
                  <option disabled={true}>Pick a Region</option>

                  {uniqueRegion.map((region, index) => (
                    <option value={region} key={index}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Selece District */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">District</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a District"
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>

                  {districtByRegion(senderRegion).map((region, index) => (
                    <option key={index}>{region} </option>
                  ))}
                </select>
              </fieldset>
            

            {/* Address */}

            <fieldset className="fieldset">
              <label className="label font-bold text-xl">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="w-full input"
                placeholder="Sender Address"
              />
            </fieldset>
          </div>
          {/* Receiver inf */}
          <div>
            <h1 className="text-3xl font-bold">Receiver Details</h1>

            <fieldset className="fieldset">
              <label className="label font-bold text-xl">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="w-full input"
                placeholder="Receiver Name"
              />
            </fieldset>
            {/* Email */}
              <fieldset className="fieldset">
              <label className="label font-bold text-xl">Email</label>
              <input
                type="text"
                {...register("receiverEmail")}
                className="w-full input"
                placeholder="Email"
              />
              </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a Region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>

                {uniqueRegion.map((region, index) => (
                  <option value={region} key={index}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* Selece District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {districtByRegion(receiverRegion).map((region, index) => (
                  <option key={index}>{region} </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <label className="label font-bold text-xl">
                Receiver Address
              </label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="w-full input"
                placeholder="Receiver Address"
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black mt-5 font-semibold"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default SendParcel;

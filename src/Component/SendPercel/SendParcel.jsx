import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import axios from "axios";

const SendParcel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const axiosInstance = axios.create({
    baseURL: "https://rideshift.vercel.app",
  });

  const { register, handleSubmit, watch } = useForm();
  const regionData = useLoaderData();
  const uniqueRegion = [...new Set(regionData.map((r) => r.region))];

  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const districtByRegion = (region) =>
    regionData
      .filter((r) => r.region === region)
      .map((rd) => rd.district);

  const handleFormData = (data) => {
    data.paymentStatus = "unpaid";

    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const document = data.parcelType === "document";
    const weight = parseFloat(data.ParcelWeight);
    let cost = 0;

    if (document) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) cost = isSameDistrict ? 110 : 150;
      else cost = isSameDistrict ? 110 + (weight - 3) * 40 : 150 + (weight - 3) * 40 + 40;
    }
    data.cost = cost;

    Swal.fire({
      title: "Confirm Submission",
      text: `Your parcel cost is $${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .post("/parcels", data)
          .then((res) => {
            if (res.data.insertedId) navigate("/dashboard/myParcel");
          })
          .catch((err) => console.error(err));

        Swal.fire("Success!", "Parcel added successfully.", "success");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto my-2 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-4xl font-bold text-center text-primary mb-3">Add Parcel</h1>
      <p className="text-center text-gray-600 mb-6">
        Fill in the parcel and delivery details below
      </p>

      <form onSubmit={handleSubmit(handleFormData)} className="space-y-6">
        {/* Parcel Type */}
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2">
            <input type="radio" {...register("parcelType")} value="document" defaultChecked />
            Document
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" {...register("parcelType")} value="non-document" />
            Non-Document
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            {...register("name")}
            placeholder="Parcel Name"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            {...register("ParcelWeight")}
            placeholder="Parcel Weight (kg)"
            className="input input-bordered w-full"
          />
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-1 mb-2">Sender Details</h2>
            <input
              type="text"
              {...register("senderName")}
              defaultValue={user?.displayName}
              placeholder="Sender Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              {...register("senderEmail")}
              defaultValue={user?.email}
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <select {...register("senderRegion")} className="select select-bordered w-full">
              <option disabled>Pick a Region</option>
              {uniqueRegion.map((region, i) => (
                <option key={i} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select {...register("senderDistrict")} className="select select-bordered w-full">
              <option disabled>Pick a District</option>
              {districtByRegion(senderRegion).map((district, i) => (
                <option key={i}>{district}</option>
              ))}
            </select>
            <input
              type="text"
              {...register("senderAddress")}
              placeholder="Address"
              className="input input-bordered w-full"
            />
          </div>

          {/* Receiver */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-1 mb-2">Receiver Details</h2>
            <input
              type="text"
              {...register("receiverName")}
              placeholder="Receiver Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              {...register("receiverEmail")}
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <select {...register("receiverRegion")} className="select select-bordered w-full">
              <option disabled>Pick a Region</option>
              {uniqueRegion.map((region, i) => (
                <option key={i} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select {...register("receiverDistrict")} className="select select-bordered w-full">
              <option disabled>Pick a District</option>
              {districtByRegion(receiverRegion).map((district, i) => (
                <option key={i}>{district}</option>
              ))}
            </select>
            <input
              type="text"
              {...register("receiverAddress")}
              placeholder="Address"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full text-white font-semibold text-lg">
          Submit Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;

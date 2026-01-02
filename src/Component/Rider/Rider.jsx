import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, watch } = useForm();

  const handleRiderApplication = (data) => {
    axiosSecure
      .post("/riders", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your application has been submitted!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const regionData = useLoaderData();
  const uniqueRegion = [...new Set(regionData.map((r) => r.region))];
  const senderRegion = watch("region");

  const districtByRegion = (region) =>
    regionData
      .filter((r) => r.region === region)
      .map((rd) => rd.district);

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-4xl font-bold text-center text-primary mb-2">
        Be A Rider
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Join our team and enjoy fast, reliable parcel delivery with real-time 
  tracking and hassle-free operations. From personal packages to business 
  shipments, we ensure timely delivery with professionalism and care.
      </p>

      <form onSubmit={handleSubmit(handleRiderApplication)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rider Details Card */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-2">
              Rider Details
            </h2>

            <fieldset className="space-y-1">
              <label className="label font-semibold text-lg">Rider Name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.displayName}
                className="input input-bordered w-full rounded-md"
                placeholder="Rider Name"
              />
            </fieldset>

            <fieldset className="space-y-1">
              <label className="label font-semibold text-lg">Email</label>
              <input
                type="text"
                {...register("email")}
                defaultValue={user?.email}
                className="input input-bordered w-full rounded-md"
                placeholder="Email"
              />
            </fieldset>

            <fieldset className="space-y-1">
              <label className="label font-semibold text-lg">Region</label>
              <select
                {...register("region")}
                className="select select-bordered w-full rounded-md"
              >
                <option disabled>Pick a Region</option>
                {uniqueRegion.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="space-y-1">
              <label className="label font-semibold text-lg">District</label>
              <select
                {...register("district")}
                className="select select-bordered w-full rounded-md"
              >
                <option disabled>Pick a District</option>
                {districtByRegion(senderRegion).map((district, i) => (
                  <option key={i}>{district}</option>
                ))}
              </select>
            </fieldset>

            <fieldset className="space-y-1">
              <label className="label font-semibold text-lg">Address</label>
              <input
                type="text"
                {...register("address")}
                className="input input-bordered w-full rounded-md"
                placeholder="Address"
              />
            </fieldset>
          </div>

          {/* More Details Card */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-2">
              More Details
            </h2>

            <fieldset className="space-y-1">
              <label className="label font-semibold text-lg">Age</label>
              <input
                type="number"
                {...register("age")}
                className="input input-bordered w-full rounded-md"
                placeholder="Your Age"
              />
            </fieldset>

            <fieldset className="space-y-1">
              <label className="label font-semibold text-lg">Bike</label>
              <input
                type="text"
                {...register("bike")}
                className="input input-bordered w-full rounded-md"
                placeholder="Bike"
              />
            </fieldset>

            <fieldset className="space-y-1">
              <label className="label font-semibold text-lg">NID</label>
              <input
                type="text"
                {...register("nid")}
                className="input input-bordered w-full rounded-md"
                placeholder="NID"
              />
            </fieldset>

            <fieldset className="space-y-1">
              <label className="label font-semibold text-lg">License</label>
              <input
                type="text"
                {...register("license")}
                className="input input-bordered w-full rounded-md"
                placeholder="License"
              />
            </fieldset>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-white font-semibold text-lg mt-4"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Rider;

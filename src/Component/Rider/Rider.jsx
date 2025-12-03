import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();
  const handleRiderApplication = (data) => {
    axiosSecure
      .post("/riders", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // console.log(res)
      })
      .catch((err) => console.log(err));

    console.log("clicked on rider", data);
  };
  const regionData = useLoaderData();
  const duplicateRegion = regionData.map((r) => r.region);
  // const senderRegion = watch("region"); // line ~20

  const uniqueRegion = [...new Set(duplicateRegion)];
  const senderRegion = watch("region");

  const districtByRegion = (region) => {
    const regionDistrict = regionData.filter((r) => r.region === region);
    const districts = regionDistrict.map((rd) => rd.district);
    return districts;
  };
  return (
    <div className="w-11/12 mx-auto md:py-7">
      <h1 className="text-3xl font-bold">Be A Rider</h1>
      <p>
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal <br /> packages to business shipments — we deliver
        on time, every time.
      </p>
      <form onSubmit={handleSubmit(handleRiderApplication)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Sender info */}

          <div>
            <h1 className="text-3xl font-bold">Rider Details</h1>

            <fieldset className="fieldset">
              <label className="label font-bold text-xl">Rider Name</label>
              <input
                type="text"
                {...register("name")}
                // defaultValue={}
                className="w-full input"
                defaultValue={user?.displayName}
                placeholder="Rider Name"
              />
            </fieldset>

            {/* Email */}
            <fieldset className="fieldset">
              <label className="label font-bold text-xl">Email</label>
              <input
                type="text"
                {...register("email")}
                defaultValue={user?.email}
                className="w-full input"
                placeholder="Email"
              />
            </fieldset>

            {/*Region  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region</legend>
              <select
                {...register("region")}
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
                {...register("district")}
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
              <label className="label font-bold text-xl"> Address</label>
              <input
                type="text"
                {...register("address")}
                className="w-full input"
                placeholder="Address"
              />
            </fieldset>
          </div>
          {/* More Details */}
          <div>
            <h1 className="text-3xl font-bold">More Details</h1>

            <fieldset className="fieldset">
              <label className="label font-bold text-xl"> Age</label>
              <input
                type="number"
                {...register("age")}
                className="w-full input"
                placeholder="Your Agee"
              />
            </fieldset>
            {/* Bike */}
            <fieldset className="fieldset">
              <label className="label font-bold text-xl">Bike</label>
              <input
                type="text"
                {...register("bike")}
                className="w-full input"
                placeholder="Bike"
              />
            </fieldset>
            {/* Nid */}
            <fieldset className="fieldset">
              <label className="label font-bold text-xl">NID</label>
              <input
                type="text"
                {...register("nid")}
                className="w-full input"
                placeholder="NID"
              />
            </fieldset>
            {/* Li */}
            <fieldset className="fieldset">
              <label className="label font-bold text-xl">License</label>
              <input
                type="text"
                {...register("license")}
                className="w-full input"
                placeholder="License"
              />
            </fieldset>
          </div>
        </div>

        <button
          className="bg-primary text-black btn font-semibold"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Rider;

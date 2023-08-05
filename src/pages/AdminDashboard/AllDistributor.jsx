import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "../../shared/Loading/Loading";
import { toast } from "react-hot-toast";

const AllDistributor = () => {
  const {
    data: allDistributor = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allDistributor"],
    queryFn: async () => {
      const res = await fetch(
        `https://mediquick-server.onrender.com/api/v1/admin/alldistributor`
      );
      const data = await res.json();
      return data.user;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const hnadleDeleteUser = (user) => {
    fetch(
      `https://mediquick-server.onrender.com/api/v1/admin/user/${user._id}`,
      {
        method: "DELETE",
      }
    ).then((data) => {
      toast.success("User deleted succesfuly");
      refetch();
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-secondary py-6">
        All Distributor
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Address</th>
              <th>UserType</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allDistributor.map((distributor, i) => (
              <tr key={distributor?._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="font-bold">{distributor?.name}</div>
                </td>
                <td>{distributor?.address}</td>
                <td>{distributor?.userType}</td>
                <td>
                  <label
                    onClick={() => hnadleDeleteUser(distributor)}
                    className="btn btn-outline btn-error"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDistributor;
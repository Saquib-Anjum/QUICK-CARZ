import React, { useState, useEffect } from "react";
import Title from "../../components/owner/TitleOwner";
import { assets, dummyCarData, dummyMyBookingsData } from "../../assets/assets";

const ManageBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData); // ✅ fixed
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Bookings"
        subTitle="View all listed cars, update their details, or remove them from the booking platform"
      />
      {/* table */}
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={idx} className="border-t border-borderColor">
                {/* 1st */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt=""
                    className="h-12 w-12 aspect-square rounded-md object-cover"
                  />
                  <p className="p-3 flex items-center gap-3">
                    {booking.car.brand} {booking.car.model}
                  </p>
                </td>
                {/* 2nd */}
                <td className="p-3 max-md:hidden">
                  {booking.pickupDate.split("T")[0]} to{" "}
                  {booking.returnDate.split("T")[0]}
                </td>
                {/* 3rd */}
                <td className="p-3">
                  {currency}
                  {booking.price}
                </td>
                {/* 4th */}
                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full bg-gray-100 text-xs`}
                  >
                    Offline
                  </span>{" "}
                </td>
                {/* 5th */}
                <td className="p-3 ">
                  {booking.status === "pending" ? (
                    <select
                      value={booking.status}
                      className="px-2 py-1.5mt-1 text-gray-500 border border-borderColor rounded-md outline-none"
                    >
                      <option value="pending">Pending</option>

                      <option value="canclled">Cancelled</option>

                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;

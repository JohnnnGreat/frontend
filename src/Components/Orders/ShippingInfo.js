import React from "react";
import { MapPin } from "lucide-react";

const ShippingInfo = ({ shippingAddress }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <MapPin className="mr-2" />
        Shipping Address
      </h2>
      <p>{shippingAddress.address}</p>
      <p>
        {shippingAddress.city}, {shippingAddress.postalCode}
      </p>
      <p>{shippingAddress.country}</p>
    </div>
  );
};

export default ShippingInfo;

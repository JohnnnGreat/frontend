import React from "react";
import { CreditCard } from "lucide-react";

const PaymentInfo = ({ paymentMethod }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <CreditCard className="mr-2" />
        Payment Method
      </h2>
      <p>{paymentMethod}</p>
    </div>
  );
};

export default PaymentInfo;

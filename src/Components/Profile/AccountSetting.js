import React from "react";
import { useSelector } from "react-redux";

const AccountSetting = () => {
  const {
    user: { user },
  } = useSelector((state) => state.auth);

  return <div>AccountSetting</div>;
};

export default AccountSetting;

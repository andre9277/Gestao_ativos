import React, { useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

const AddAssetMovementForm = () => {
  const [allocationDate, setAllocationDate] = useState("");
  const [actionType, setActionType] = useState("");
  const [serNumber, setSerNumber] = useState("");
  const [reason, setReason] = useState("");
  const [other, setOther] = useState("");

  const { user, setUser, notification, setNotification, asset } =
    useStateContext();

  const navigate = useNavigate();
  console.log(asset);

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const allocationDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const data = {
      allocation_date: allocationDate,
      reason: reason,
      ser_number: serNumber,
      action_type: "Atualiza",
      other: other,
      user_id: user.id,
      asset_id: 1,
    };

    // Perform the POST request using a library like Axios or fetch
    // Example using Axios:
    axiosClient
      .post("/assetMovement", data)
      .then((response) => {
        // Handle the response
        console.log(response);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Serial Number:
        <input
          type="text"
          value={serNumber}
          onChange={(e) => setSerNumber(e.target.value)}
          required
        />
      </label>

      <label>
        Reason:
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </label>

      <label>
        Other:
        <textarea value={other} onChange={(e) => setOther(e.target.value)} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddAssetMovementForm;

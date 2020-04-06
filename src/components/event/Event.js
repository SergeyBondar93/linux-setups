import React from "react";

export const Event = ({
  event: {
    eventName,
    eventType,
    eventStatus,
    eventDate,
    description,
    firstName,
    lastName,
    salesStatus,
    id,
    managerId,
    leadId,
  },
}) => {
  return (
    <div>
      {eventName}
      {eventType}
      {eventStatus}
    </div>
  );
};

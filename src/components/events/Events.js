import React from "react";
import { Event } from "../event/Event";

export const Events = ({ events }) => {
  return (
    <div>
      {events.map((event) => {
        return <Event event={event} />;
      })}
    </div>
  );
};

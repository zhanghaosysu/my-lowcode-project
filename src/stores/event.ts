import { defineStore } from "pinia";
import useComponentData from "./index";

export default defineStore("eventStore", () => {
  const store = useComponentData();
  const addEvent = (eventName: string, eventParma: string) => {
    store.curComponent.events[eventName] = eventParma;
  };
  const deleteEvent = (eventName: string) => {
    delete store.curComponent.events[eventName];
  };
  return {
    addEvent,
    deleteEvent,
  };
});

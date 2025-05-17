import eventsData from "./events";

// Mock API service that uses static data instead of making real API calls
const api = {
  // Get all events
  getAllEvents: async () => {
    return Promise.resolve(eventsData);
  },

  // Get a specific event by ID
  getEvent: async (id) => {
    const event = eventsData.find((event) => event.id === parseInt(id));
    if (!event) {
      return Promise.reject(new Error("Event not found"));
    }
    return Promise.resolve(event);
  },

  // Search events with filters
  searchEvents: async (params) => {
    let filteredEvents = [...eventsData];

    // Only show published events
    filteredEvents = filteredEvents.filter(
      (event) => event.status === "published"
    );

    // Apply search query filter if provided
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title?.toLowerCase().includes(query) ||
          event.school?.toLowerCase().includes(query) ||
          event.event?.toLowerCase().includes(query) ||
          event.content?.toLowerCase().includes(query)
      );
    }

    // Filter by event type
    if (params.eventType && params.eventType !== "all") {
      filteredEvents = filteredEvents.filter(
        (event) => event.event?.toLowerCase() === params.eventType.toLowerCase()
      );
    }

    // Filter by institution
    if (params.institution && params.institution !== "all") {
      filteredEvents = filteredEvents.filter((event) =>
        event.school?.toLowerCase().includes(params.institution.toLowerCase())
      );
    }

    // Filter by date
    if (params.dateFilter && params.dateFilter !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      filteredEvents = filteredEvents.filter((event) => {
        if (!event.date) return true;

        const eventDate = new Date(event.date);
        if (params.dateFilter === "upcoming") {
          return eventDate >= today;
        } else if (params.dateFilter === "past") {
          return eventDate < today;
        }
        return true;
      });
    }

    return Promise.resolve(filteredEvents);
  },
};

export default api;

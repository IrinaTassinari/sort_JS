const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),

    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ",
    type: "offline",
    attendees: 99,

    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and CustomerExperience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),

    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),

    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),

    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",

    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),

    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 74,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),

    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
];

class EventFilter {
  constructor() {
    this.events = [...eventsStore];
    this.filteredEvents = [...this.events];
    this.filters = {
      type: "",
      distance: "",
      category: "",
    };
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderEvents();
  }

  bindEvents() {
    const typeFilter = document.querySelector("#typeFilter");
    const filterDistance = document.querySelector("#filterDistance");
    const categoryFilter = document.querySelector("#categoryFilter");

    [typeFilter, filterDistance, categoryFilter].forEach((item) => {
      item.addEventListener("change", (e) => {
        this.handleFilterChange(e);
      });
    });
  }

  handleFilterChange(e) {
    const { id, value } = e.target;
    switch (id) {
      case "typeFilter":
        this.filters.type = value;
        break;
      case "filterDistance":
        this.filters.distance = value;
        break;
      case "categoryFilter":
        this.filters.category = value;
        break;
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEvents = this.events.filter((event) => {
      const typeMatch = !this.filters.type || event.type === this.filters.type;
      const distanceMatch =
        !this.filters.distance ||
        event.distance <= parseInt(this.filters.distance);
      const categoryMatch =
        !this.filters.category || event.category === this.filters.category;

      return typeMatch && distanceMatch && categoryMatch;
    });
    this.renderEvents();
  }

  // renderEvents() {
  //   const eventList = document.querySelector("#eventList");
  //   if (this.filteredEvents === 0) {
  //     eventList.innerHTML = `
  //     <div class="no-events">
  //       <div class="no-events-icon">🔍</div>
  //       <p>События не найдены</p>
  //     </div>`;
  //     return;
  //   }
  //   eventList.innerHTML = this.filteredEvents
  //     .map((item) => this.createEventCard(item))
  //     .join("");
  // }

  renderEvents() {
  const eventList = document.querySelector("#eventList");
  
  if (this.filteredEvents.length === 0) {
    eventList.innerHTML = `
      <div class="no-events">
        <div class="no-events-icon">🔍</div>
        <p>События не найдены</p>
      </div>`;
    return;
  }

  eventList.innerHTML = this.filteredEvents
    .map((item) => this.createEventCard(item))
    .join("");
}

  createEventCard(event) {
    const formatDate = (date) => {
      return date.toLocaleDateString("en-EN", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
    };
    const getTypeLabel = (type) => (type === "online" ? "online" : "offline");
    return `
    <div class="event-card">
      <img src="${event.image}" alt="${
      event.title
    }" class="event-image" loading="lazy">
          <div class="event-content">
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
              <div class="event-meta">
                <span class="event-badge ${event.type}">${getTypeLabel(
      event.type
    )}</span>
                <span class="event-badge category">${event.category}</span>
              </div>
              <div class="event-date">📅 ${formatDate(event.date)}</div>
                ${
                  event.attendees
                    ? `<div class="event-attendees">👥 ${event.attendees} участников</div>`
                    : ""
                }
              <div class="event-attendees">📍 ${event.distance} км</div>
          </div>
    </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new EventFilter();
});

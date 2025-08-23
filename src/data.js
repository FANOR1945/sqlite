// data.js
export const specialties = [
  { id: 1, name: "Cardiología", doctors: 8 },
  { id: 2, name: "Dermatología", doctors: 6 },
  { id: 3, name: "Pediatría", doctors: 7 },
  { id: 4, name: "Ginecología", doctors: 5 },
  { id: 5, name: "Ortopedia", doctors: 6 },
  { id: 6, name: "Odontología", doctors: 12 }
];

export const doctors = [
  // Cardiología (8 doctores)
  { 
    id: 1, 
    name: "Dr. Juan Pérez", 
    specialty: "Cardiología", 
    rating: 4.8,
    schedule: [
      { day: "Lunes", hours: "08:30 - 12:00, 14:00 - 17:00" },
      { day: "Miércoles", hours: "08:30 - 12:00, 14:00 - 17:00" },
      { day: "Viernes", hours: "08:30 - 12:00" }
    ]
  },
  { 
    id: 2, 
    name: "Dra. Elena Morales", 
    specialty: "Cardiología", 
    rating: 4.9,
    schedule: [
      { day: "Martes", hours: "09:00 - 13:00, 15:00 - 18:00" },
      { day: "Jueves", hours: "09:00 - 13:00, 15:00 - 18:00" }
    ]
  },
  { 
    id: 3, 
    name: "Dr. Ricardo Torres", 
    specialty: "Cardiología", 
    rating: 4.7,
    schedule: [
      { day: "Lunes", hours: "10:00 - 14:00" },
      { day: "Miércoles", hours: "10:00 - 14:00" },
      { day: "Viernes", hours: "10:00 - 13:00" }
    ]
  },
  { 
    id: 4, 
    name: "Dra. Carmen Ruiz", 
    specialty: "Cardiología", 
    rating: 4.6,
    schedule: [
      { day: "Martes", hours: "08:00 - 12:00" },
      { day: "Jueves", hours: "08:00 - 12:00" },
      { day: "Sábado", hours: "09:00 - 12:00" }
    ]
  },

  // Dermatología (6 doctores)
  { 
    id: 5, 
    name: "Dra. María García", 
    specialty: "Dermatología", 
    rating: 4.9,
    schedule: [
      { day: "Martes", hours: "09:00 - 13:00, 15:00 - 18:00" },
      { day: "Jueves", hours: "09:00 - 13:00, 15:00 - 18:00" },
      { day: "Sábado", hours: "09:00 - 12:00" }
    ]
  },
  { 
    id: 6, 
    name: "Dr. Carlos Mendoza", 
    specialty: "Dermatología", 
    rating: 4.7,
    schedule: [
      { day: "Lunes", hours: "08:00 - 16:00" },
      { day: "Miércoles", hours: "08:00 - 16:00" }
    ]
  },
  { 
    id: 7, 
    name: "Dra. Laura Hernández", 
    specialty: "Dermatología", 
    rating: 4.8,
    schedule: [
      { day: "Martes", hours: "10:00 - 14:00" },
      { day: "Jueves", hours: "10:00 - 14:00" },
      { day: "Viernes", hours: "10:00 - 13:00" }
    ]
  },

  // Pediatría (7 doctores)
  { 
    id: 8, 
    name: "Dr. Carlos López", 
    specialty: "Pediatría", 
    rating: 4.7,
    schedule: [
      { day: "Lunes", hours: "08:00 - 16:00" },
      { day: "Martes", hours: "08:00 - 16:00" },
      { day: "Miércoles", hours: "08:00 - 16:00" },
      { day: "Jueves", hours: "08:00 - 16:00" },
      { day: "Viernes", hours: "08:00 - 14:00" }
    ]
  },
  { 
    id: 9, 
    name: "Dra. Sofia Ramirez", 
    specialty: "Pediatría", 
    rating: 4.9,
    schedule: [
      { day: "Lunes", hours: "09:00 - 13:00" },
      { day: "Miércoles", hours: "09:00 - 13:00" },
      { day: "Viernes", hours: "09:00 - 13:00" }
    ]
  },
  { 
    id: 10, 
    name: "Dr. Javier Ortega", 
    specialty: "Pediatría", 
    rating: 4.6,
    schedule: [
      { day: "Martes", hours: "14:00 - 18:00" },
      { day: "Jueves", hours: "14:00 - 18:00" },
      { day: "Sábado", hours: "09:00 - 12:00" }
    ]
  },

  // Ginecología (5 doctoras)
  { 
    id: 11, 
    name: "Dra. Ana Rodríguez", 
    specialty: "Ginecología", 
    rating: 4.6,
    schedule: [
      { day: "Lunes", hours: "10:00 - 13:00, 16:00 - 19:00" },
      { day: "Miércoles", hours: "10:00 - 13:00, 16:00 - 19:00" },
      { day: "Viernes", hours: "10:00 - 13:00" }
    ]
  },
  { 
    id: 12, 
    name: "Dra. Patricia Castro", 
    specialty: "Ginecología", 
    rating: 4.8,
    schedule: [
      { day: "Martes", hours: "09:00 - 13:00" },
      { day: "Jueves", hours: "09:00 - 13:00" },
      { day: "Sábado", hours: "09:00 - 12:00" }
    ]
  },
  { 
    id: 13, 
    name: "Dra. Veronica Silva", 
    specialty: "Ginecología", 
    rating: 4.7,
    schedule: [
      { day: "Lunes", hours: "14:00 - 18:00" },
      { day: "Miércoles", hours: "14:00 - 18:00" },
      { day: "Viernes", hours: "14:00 - 17:00" }
    ]
  },

  // Ortopedia (6 doctores)
  { 
    id: 14, 
    name: "Dr. Miguel Sánchez", 
    specialty: "Ortopedia", 
    rating: 4.5,
    schedule: [
      { day: "Martes", hours: "18:00 - 20:00" },
      { day: "Jueves", hours: "18:00 - 20:00" },
      { day: "Sábado", hours: "09:00 - 11:00" }
    ]
  },
  { 
    id: 15, 
    name: "Dr. Roberto Díaz", 
    specialty: "Ortopedia", 
    rating: 4.8,
    schedule: [
      { day: "Lunes", hours: "08:00 - 12:00" },
      { day: "Miércoles", hours: "08:00 - 12:00" },
      { day: "Viernes", hours: "08:00 - 12:00" }
    ]
  },
  { 
    id: 16, 
    name: "Dra. Carolina Rojas", 
    specialty: "Ortopedia", 
    rating: 4.7,
    schedule: [
      { day: "Martes", hours: "14:00 - 18:00" },
      { day: "Jueves", hours: "14:00 - 18:00" }
    ]
  },

  // Odontología (12 doctores)
  { 
    id: 17, 
    name: "Dr. Roberto Martínez", 
    specialty: "Odontología", 
    rating: 4.8,
    schedule: [
      { day: "Lunes", hours: "08:30 - 12:30, 15:00 - 18:00" },
      { day: "Miércoles", hours: "08:30 - 12:30, 15:00 - 18:00" },
      { day: "Viernes", hours: "08:30 - 12:30" }
    ]
  },
  { 
    id: 18, 
    name: "Dra. Laura Fernández", 
    specialty: "Odontología", 
    rating: 4.9,
    schedule: [
      { day: "Martes", hours: "09:00 - 13:00, 16:00 - 19:00" },
      { day: "Jueves", hours: "09:00 - 13:00, 16:00 - 19:00" },
      { day: "Sábado", hours: "09:00 - 13:00" }
    ]
  },
  { 
    id: 19, 
    name: "Dr. Javier Gómez", 
    specialty: "Odontología", 
    rating: 4.7,
    schedule: [
      { day: "Lunes", hours: "10:00 - 14:00" },
      { day: "Miércoles", hours: "10:00 - 14:00" },
      { day: "Viernes", hours: "10:00 - 13:00" }
    ]
  },
  { 
    id: 20, 
    name: "Dra. Carmen Vargas", 
    specialty: "Odontología", 
    rating: 4.6,
    schedule: [
      { day: "Martes", hours: "08:00 - 12:00" },
      { day: "Jueves", hours: "08:00 - 12:00" },
      { day: "Sábado", hours: "09:00 - 12:00" }
    ]
  },
  { 
    id: 21, 
    name: "Dr. Andrés Castro", 
    specialty: "Odontología", 
    rating: 4.5,
    schedule: [
      { day: "Lunes", hours: "14:00 - 18:00" },
      { day: "Miércoles", hours: "14:00 - 18:00" },
      { day: "Viernes", hours: "14:00 - 17:00" }
    ]
  },
  { 
    id: 22, 
    name: "Dra. Sofia Rojas", 
    specialty: "Odontología", 
    rating: 4.9,
    schedule: [
      { day: "Martes", hours: "09:00 - 13:00" },
      { day: "Jueves", hours: "09:00 - 13:00" },
      { day: "Sábado", hours: "09:00 - 12:00" }
    ]
  }
];

export const services = [
  { id: 1, name: "Consulta General", duration: "30 min", price: "$50" },
  { id: 2, name: "Chequeo Anual", duration: "60 min", price: "$80" },
  { id: 3, name: "Examen Especializado", duration: "45 min", price: "$120" },
  { id: 4, name: "Terapia", duration: "50 min", price: "$75" },
  // Servicios de Odontología
  { id: 5, name: "Limpieza Dental", duration: "40 min", price: "$60" },
  { id: 6, name: "Blanqueamiento Dental", duration: "90 min", price: "$150" },
  { id: 7, name: "Ortodoncia", duration: "60 min", price: "$200" },
  { id: 8, name: "Extracción Dental", duration: "45 min", price: "$120" },
  { id: 9, name: "Implante Dental", duration: "120 min", price: "$350" },
  { id: 10, name: "Calza", duration: "50 min", price: "$90" }
];

export const timeSlots = [
  'Lun 09:00', 'Lun 10:00', 'Lun 11:00', 'Lun 14:00', 'Lun 15:00', 'Lun 16:00',
  'Mar 09:00', 'Mar 10:00', 'Mar 11:00', 'Mar 14:00', 'Mar 15:00', 'Mar 16:00',
  'Mié 09:00', 'Mié 10:00', 'Mié 11:00', 'Mié 14:00', 'Mié 15:00', 'Mié 16:00',
  'Jue 09:00', 'Jue 10:00', 'Jue 11:00', 'Jue 14:00', 'Jue 15:00', 'Jue 16:00',
  'Vie 09:00', 'Vie 10:00', 'Vie 11:00', 'Vie 14:00', 'Vie 15:00', 'Vie 16:00',
  'Sáb 09:00', 'Sáb 10:00', 'Sáb 11:00'
];
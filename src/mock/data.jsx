// data.js - Datos completos del sistema
export const specialties = [
  { id: 1, name: "Cardiología", doctors: [1, 2, 3, 4] },
  { id: 2, name: "Dermatología", doctors: [5, 6, 7] },
  { id: 3, name: "Pediatría", doctors: [8, 9, 10] },
  { id: 4, name: "Ginecología", doctors: [11, 12, 13] },
  { id: 5, name: "Ortopedia", doctors: [14, 15, 16] },
  { id: 6, name: "Odontología", doctors: [17, 18, 19, 20, 21, 22] }
];

export const doctors = [
  { 
    id: 1, 
    name: "Dr. Juan Pérez", 
    specialty: "Cardiología", 
    rating: 4.8,
    availableYears: [2023, 2024, 2025],
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
    availableYears: [2024, 2025],
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
    availableYears: [2023, 2024, 2025],
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
    availableYears: [2024, 2025],
    schedule: [
      { day: "Martes", hours: "08:00 - 12:00" },
      { day: "Jueves", hours: "08:00 - 12:00" },
      { day: "Sábado", hours: "09:00 - 12:00" }
    ]
  },
  { 
    id: 5, 
    name: "Dra. María García", 
    specialty: "Dermatología", 
    rating: 4.9,
    availableYears: [2023, 2024, 2025],
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
    availableYears: [2024, 2025],
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
    availableYears: [2023, 2024, 2025],
    schedule: [
      { day: "Martes", hours: "10:00 - 14:00" },
      { day: "Jueves", hours: "10:00 - 14:00" },
      { day: "Viernes", hours: "10:00 - 13:00" }
    ]
  },
  { 
    id: 8, 
    name: "Dr. Carlos López", 
    specialty: "Pediatría", 
    rating: 4.7,
    availableYears: [2024, 2025],
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
    availableYears: [2023, 2024, 2025],
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
    availableYears: [2024, 2025],
    schedule: [
      { day: "Martes", hours: "14:00 - 18:00" },
      { day: "Jueves", hours: "14:00 - 18:00" },
      { day: "Sábado", hours: "09:00 - 12:00" }
    ]
  },
  { 
    id: 11, 
    name: "Dra. Ana Rodríguez", 
    specialty: "Ginecología", 
    rating: 4.6,
    availableYears: [2023, 2024, 2025],
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
    availableYears: [2024, 2025],
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
    availableYears: [2023, 2024, 2025],
    schedule: [
      { day: "Lunes", hours: "14:00 - 18:00" },
      { day: "Miércoles", hours: "14:00 - 18:00" },
      { day: "Viernes", hours: "14:00 - 17:00" }
    ]
  },
  { 
    id: 14, 
    name: "Dr. Miguel Sánchez", 
    specialty: "Ortopedia", 
    rating: 4.5,
    availableYears: [2024, 2025],
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
    availableYears: [2023, 2024, 2025],
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
    availableYears: [2024, 2025],
    schedule: [
      { day: "Martes", hours: "14:00 - 18:00" },
      { day: "Jueves", hours: "14:00 - 18:00" }
    ]
  },
  { 
    id: 17, 
    name: "Dr. Roberto Martínez", 
    specialty: "Odontología", 
    rating: 4.8,
    availableYears: [2023, 2024, 2025],
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
    availableYears: [2024, 2025],
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
    availableYears: [2023, 2024, 2025],
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
    availableYears: [2024, 2025],
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
    availableYears: [2023, 2024, 2025],
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
    availableYears: [2024, 2025],
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
  { id: 5, name: "Limpieza Dental", duration: "40 min", price: "$60" },
  { id: 6, name: "Blanqueamiento Dental", duration: "90 min", price: "$150" },
  { id: 7, name: "Ortodoncia", duration: "60 min", price: "$200" },
  { id: 8, name: "Extracción Dental", duration: "45 min", price: "$120" },
  { id: 9, name: "Implante Dental", duration: "120 min", price: "$350" },
  { id: 10, name: "Calza", duration: "50 min", price: "$90" }
];

// Estructura principal de disponibilidad
export const availabilityData = {
  years: {
    2023: {
      name: "2023",
      availableMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      doctors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    },
    2024: {
      name: "2024",
      availableMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      doctors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    },
    2025: {
      name: "2025",
      availableMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      doctors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    }
  },
  
  months: {
    0: { name: "Enero", days: 31, abbreviation: "Ene" },
    1: { name: "Febrero", days: 28, abbreviation: "Feb", leapYear: 29 },
    2: { name: "Marzo", days: 31, abbreviation: "Mar" },
    3: { name: "Abril", days: 30, abbreviation: "Abr" },
    4: { name: "Mayo", days: 31, abbreviation: "May" },
    5: { name: "Junio", days: 30, abbreviation: "Jun" },
    6: { name: "Julio", days: 31, abbreviation: "Jul" },
    7: { name: "Agosto", days: 31, abbreviation: "Ago" },
    8: { name: "Septiembre", days: 30, abbreviation: "Sep" },
    9: { name: "Octubre", days: 31, abbreviation: "Oct" },
    10: { name: "Noviembre", days: 30, abbreviation: "Nov" },
    11: { name: "Diciembre", days: 31, abbreviation: "Dic" }
  },
  
  weekDays: {
    0: { name: "Domingo", abbreviation: "Dom", isWeekend: true },
    1: { name: "Lunes", abbreviation: "Lun", isWeekend: false },
    2: { name: "Martes", abbreviation: "Mar", isWeekend: false },
    3: { name: "Miércoles", abbreviation: "Mié", isWeekend: false },
    4: { name: "Jueves", abbreviation: "Jue", isWeekend: false },
    5: { name: "Viernes", abbreviation: "Vie", isWeekend: false },
    6: { name: "Sábado", abbreviation: "Sáb", isWeekend: true }
  },
  
  timeSlots: {
    "1-2024-0-15": ["09:00", "10:00", "11:00", "14:00", "15:00"],
    "1-2024-0-16": ["10:00", "11:00", "15:00", "16:00"],
    "1-2024-0-17": ["09:00", "10:00", "14:00"],
    "2-2024-0-15": ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
    "2-2024-0-16": ["09:00", "10:00", "14:00", "15:00"],
  }
};

// Funciones de utilidad
export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const getDaysInMonth = (year, month) => {
  if (month === 1) {
    return isLeapYear(year) ? 29 : 28;
  }
  return availabilityData.months[month].days;
};

export const getAvailableMonths = (year) => {
  if (availabilityData.years[year]) {
    return availabilityData.years[year].availableMonths;
  }
  return [];
};

export const getAvailableDoctors = (year) => {
  if (availabilityData.years[year]) {
    return availabilityData.years[year].doctors;
  }
  return [];
};

export const getTimeSlotsByDate = (doctorId, date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  const key = `${doctorId}-${year}-${month}-${day}`;
  return availabilityData.timeSlots[key] || [];
};

export const checkDateAvailability = (doctorId, date) => {
  const slots = getTimeSlotsByDate(doctorId, date);
  return slots.length > 0;
};

export const getAvailableYears = () => {
  return Object.keys(availabilityData.years).map(Number).sort((a, b) => b - a);
};

export const getMonthName = (monthIndex) => {
  return availabilityData.months[monthIndex]?.name || "";
};

export const getWeekDayName = (date) => {
  const dayIndex = date.getDay();
  return availabilityData.weekDays[dayIndex]?.abbreviation || "";
};

export const generateAllTimeSlots = () => {
  return [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];
};

export const getYearsFrom = (startYear) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years.reverse();
};
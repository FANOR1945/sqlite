// utils/time.js
export function generateSlots(hoursString, interval = 30) {
  const slots = [];
  const ranges = hoursString.split(",");
  
  ranges.forEach(range => {
    const [start, end] = range.trim().split(" - ");
    let [sh, sm] = start.split(":").map(Number);
    let [eh, em] = end.split(":").map(Number);

    let startMinutes = sh * 60 + sm;
    let endMinutes = eh * 60 + em;

    while (startMinutes < endMinutes) {
      let h = Math.floor(startMinutes / 60);
      let m = startMinutes % 60;
      slots.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
      );
      startMinutes += interval;
    }
  });

  return slots;
}

// A helper file
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

const parseDate = (dateString) => {
  const parts = dateString.split('-');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is zero-based
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

const isWeekend = (date) => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
}

export const generateDateRangeArray = (startDateStr, endDateStr) => {
  const startDate = parseDate(startDateStr);
  const endDate = parseDate(endDateStr);
  
  const dateArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (!isWeekend(currentDate)) {
      dateArray.push(formatDate(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

// Example usage:
// const startDateStr = '01-01-2024';
// const endDateStr = '10-01-2024';

// const dateRangeArray = generateDateRangeArray(startDateStr, endDateStr);
// console.log(dateRangeArray);

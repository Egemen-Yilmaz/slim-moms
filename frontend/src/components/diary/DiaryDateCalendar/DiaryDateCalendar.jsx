
export default function DiaryDateCalendar({ selectedDate, onDateChange }) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ marginBottom: '30px' }}>
      <input
        type="date"
        style={{
          fontSize: '20px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          outline: 'none',
          fontFamily: 'inherit',
          color: '#212121'
        }}
        value={selectedDate || today}
        onChange={(e) => onDateChange(e.target.value)}
        max={today}
      />
    </div>
  );
}
export default function RightSideBar() {
  return (
    <aside className="right-sidebar">
      <div style={{ padding: "20px" }}>
        <h3>Summary</h3>

        <p>Summary for: 13.08.2023</p>

        <ul>
          <li>
            <strong>Left:</strong> 1200 kcal
          </li>
          <li>
            <strong>Consumed:</strong> 800 kcal
          </li>
          <li>
            <strong>Daily Rate:</strong> 2000 kcal
          </li>
          <li>
            <strong>Normal %:</strong> 60%
          </li>
        </ul>

        <hr />

        <h4>Food not recommended</h4>

        <ul>
          <li>Chocolate</li>
          <li>Fast Food</li>
          <li>Sugary Drinks</li>
        </ul>
      </div>
    </aside>
  );
}

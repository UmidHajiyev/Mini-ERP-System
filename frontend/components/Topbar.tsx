type TopbarProps = {
  onLogout: () => void;
};

export default function Topbar({ onLogout }: TopbarProps) {
  return (
    <div className="topbar">
      <span>Inventory Management System</span>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
}
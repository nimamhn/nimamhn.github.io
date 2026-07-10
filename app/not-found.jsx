export default function NotFound() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "80vh", textAlign: "center", padding: "40px", fontFamily: "Vazirmatn, system-ui, sans-serif"
    }}>
      <h1 style={{ fontSize: "6rem", fontWeight: 800, margin: 0, background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>404</h1>
      <p style={{ fontSize: "1.2rem", color: "#8899b4", marginTop: 8 }}>Page not found — صفحه مورد نظر پیدا نشد</p>
      <a href="/nimamehrani" style={{ marginTop: 24, padding: "12px 28px", borderRadius: 100, background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>Back to Home</a>
    </div>
  );
}

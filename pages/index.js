export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Career Hub is live 🎉</h1>
      <p>Login and explore your future career today.</p>
    </main>
  );
}
import CareerHub from "@/components/CareerHubWithLogin"; // adjust path if needed

export default function Home() {
  return <CareerHub />;
}

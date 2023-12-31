import Header from "@/components/Header";
import RecentForms from "@/components/RecentForms";

function DashboardPage() {
  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto">
        <RecentForms />
      </main>
    </>
  );
}

export default DashboardPage;

import LandingHeader from "@/components/LandingHeader";

function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingHeader />
      {children}
    </>
  );
}

export default HomePageLayout;

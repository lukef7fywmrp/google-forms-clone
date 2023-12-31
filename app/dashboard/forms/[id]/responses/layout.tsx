import ResponsesHeader from "@/components/ResponsesHeader";

function ResponsesLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="max-w-3xl mx-auto pt-40 sm:pt-32 pb-16 space-y-3.5">
      <ResponsesHeader id={id} />
      {children}
    </div>
  );
}

export default ResponsesLayout;

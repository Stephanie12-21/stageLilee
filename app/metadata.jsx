export const metadata = {
  title: "Lilee",
  description: "Live like everyone else",
};

export default function Head() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </>
  );
}

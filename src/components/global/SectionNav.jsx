export default function SectionNav({ title, children, id }) {
  return (
    <nav id={id} className=" bg-primary py-4 px-8 flex justify-between">
      <h1 className="font-Itim text-3xl">{title}</h1>
      {children}
    </nav>
  );
}

export default function Sidenote({ title = "Sidenote", children, className }) {
  return (
    <div
      className={`absolute w-[92vw] max-w-[30rem] bg-black sm:w-96 ${className}`}
    >
      <div className="flex items-center justify-between p-4 border-b-2 border-b-white">
        <div>{title}</div>
        <div className="size-2 rounded-full bg-white"></div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

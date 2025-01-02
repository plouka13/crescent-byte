import Nav from "./Nav";

export default function NavWrap({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Nav />
      <div className="flex flex-col flex-grow">
        <main className="flex-grow overflow-auto ml-14">{children}</main>
      </div>
    </div>
  );
}

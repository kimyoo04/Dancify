import Copywrite from "./FooterItem/Copywrite";

export default function Footer() {
  return (
    <footer className="w-screen border-t">
      {/* sub footer */}
      <div className="container flex justify-center px-5 py-4 md:justify-start">
        <Copywrite />
      </div>
    </footer>
  );
}

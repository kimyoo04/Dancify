import Copywrite from "./FooterItem/Copywrite";

export default function Footer() {
  return (
    <footer className="z-10 w-full max-w-screen-xl border-t">
      {/* sub footer */}
      <div className="flex justify-start px-5 py-4">
        <Copywrite />
      </div>
    </footer>
  );
}

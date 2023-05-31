import Copywrite from "./FooterItem/Copywrite";

export default function Footer() {
  return (
    <footer className="border-t-light_gray_3/30 dark:border-t-night_gray_3/30 border-t">
      {/* sub footer */}
      <div className="container mx-auto flex justify-center px-5 py-4 md:justify-start">
        <Copywrite />
      </div>
    </footer>
  );
}

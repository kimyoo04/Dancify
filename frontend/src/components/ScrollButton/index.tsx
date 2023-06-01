export default function ScrollButton() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={() => scrollToTop()}
      className="col-center shadow-gray_1 group fixed bottom-8 right-4 z-10 h-10 w-10 rounded-full bg-white shadow-sm transition-all hover:scale-125"
    >
      <i className="ri-arrow-up-s-line text-3xl font-bold text-main_color_yellow transition-all "></i>
    </button>
  );
}

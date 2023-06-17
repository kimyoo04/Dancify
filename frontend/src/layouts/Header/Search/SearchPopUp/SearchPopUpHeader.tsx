export default function SearchPopUpHeader({
  searchPopUp,
  setSearchPopUp,
}: {
  searchPopUp: string;
  setSearchPopUp: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center justify-between rounded-t-md border-b px-4 py-2">
      <button
        className={`font-medium ${
          searchPopUp === "최근검색어" ? "text-primary" : ""
        }`}
        onClick={() => setSearchPopUp("최근검색어")}
      >
        최근검색어
      </button>
      <button
        className={`font-medium ${
          searchPopUp === "인기검색어" ? "text-primary" : ""
        }`}
        onClick={() => setSearchPopUp("인기검색어")}
      >
        인기검색어
      </button>
    </div>
  );
}

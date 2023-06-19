import Link from "next/link";

export default function CreateButton() {
  return (
    <Link
      href="/posts/free/new"
      className="row-center fixed bottom-6 left-0 right-0 z-10 mx-auto h-10 w-20 rounded-full bg-tertiary shadow-md transition-all hover:scale-125"
    >
      <button>
        <i className="ri-pencil-line text-2xl  text-white"></i>
      </button>
    </Link>
  );
}

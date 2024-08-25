import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">List Menu</h2>
      <ul className="flex-1">
      <li className="mb-2">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/items" className="hover:underline">
            List Items
          </Link>
        </li>
        {/* Add more items here */}
      </ul>
      <button
        onClick={handleLogout}
        className="mt-auto w-full bg-red-500 p-2 rounded text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

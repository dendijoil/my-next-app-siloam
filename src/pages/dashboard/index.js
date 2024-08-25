import { getUser } from "@/utils/getUser";
import Sidebar from "@components/Sidebar";

const Dashboard = () => {
  const user = getUser();
  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome {user.username}, you are logged in. Navigate to your dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard;

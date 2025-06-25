import "./homepage.css";
import { useSelector } from "react-redux";
import ChatContainer from "../components/ChatContainer";
import AnimeSidebar from "../components/SideBar";


function Homepage() {
  const user = useSelector((state) => state.auth.user);
  const userName = user?.name;

  return (
    <div className="app flex h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 font-inter overflow-hidden">
      <AnimeSidebar username={userName} />
      <ChatContainer />
    </div>
  );
}
export default Homepage;

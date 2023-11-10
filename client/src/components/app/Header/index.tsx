import { TfiWrite } from "react-icons/tfi";
import { Button } from "@/components/ui/button";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ImBlog } from "react-icons/im";
import Theme from "./ThemeToggle/Theme";
import CustomMenuBar from "@/components/custom/CustomMenuBar";
import CustomAvatar from "@/components/custom/CustomAvatar";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/atoms/authAtom";

export default function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const {isLogged} = useRecoilValue(authAtom)

  const handleLogin = () => {
    navigate('/login')
  };

  const handleRegister = () => {
   navigate('/register')
  };

  return (
    <header className="border-b-[1px]">
      <div className="container py-3 flex justify-between items-center">
        <div className="flex gap-2 items-center cursor-pointer">
          <ImBlog size={25} />
          <Link to={"/"}>
            <h2>Blogs</h2>
          </Link>
        </div>
        {location.pathname === "/" ? (
          <div className="flex items-center border-[1px] px-5 rounded-lg w-[50%]">
            <Input
              placeholder="Search a post..."
              className="border-none outline-none font-bold tracking-wide"
            />
            <AiOutlineSearch size={20} />
          </div>
        ) : (
          ""
        )}
        <div className="sm:hidden">
          <CustomMenuBar>
            <AiOutlineMenu size={20} />
          </CustomMenuBar>
        </div>
        <div className="hidden sm:flex sm:items-center sm:gap-2 lg:gap-5">
          <Button
            variant={"outline"}
            className="gap-2"
            onClick={() => navigate("/write")}
          >
            <p className="font-bold">Write</p>
            <TfiWrite size={20} />
          </Button>
          {isLogged ? (
            <CustomMenuBar>
              <CustomAvatar />
            </CustomMenuBar>
          ) : (
            <>
              <Button variant={"outline"} size={"sm"} onClick={handleLogin}>
                Login
              </Button>
              <Button variant={"outline"} size={"sm"} onClick={handleRegister}>
                Register
              </Button>
            </>
          )}
          <Theme />
        </div>
      </div>
    </header>
  );
}

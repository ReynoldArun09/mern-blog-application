import { AxiosError } from "axios";
import Axios from '@/axios/Axios'
import EditProfile from "../app/EditProfile";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import { useToast } from "../ui/use-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "@/atoms/authAtom";
import { useNavigate } from "react-router-dom";


export default function CustomMenuBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const navigate = useNavigate()
  const setAuthState = useSetRecoilState(authAtom);
  const { isLogged } = useRecoilValue(authAtom);
  const handleLogout = async () => {
    try {
      const response = await Axios.get("user/logout-user");
      if (response.status === 200 && response.data.success === true) {
        setAuthState({
          isLogged: null
        });
        sessionStorage.removeItem('token')
        toast({
          variant: "default",
          description: "You have been Logged out.",
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title: "There was a problem with your request.",
          description: error.response?.data?.error,
        });
      } else {
        toast({
          variant: "destructive",
          title: "There was a problem with your request.",
        });
      }
    }
  };
  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger>{children}</MenubarTrigger>
        {isLogged ? (
          <MenubarContent>
            <EditProfile>Edit Profile</EditProfile>
            <MenubarSeparator />
            <button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </button>
          </MenubarContent>
        ) : (
          <MenubarContent className="mt-3 sm:hidden">
            <div className="flex flex-col items-start pl-5 space-y-2">
            <button className="cursor-pointer" onClick={() => navigate('/write')}>
              Write
            </button>
            <button className="cursor-pointer" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="cursor-pointer" onClick={() => navigate('/register')}>
              Register
            </button>
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
}

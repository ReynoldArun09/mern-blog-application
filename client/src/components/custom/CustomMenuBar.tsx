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
import { useSetRecoilState } from "recoil";
import { authAtom } from "@/atoms/authAtom";

export default function CustomMenuBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const setAuthState = useSetRecoilState(authAtom);
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
        <MenubarContent>
          <EditProfile>Edit Profile</EditProfile>
          <MenubarSeparator />
          <button className="cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

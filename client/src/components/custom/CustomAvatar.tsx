import { useRecoilValue } from "recoil";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import { authAtom } from "@/atoms/authAtom";

export default function CustomAvatar() {
  const { isLogged } = useRecoilValue(authAtom);
  return (
    <Avatar>
      <AvatarImage src={isLogged?.avatar} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

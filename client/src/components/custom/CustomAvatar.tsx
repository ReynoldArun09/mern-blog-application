import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";

export default function CustomAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

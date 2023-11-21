/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { useState } from "react";
import Axios from '@/axios/Axios'
import { authAtom } from "@/atoms/authAtom";
import { useRecoilValue } from "recoil";

export default function EditProfile({children}: {children:React.ReactNode}) {
  const { isLogged } = useRecoilValue(authAtom) as any 
  const [avatar, setAvatar] = useState<any>(null)
  const [username, setUsername] = useState("")
  const preset = import.meta.env.VITE_PRESET_CLOUD 
  const cloudName = import.meta.env.VITE_CLOUD_NAME

  const handleAvatar = (e:any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };


  const uploadAvatar = async () => {
    const data = new FormData();
    data.append('file', avatar);
    data.append('upload_preset', `${preset}`);
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method:'POST',
        body: data,
      })
      const urlData = response.json();     
      return urlData;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
      })
    }
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
  
    try {
      const url = await uploadAvatar()
      const response = await Axios.put(`user/update-user/${isLogged.userId}`, {
        username: username,
        avatar:url.url
      }, {
        headers: {
          'Content-Type' : 'application/json'
        },
      });
      if (response.status === 201 && response.data.success === true) {
        toast({
          variant: "default",
          title: "Success!",
          description: "Profile updated successfully",
        });
      }
    } catch (error) {
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
    <Sheet>
    <SheetTrigger>
      {children}
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label  className="text-right">
            Username
          </Label>
          <Input value={username} className="col-span-3" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">
            Avatar
          </Label>
          <Input type="file"  className="col-span-3" onChange={handleAvatar}/>
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
  );
}

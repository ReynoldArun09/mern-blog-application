import { useState } from "react";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Input, Badge, Label, Button, Textarea } from "@/components/ui";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/atoms/authAtom";
import { ImCross } from "react-icons/im";
import Axios from "@/axios/Axios";

export default function CreatePostPage() {
  const { isLogged } = useRecoilValue(authAtom) as any
  const [image, setImage] = useState<any>(null);
  const [title, setTile] = useState("");
  const [desc, setDesc] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cat, setCat] = useState("")
  const [cats, setCats] = useState<string[]>([])



  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const preset = import.meta.env.VITE_PRESET_CLOUD 
  const cloudName = import.meta.env.VITE_CLOUD_NAME

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', image);
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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title === "" || title.length < 4) {
      toast({
        variant: "destructive",
        title: "Title must be 4 or more charc",
      });
      return;
    }

    if (desc === "" || desc.length < 10) {
      toast({
        variant: "destructive",
        title: "Description must be 10 or more charc",
      });
      return;
    }

    try {
      const url = await uploadImage()
      const response = await Axios.post("post/create", {
        title,
        desc,
        cats,
        username: isLogged.username,
        userId: isLogged.userId,
        image:url.url
      }, {
        headers: {
          'Content-Type' : 'application/json'
        },
      });
      if (response.status === 201 && response.data.success === true) {
        toast({
          variant: "default",
          title: "Success!",
          description: "Post Created successfully",
        });
        navigate("/");
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

  const deleteCategory = (i: number) => {
    const updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    const updatedCats = [...cats];
    updatedCats.push(cat)
    setCat("");
    setCats(updatedCats);
  };

  return (
    <section className="container h-[80vh] mx-auto py-5">
      <h1 className="font-bold text-center md:text-2xl text-xl ">
        Create a post
      </h1>
      <form
        className="w-3/5 flex mx-auto flex-col space-y-4 md:space-y-8 mt-4"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTile(e.target.value)}
        />
        <div>
          <Label htmlFor="image">Select your image</Label>
          <Input type="file" className="px-4 my-2" onChange={handleImage} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-8">
            <Input
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="px-4 py-2 outline-none"
              placeholder="Enter post category"
              type="text"
            />
            <Button onClick={addCategory} type="button" className="w-[25%]">
              Add
            </Button>
          </div>

          <div className="flex mt-6">
            {cats?.map((c, i:number) => (
              <Badge
                key={i}
                className="flex justify-center items-center space-x-2 mr-4 px-2 py-1 rounded-md"
              >
                <p>{c}</p>
                <p onClick={() => deleteCategory(i)}>
                  <ImCross size={10} />
                </p>
              </Badge>
            ))}
          </div>
        </div>
        <Textarea
          rows={10}
          cols={30}
          placeholder="Enter post description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full md:w-[20%] mx-auto font-semibold px-4 py-2 md:text-xl text-lg"
        >
          Create
        </Button>
      </form>
    </section>
  );
}

import { Button, Input, Badge } from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import { MdDelete } from "react-icons/md";
import Axios from "@/axios/Axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import Comment from "@/components/app/Comment";
import { useNavigate } from "react-router-dom";
import { authAtom } from "@/atoms/authAtom";
import { IComment } from "@/utils/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function PostDetails() {
  const { isLogged } = useRecoilValue(authAtom);
  const [comment, setComment] = useState<string>("");
  const postId = useParams<string>().id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: singlePost } = useQuery({
    queryKey: ["singlePost", postId],
    queryFn: () => Axios.get(`/post/single/${postId}`),
    refetchOnWindowFocus: false,
  });

  const { data: comments } = useQuery({
    queryKey: ["getcomment", postId],
    queryFn: () => Axios.get(`/comment/all/${postId}`),
  });

  const {mutateAsync:commentadd} = useMutation({
    mutationFn: () => {
      return Axios.post("comment/create", {
        comment,
        userId: isLogged?.userId,
        username: isLogged?.username,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['getcomment']})
    },
    onError: () => {
       toast({
        "variant": "destructive",
        "description": "Something went wrong!!"
      })
    }
  });

  const handleComment = async() => {
    if(comment === '' || comment.length < 4) {
      toast({
        "variant": "destructive",
        "description": "Minimum 4 charc.."
      })
      return;
    }
    await commentadd()
  }


  const {mutateAsync:deletePost} = useMutation({
    mutationFn: () => {
      return Axios.delete(`post/delete/${postId}`)
    },
    onSuccess: () => {
      toast({
        "variant": "default",
        "description": "Post deleted Successfully!!"
      })
      navigate('/')
    },
    onError: () => {
       toast({
        "variant": "destructive",
        "description": "Something went wrong!!"
      })
    }
  });

  
  const handleDelete = async() => {
    await deletePost()
  }


  return (
    <section className="px-8 md:px-[200px] text-gray-400 font-bold mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold md:text-3xl break-words">
          {singlePost?.data.data.title}
        </h1>

        {singlePost?.data.data.userId === isLogged?.userId ? (
          <div className="flex items-center justify-center space-x-2">
            <MdDelete size={25} onClick={handleDelete} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center justify-between mt-2 md:mt-4">
        <h2 className="capitalize">{singlePost?.data.data.username}</h2>
        <div className="flex gap-5">
          <p>
            {new Date(singlePost?.data.data.updatedAt).toString().slice(0, 15)}
          </p>
          <p>
            {new Date(singlePost?.data.data.updatedAt).toString().slice(16, 24)}
          </p>
        </div>
      </div>
      <img src="/imagex.jpg" alt="image" className="w-full mx-auto mt-8" />
      <p className="mx-auto mt-8 break-words">{singlePost?.data.data?.desc}</p>
      <div className="flex items-center mt-8 space-x-4 font-semibold">
        <p>Categories:</p>
        {singlePost?.data.data.categories.map((category: string, k: number) => (
          <div className="flex mx-2 items-center space-x-2" key={k}>
            <Badge>{category}</Badge>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-4">
        <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
        {comments?.data.data?.map((comment: IComment) => (
          <Comment data={comment} key={comment?._id} />
        ))}
      </div>
      <div className="flex gap-2 pt-2 pb-10 items-center">
        <Input
          placeholder="Write a comment"
          className="md:w-[70%] py-5 outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {isLogged?.username ? (
          <Button onClick={handleComment}>Add Comment</Button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

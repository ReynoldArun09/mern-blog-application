import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "@/axios/Axios";
import { useSetRecoilState } from "recoil";
import { postAtom } from "@/atoms/postAtom";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const FetchBlogs = () => {
  const setPostData = useSetRecoilState(postAtom);

  const { isLoading } = useQuery({
    queryKey: ["blogsData"],
    queryFn: async () => {
      const data = await Axios.get("post/all");
      setPostData(data.data.data);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return { isLoading };
};

export const FetchSingleBlog = (postId: string | undefined) => {
  const { data: singlePost } = useQuery({
    queryKey: ["singlePost", postId],
    queryFn: () => Axios.get(`/post/single/${postId}`),
    refetchOnWindowFocus: false,
  });

  return { singlePost };
};

export const FetchComments = (postId: string | undefined) => {
  const { data: comments } = useQuery({
    queryKey: ["getcomment", postId],
    queryFn: () => Axios.get(`/comment/all/${postId}`),
  });

  return { comments };
};


export const PostComment = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: commentadd } = useMutation({
    mutationFn: (data:unknown) => {
      const response = Axios.post("comment/create", data);
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getcomment"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Something went wrong!!",
      });
    },
  });

  return { commentadd };
};


export const DeletePost = () => {
  const navigate = useNavigate();
  
  const {mutateAsync:deletePost} = useMutation({
    mutationFn: (postId:string | undefined) => {
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
  return {deletePost}
}

export const DeleteComments = (postId:string | undefined, _id:string) => {
  const queryClient = useQueryClient();
  const {mutateAsync:deleteComment} = useMutation({
    mutationFn: () => {
      return Axios.delete(`comment/delete/${postId}/${_id}`)
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

  return {deleteComment}
}
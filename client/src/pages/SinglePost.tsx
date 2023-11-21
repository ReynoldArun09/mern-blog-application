import { Button, Input, Badge } from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import Comment from "@/components/app/Comment";
import { authAtom } from "@/atoms/authAtom";

import {
  DeletePost,
  FetchComments,
  FetchSingleBlog,
  PostComment,
} from "@/apis";
import { TComment } from "@/utils/types";

export default function PostDetails() {
  const { isLogged } = useRecoilValue(authAtom);
  const [comment, setComment] = useState<string>("");
  const postId = useParams<string>().id;
  const { toast } = useToast();
  const { singlePost } = FetchSingleBlog(postId);
  const { comments } = FetchComments(postId);
  const { commentadd } = PostComment();
  const { deletePost } = DeletePost();

  const handleComment = async () => {
    if (comment === "" || comment.length < 4) {
      toast({
        variant: "destructive",
        description: "Minimum 4 charc..",
      });
      return;
    }
    const data = {
      postId,
      userId: isLogged?.userId,
      username: isLogged?.username,
      comment,
    };
    await commentadd(data);
    setComment("");
  };


  return (
    <section className="px-10 container mx-auto text-gray-400 font-bold mt-8">
      <div>
        <p className="text-2xl break-words">{singlePost?.data.data.title}</p>
      </div>
      <div className="flex items-center justify-between mt-2 md:mt-4">
        <h2 className="capitalize text-lg">
          Posted By: {singlePost?.data.data.username}
        </h2>
        <div className="flex gap-5">
          {singlePost?.data.data.userId === isLogged?.userId ? (
            <div>
              <MdDelete size={25} onClick={() => deletePost(postId)} />
            </div>
          ) : (
            ""
          )}
          <p>
            {new Date(singlePost?.data.data.updatedAt).toString().slice(0, 15)}
          </p>
          <p>
            {new Date(singlePost?.data.data.updatedAt).toString().slice(16, 24)}
          </p>
        </div>
      </div>
      <img
        src={singlePost?.data.data.image}
        alt="image"
        className="w-full mx-auto mt-8"
      />
      <p className="mx-auto mt-8 break-words">{singlePost?.data.data?.desc}</p>
      <div className="flex items-center flex-wrap space-y-3 mt-8 space-x-4 font-semibold">
        <p>Categories:</p>
        {singlePost?.data.data.categories.map((category: string, k: number) => (
          <div className="flex mx-2 items-center space-x-2" key={k}>
            <Badge>{category}</Badge>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-4">
        <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
        {comments?.data.data?.map((comment: TComment) => (
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

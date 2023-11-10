import { MdDelete } from "react-icons/md";
import Axios from '@/axios/Axios'
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useToast } from "@/components/ui/use-toast";
import { ValueType, authAtom } from "@/atoms/authAtom";
import { IComment } from "@/utils/interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
  
export type CommentType = {
  data: IComment;
};

export default function SiteComment({data: {_id, userId, username, comment, updatedAt}}: CommentType) {
  const {isLogged} = useRecoilValue<ValueType>(authAtom);
  const postId = useParams().id;
  const {toast} = useToast();
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
  
  const DeleteComment = async() => {
    await deleteComment()
  }

  return (
    <div className="px-2 py-2 dark:bg-gray-900 bg-gray-300  rounded-lg my-2">
      <div className="flex mx-4 items-center justify-between">
        <h3 className="font-bold">{username}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(updatedAt!).toString().slice(0, 15)}</p>
          <p>{new Date(updatedAt!).toString().slice(16, 24)}</p>
          <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer">
              {userId === isLogged?.userId ? (
                <MdDelete onClick={DeleteComment} />
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      </div>
      <p className="px-4 mt-2 break-words">{comment}</p>
    </div>
  );
}

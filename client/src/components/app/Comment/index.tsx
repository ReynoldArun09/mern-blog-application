import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/atoms/authAtom";
import { CommentType, ValueType } from "@/utils/types";
import { DeleteComments } from "@/apis";
  
export default function SiteComment({data: {_id, userId, username, comment, updatedAt}}: CommentType) {
  const {isLogged} = useRecoilValue<ValueType>(authAtom);
  const postId = useParams().id;
  const {deleteComment} = DeleteComments(postId, _id)

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
                <MdDelete onClick={() => deleteComment()} />
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

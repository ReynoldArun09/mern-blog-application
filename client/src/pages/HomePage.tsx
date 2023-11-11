import { authAtom } from "@/atoms/authAtom";
import SitePosts from "@/components/app/SitePosts";
import CustomSkeleton from "@/components/custom/CustomSkeleton";
import { useQuery } from "@tanstack/react-query";
import Axios from "@/axios/Axios";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { postType } from "@/utils/types";
import { postAtom } from "@/atoms/postAtom";

export default function HomePage() {
  const authState = useRecoilValue(authAtom);
  const PostData = useRecoilValue(postAtom)
  const setPostData = useSetRecoilState(postAtom)

 
  const { isLoading} = useQuery({
    queryKey: ["blogsData"],
    queryFn: async() => {
      const data = await Axios.get("post/all")
      setPostData(data.data.data)
      return data
    },
    refetchOnWindowFocus: false,
  });
  


  if (isLoading) {
    return [...Array(5)].map((_, i: number) => <CustomSkeleton key={i} />);
  }

  if (PostData && PostData.length === 0) {
    return (
      <main className="container mx-auto text-center py-5 min-h-[75vh]">
        <h1 className="text-5xl font-bold text-rose-500">No Post Found</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto items-center py-5 min-h-screen">
      {PostData?.map((post: postType) => (
        <Link to={authState ? `/posts/${post._id}` : "/login"} key={post._id}>
          <SitePosts post={post} />
        </Link>
      ))}
    </main>
  );
}

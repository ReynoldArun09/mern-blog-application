import { authAtom } from "@/atoms/authAtom";
import SitePosts from "@/components/app/SitePosts";
import CustomSkeleton from "@/components/custom/CustomSkeleton";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ValueType, postType } from "@/utils/types";
import { postAtom } from "@/atoms/postAtom";
import { FetchBlogs } from "@/apis";

export default function HomePage() {
  const authState = useRecoilValue<ValueType>(authAtom);
  const PostData = useRecoilValue<postType[]>(postAtom);
  const { isLoading } = FetchBlogs();

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

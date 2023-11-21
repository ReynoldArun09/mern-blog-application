import { PostType } from "@/utils/types";

export default function SitePosts({
  post: { username, desc, updatedAt, title, image },
}: PostType) {
  return (
    <section className="flex flex-col md:flex-row w-full gap-24 my-5">
      <div className="md:w-[35%] h-[250px] flex justify-center items-center">
        <img
          src={image}
          alt="blog-image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:w-[55%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl break-words">
          {title}
        </h1>
        <div className="flex mb-2 text-sm font-bold text-gray-500 items-center justify-between md:mb-4">
          <h2 className="capitalize text-lg">Posted By: {username}</h2>
          <div className="flex gap-5">
            <p>{new Date(updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <div>
          <p className="text-sm md:text-lg break-words">
            {desc.toString().slice(0, 350)}
          </p>
        </div>
      </div>
    </section>
  );
}

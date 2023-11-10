export const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("file", image);
    newForm.append("title", title);
    newForm.append("desc", desc);
    newForm.append("username", isLogged.username);
    newForm.append("userId", isLogged.userId);

    if (title === "" || title.length < 4) {
      toast({
        variant: "destructive",
        title: "Title must be 4 or more charc",
      });
      return;
    }

    if (desc === "" || desc.length < 30) {
      toast({
        variant: "destructive",
        title: "Description must be 30 or more charc",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/post/create",
        newForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201 && response.data.success === true) {
        toast({
          variant: "default",
          title: "Welcome!!",
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


  export const deleteCategory=(i:number)=>{
    const updatedCats=[...cats]
    updatedCats.splice(i)
    setCats(updatedCats)
 }

 export const addCategory=()=>{
     const updatedCats=[...cats]
     updatedCats.push(cat)
     setCat("")
     setCats(updatedCats)
 }

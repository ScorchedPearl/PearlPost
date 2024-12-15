"use client"
import { IoIosSend } from "react-icons/io";
import Loader from "@/app/loading/page"
import PostCard from "@/components/self/postcard"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useCreateComment, useGetCommentByPostId } from "@/hooks/comment"
import { useGetPosts } from "@/hooks/posts"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { graphqlClient } from "clients/api"
import { getSignedUrlForPostImageQuery } from "graphql/query/post"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import CommentCard from "@/components/self/commentcard";
const formSchema = z.object({
    image2: z.custom<File>((value) => value instanceof File && value.size > 0, {
      message: "Please upload a valid image file",
    }),
    content2: z
      .string()
      .min(10, {
        message: "Content must be at least 10 characters.",
      })
      .max(1000, {
        message: "Content must not be longer than 1000 characters.",
      }),
    tags2: z.string().min(0, {
      message: "Tag must be at least 3 characters",
    }),
  });
export default function Page(){
    
    const pathname=usePathname();
    const lastSegment = pathname?.split('/').pop();
    const comments=useGetCommentByPostId(lastSegment as string);
    const { posts,isLoading2 } = useGetPosts();
    const current=posts?.find(post => post.id === lastSegment);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          content2: "",
          tags2: "",
        },
      });
      const [imageurl, setImageurl] = useState("");
      const { mutate, isPending } = useCreateComment();
      const onSubmit = useCallback(
        async (values: z.infer<typeof formSchema>) => {
          console.log(values);
    
          if (values.image2) {
            const { getSignedUrlForPostImage } = await graphqlClient.request(
              getSignedUrlForPostImageQuery,
              {
                imageName: values.image2.name,
                imageType: values.image2.type,
              }
            );
    
            if (getSignedUrlForPostImage) {
              await axios.put(getSignedUrlForPostImage, values.image2, {
                headers: {
                  contentType: values.image2.type,
                },
              });
              const url = new URL(getSignedUrlForPostImage);
              const filepath = `${url.origin}${url.pathname}`;
              setImageurl(filepath);
              console.log(filepath);
              mutate({
                  content: values.content2,
                  imageUrl: filepath,
                  tags: values.tags2.split(" "),
                  postid: lastSegment as string
              });
            }
          }
        },
        [mutate, graphqlClient]
      );
    if(isLoading2&&isPending){
        return <Loader></Loader>
    }
    return <>
    <div className="flex">
    {
        current?<PostCard key={current?.id} data={current}></PostCard>:null
    }
        <div>
          <div className="flex items-center justify-between">
            <div className="ml-20">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 "
                >
                    <div className="flex justify-between">
                        <div className=" w-96 mr-3">
                  <FormField
                    control={form.control}
                    name="content2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your post content here..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe your post in detail.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>
                  <div className="relative top-28">
                  <FormField
                    control={form.control}
                    name="image2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            accept="image/*"
                            id="picture"
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              field.onChange(file);
                            }}
                            placeholder="Image For Your Post"
                          />
                        </FormControl>
                        <FormDescription>Upload Image</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>
                  </div>
                  {imageurl && (
                    <Image
                      src={imageurl}
                      alt="post image"
                      width={350}
                      height={350}
                    ></Image>
                  )}
                  <div className="flex justify-between">
                    <div className="w-96 mr-3">
                  <FormField
                    control={form.control}
                    name="tags2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your post tags here..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Tags tell Everything.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                  <Button className="mt-32 relative right-28 bg-black border-white" type="submit"><IoIosSend className="text-3xl text-white" type="submit"/></Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <div>
            {comments?.comment?.map((post: any) => {
                      return <CommentCard key={post.id} data={post}></CommentCard>;
            })}
            </div>
        </div>
        </div>
    </>
}
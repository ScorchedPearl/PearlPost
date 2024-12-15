"use client";
import { useCallback, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar";
import { AppSidebar } from "../../../components/modif/app-siderbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useForm } from "react-hook-form";
import { useCreatePost } from "../../../hooks/posts";
import { graphqlClient } from "../../../../clients/api";
import { getSignedUrlForPostImageQuery } from "graphql/query/post";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import Loader from "@/app/loading/page";

const formSchema = z.object({
  image: z.custom<File>((value) => value instanceof File && value.size > 0, {
    message: "Please upload a valid image file",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z
    .string()
    .min(10, {
      message: "Content must be at least 10 characters.",
    })
    .max(1000, {
      message: "Content must not be longer than 1000 characters.",
    }),
  tags: z.string().min(0, {
    message: "Tag must be at least 3 characters",
  }),
});

export default function CreatePost() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });
  const {user,isLoading}=useCurrentUser();
  const [imageurl, setImageurl] = useState("");
  const { mutate, isPending } = useCreatePost();
  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      console.log(values.image);

      if (values.image) {
        const { getSignedUrlForPostImage } = await graphqlClient.request(
          getSignedUrlForPostImageQuery,
          {
            imageName: values.image.name,
            imageType: values.image.type,
          }
        );

        if (getSignedUrlForPostImage) {
          toast.loading("Uploading...");
          await axios.put(getSignedUrlForPostImage, values.image, {
            headers: {
              contentType: values.image.type,
            },
          });

          toast.success("Uploaded...");
          const url = new URL(getSignedUrlForPostImage);
          const filepath = `${url.origin}${url.pathname}`;
          setImageurl(filepath);
          console.log(filepath);
          mutate({
            content: values.content,
            title: values.title,
            imageUrl: filepath,
            tags: values.tags.split(" "),
          });
        }
      }
    },
    [mutate, graphqlClient, toast]
  );
  if(isLoading){
    return <Loader></Loader>
  }
  else{
    return (
      <SidebarProvider>
        <AppSidebar user={user}/>
        <main>
          <SidebarTrigger />
          <div className="flex items-center justify-center">
            <div className="ml-20 w-96">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title of your post" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the title of your post.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="content"
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
                  <FormField
                    control={form.control}
                    name="image"
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
                  {imageurl && (
                    <Image
                      src={imageurl}
                      alt="post image"
                      width={350}
                      height={350}
                    ></Image>
                  )}
                  <FormField
                    control={form.control}
                    name="tags"
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
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </div>
        </main>
      </SidebarProvider>
    );
  }
}

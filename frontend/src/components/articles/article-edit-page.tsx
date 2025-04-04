
import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Article } from "shared-types"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import RichTextEditor from "./rich-text-editor"
import { toast } from 'sonner';
import { useArticle } from "@/hooks"


const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
})

export default function ArticleEditPage({ article }: {
  article: Article
}) {
  const { articleId } = useParams<{ articleId: string }>()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { updateArticle } = useArticle();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!articleId) return

    setIsSubmitting(true)
    try {
      const data = {
        articleId,
        body: {
          ...values
        }
      };

      updateArticle(data);
      toast("Your article has been updated successfully.");

      navigate(`/articles/${articleId}`)
    } catch (error) {
      console.error("Failed to update article:", error)
      toast("Failed to update the article. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // if (isLoading) {
  //   return (
  //     <div className="container mx-auto py-8 px-4">
  //       <div className="mb-6">
  //         <div className="flex items-center text-muted-foreground mb-4">
  //           <ChevronLeft className="h-4 w-4 mr-1" />
  //           <span>Back to Article</span>
  //         </div>
  //         <Skeleton className="h-10 w-2/3 mb-6" />
  //       </div>

  //       <Card>
  //         <CardContent className="p-6">
  //           <Skeleton className="h-8 w-1/4 mb-2" />
  //           <Skeleton className="h-10 w-full mb-6" />

  //           <Skeleton className="h-8 w-1/4 mb-2" />
  //           <Skeleton className="h-64 w-full mb-6" />

  //           <div className="flex justify-end gap-2">
  //             <Skeleton className="h-10 w-24" />
  //             <Skeleton className="h-10 w-24" />
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   )
  // }

  if (!article) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Article not found</h2>
        <p className="text-muted-foreground mb-4">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/articles">Back to Articles</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter article title" {...field} />
                    </FormControl>
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
                      <RichTextEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => navigate(`/articles/${articleId}`)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}


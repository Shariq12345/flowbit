"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  endpoint: z.url({ message: "Please enter a valid url" }),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  body: z.string().optional(),
  //   .refine(),
});

export type FormType = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultEndpoint?: string;
  defaultMethod?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  defaultBody?: string;
}

export const HttpRequestDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultBody,
  defaultEndpoint,
  defaultMethod = "GET",
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endpoint: defaultEndpoint,
      method: defaultMethod,
      body: defaultBody,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        endpoint: defaultEndpoint,
        method: defaultMethod,
        body: defaultBody,
      });
    }
  }, [open, defaultBody, defaultMethod, defaultEndpoint]);

  const watchMethod = form.watch("method");
  const showBodyField = ["POST", "PUT", "PATCH"].includes(watchMethod);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Make HTTP requests to external APIs and services. This node allows
            you to fetch data, send information, or integrate with other
            systems.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md bg-blue-50 p-3 text-sm">
          <p className="text-blue-600 font-medium">Quick Tips:</p>
          <ul className="mt-1 space-y-1 text-blue-600 text-xs list-disc pl-4">
            <li>
              Use variables from previous nodes with{" "}
              <code className="bg-blue-100/50 rounded px-1">
                {"{{variableName}}"}
              </code>
            </li>
            <li>
              For objects/arrays, use{" "}
              <code className="bg-blue-100/50 rounded px-1">
                {"{{json variableName}}"}
              </code>
            </li>
            <li>
              Access nested data with dot notation:{" "}
              <code className="bg-blue-100/50 rounded px-1">
                {"{{response.data.id}}"}
              </code>
            </li>
          </ul>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs space-y-1">
                    <div>
                      • <span className="font-medium">GET:</span> Retrieve data
                      (most common)
                    </div>
                    <div>
                      • <span className="font-medium">POST:</span> Create new
                      data or submit forms
                    </div>
                    <div>
                      • <span className="font-medium">PUT/PATCH:</span> Update
                      existing data
                    </div>
                    <div>
                      • <span className="font-medium">DELETE:</span> Remove data
                    </div>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://api.example.com/users/{{httpResponse.data.id}}"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs space-y-1">
                    <div>Enter the complete URL for your API endpoint:</div>
                    <div>
                      • Static:{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        https://api.example.com/users
                      </code>
                    </div>
                    <div>
                      • Dynamic:{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        https://api.example.com/users/{"{{userId}}"}
                      </code>
                    </div>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showBodyField && (
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Body</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px] font-mono text-sm"
                        placeholder={
                          '{\n "userId": "{{httpResponse.data.id}}", \n "name": "{{httpResponse.data.name}}",\n "items": "{{httpResponse.data.items}}"\n}'
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs space-y-1">
                      <div>Format your request body as JSON. Examples:</div>
                      <div>
                        • Single value:{" "}
                        <code className="bg-gray-100 px-1 rounded">
                          "name": "{"{{user.name}}"}"
                        </code>
                      </div>
                      <div>
                        • Object:{" "}
                        <code className="bg-gray-100 px-1 rounded">
                          "data": "{"{{json userData}}"}"
                        </code>
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter className="mt-3">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

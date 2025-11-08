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
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message:
        "Variable name must start with a letter or undescore and contains only letters, numbers and _",
    }),
  endpoint: z.url({ message: "Please enter a valid url" }),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  body: z.string().optional(),
  //   .refine(),
});

export type HttpRequestFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<HttpRequestFormValues>;
}

export const HttpRequestDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "",
      endpoint: defaultValues.endpoint || "",
      method: defaultValues.method || "GET",
      body: defaultValues.body || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "",
        endpoint: defaultValues.endpoint || "",
        method: defaultValues.method || "GET",
        body: defaultValues.body || "",
      });
    }
  }, [open, defaultValues, form]);

  const watchVariableName = form.watch("variableName") || "variable-name";
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
              name="variableName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable Name</FormLabel>
                  <FormControl>
                    <Input placeholder="httpRequest" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Name this node to access its response data in other nodes:
                  </FormDescription>
                  <ul className="text-xs space-y-1 mt-1.5 text-muted-foreground">
                    <li>
                      <span className="font-medium">Response data:</span>{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        {`{{${watchVariableName}.data}}`}
                      </code>
                    </li>
                    <li>
                      <span className="font-medium">Status code:</span>{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        {`{{${watchVariableName}.statusCode}}`}
                      </code>
                    </li>
                    <li>
                      <span className="font-medium">Headers:</span>{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        {`{{${watchVariableName}.headers}}`}
                      </code>
                    </li>
                  </ul>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormDescription className="text-xs">
                    Choose the appropriate method for your request:
                  </FormDescription>
                  <ul className="text-xs space-y-1 mt-1.5 text-muted-foreground">
                    <li>
                      <span className="font-medium">GET:</span> Retrieve data
                      (most common)
                    </li>
                    <li>
                      <span className="font-medium">POST:</span> Create new data
                      or submit forms
                    </li>
                    <li>
                      <span className="font-medium">PUT/PATCH:</span> Update
                      existing data
                    </li>
                    <li>
                      <span className="font-medium">DELETE:</span> Remove data
                    </li>
                  </ul>
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
                  <FormDescription className="text-xs">
                    Enter the complete URL for your API endpoint:
                  </FormDescription>
                  <ul className="text-xs space-y-1 mt-1.5 text-muted-foreground">
                    <li>
                      <span className="font-medium">Static:</span>{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        https://api.example.com/users
                      </code>
                    </li>
                    <li>
                      <span className="font-medium">Dynamic:</span>{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        https://api.example.com/users/{"{{userId}}"}
                      </code>
                    </li>
                  </ul>
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
                    <FormDescription className="text-xs">
                      Format your request body as JSON. Examples:
                    </FormDescription>
                    <ul className="text-xs space-y-1 mt-1.5 text-muted-foreground">
                      <li>
                        <span className="font-medium">Single value:</span>{" "}
                        <code className="bg-gray-100 px-1 rounded">
                          "name": "{"{{user.name}}"}"
                        </code>
                      </li>
                      <li>
                        <span className="font-medium">Object:</span>{" "}
                        <code className="bg-gray-100 px-1 rounded">
                          "data": "{"{{json userData}}"}"
                        </code>
                      </li>
                    </ul>
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

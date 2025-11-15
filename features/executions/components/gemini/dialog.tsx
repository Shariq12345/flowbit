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

const AVAILABLE_MODELS = [
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
] as const;

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message:
        "Variable name must start with a letter or undescore and contains only letters, numbers and _",
    }),
  model: z.string().min(1, "Model is required"),
  systemPrompt: z.string().optional(),
  userPrompt: z.string().min(1, "User prompt is required"),
  //   .refine(),
});

export type GeminiFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<GeminiFormValues>;
}

export const GeminiDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "",
      model: defaultValues.model || AVAILABLE_MODELS[0],
      systemPrompt: defaultValues.systemPrompt || "",
      userPrompt: defaultValues.userPrompt || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "",
        model: defaultValues.model || AVAILABLE_MODELS[0],
        systemPrompt: defaultValues.systemPrompt || "",
        userPrompt: defaultValues.userPrompt || "",
      });
    }
  }, [open, defaultValues, form]);

  const watchVariableName = form.watch("variableName") || "variable_name";

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gemini</DialogTitle>
          <DialogDescription>Configure Gemini AI</DialogDescription>
        </DialogHeader>
        <div className="rounded-md bg-blue-50 p-3 text-sm">
          <p className="text-blue-600 font-medium">Quick Tips:</p>
          <ul className="mt-1 space-y-1 text-blue-600 text-xs list-disc pl-4">
            <li>
              Use variables from previous nodes with
              <code className="bg-blue-100/50 rounded px-1">
                {"{{variableName}}"}
              </code>
            </li>
            <li>
              For objects/arrays, include{" "}
              <code className="bg-blue-100/50 rounded px-1">
                {"{{json variableName}}"}
              </code>
              to stringify complex values before sending to the model.
            </li>
            <li>
              Reference AI outputs in later nodes using dot notation:{" "}
              <code className="bg-blue-100/50 rounded px-1">{`{{${watchVariableName}.text}}`}</code>
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
                    <Input placeholder="gemini" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Name this node to access the AI output in other nodes:
                  </FormDescription>
                  <ul className="text-xs space-y-1 mt-1.5 text-muted-foreground">
                    <li>
                      <span className="font-medium">Response data:</span>{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        {`{{${watchVariableName}.text}}`}
                      </code>
                    </li>
                    {/* <li>
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
                    </li> */}
                  </ul>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Model</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a model"></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {AVAILABLE_MODELS.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs">
                    Select from a list of available Gemini models.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="systemPrompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System Prompt (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-20 font-mono text-sm"
                      placeholder={"You are a helpful assistant."}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Set the assistant's role or instructions. Use
                    <code className="bg-gray-100 px-1 rounded">
                      {"{{variables}}"}
                    </code>{" "}
                    for simple values or
                    <code className="bg-gray-100 px-1 rounded">
                      {"{{json variable}}"}
                    </code>{" "}
                    to pass stringified objects.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userPrompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px] font-mono text-sm"
                      placeholder={
                        "Summarize this text: {{json response.data}}."
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    The prompt to send to the AI. Use
                    <code className="bg-gray-100 px-1 rounded">
                      {"{{variables}}"}
                    </code>{" "}
                    for simple values or
                    <code className="bg-gray-100 px-1 rounded">
                      {"{{json variable}}"}
                    </code>{" "}
                    to stringify objects.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-3">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

"use client"
import React, { useContext } from "react";
import Output from "@/components/home/Output";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { generate } from "@/app/actions";
import { BioContext } from "@/context/BioContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import PartifulLink from "./PartifulLink";

const items = [
  {
    id: "birthday",
    label: "🎂 birthday",
  },
  {
    id: "chill",
    label: "🍵 chill",
  },
  {
    id: "summer",
    label: "☀️ summer",
  },
  {
    id: "location",
    label: "🏙️ my location",
  },
  {
    id: "chaos",
    label: "🐒 chaos",
  }
] as const

const FormSchema = z.object({
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export function UserInput() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tags: ["summer", "birthday"],
    },
  })

	const { setOutput, setTitle, setDescription, setImage, setURL, setLoading, loading } = useContext(BioContext);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);

    try {
      const object = await generate(values['tags']);
      setOutput(JSON.stringify(object));
			setTitle(object.title)
			setDescription(object.description)
			setImage(object.image)
			setURL(object.url)
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-center">
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="tags"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="inline-flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl className="flex gap-x-2">
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked: boolean) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
														title={item.label}
                          />
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
				        <Output />
					<div className="flex flex-wrap justify-center gap-x-2 gap-y-2.5 mb-4">
          <button className="select-none cursor-pointer rounded-[100px] border border-transparent px-6 text-black transition-colors duration-200 ease-in-out" type="submit" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            🔮 Ask again
          </button>
					<PartifulLink></PartifulLink>

					</div>
      </form>
    </Form>
  )
}

export default UserInput;

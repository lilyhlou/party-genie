"use client"
import React, { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { generate } from "@/app/actions";
import { BioContext } from "@/context/BioContext";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

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

	const { setTitle, setDescription, setImage, setURL, setItems, items, setLoading } = useContext(BioContext);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setLoading(true);

    try {
      const object = await generate(values['tags']);
			setTitle(object.title)
			setDescription(object.description)
			setImage(object.image)
			setURL(object.url)
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
		const i = Math.floor(Math.random() * 8) + 1;
		const background = "url('/assets/backgrounds/frame-" + i + ".png')";
    document.body.style.backgroundImage = background
		if (i > 6) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
		
  }

  function addTag(e: any) {
		let input = document.querySelector('.add-vibe') as HTMLInputElement
		let value
		if (input) {
			value = input.value  ?? ''
		}
		if (value) {
			setItems([...items, {'id': value, 'label': '🫵 ' + value, 'checked': true}])
			let formVals = [...form.getValues().tags, value]
			form.setValue('tags', formVals, {
				shouldValidate: true
			})
		}
		input.value = '';
	}
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-center m-auto max-w-4xl" id="partiful-tags">
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
												id={`${item.id}-checkbox`}
                        className='inline-flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl className="flex gap-x-2">
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={(checked: boolean) => {
															item.checked = !item.checked
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
							<div className="relative">
							<Input key='input' tabIndex={0} className="add-vibe .px-6 cursor-pointer rounded-[100px] border border-transparent text-black transition-colors duration-200 ease-in-out text-center" placeholder="🫵 add vibe..."></Input>
							<button className="add-vibe-submit" type="button" onClick={(e) => addTag(e)}>➕</button>
							</div>
              <FormMessage className="w-full"/>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default UserInput;

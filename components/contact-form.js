import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
 // const [state, handleSubmit] = useForm("xqazkzpj");
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM);

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 min-w-80">
      
      <label htmlFor="email" className="mb-0">Name</label>
      <input id="name" type="Name" name="name" className="p-2 rounded"/>
      <ValidationError prefix="Name" field="name" errors={state.errors} />


      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" name="email" className="p-2 rounded"/>
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="message" className="mt-4">Message</label>
      <textarea id="message" name="message" rows="5" className="p-2 rounded text-gray-700"/>
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button type="submit" disabled={state.submitting} className="bg-blue-600 rounded py-4 mt-2 hover:bg-blue-500 active:scale-95 transition duration-150">Submit</button>
      <ValidationError errors={state.errors} />
    </form>

    
  );
}
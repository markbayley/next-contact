import { useForm, ValidationError } from "@formspree/react";
import {
  FaInstagram,
  FaSquareFacebook,
  FaSquareTwitter,
} from "react-icons/fa6";

export default function ContactForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM);

  if (state.succeeded) {
    return <p>Message sent!</p>;
  }

  return (
    <div className="w-full flex justify-center pt-16">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3  text-gray-500 min-w-80 lg:min-w-[40vw] px-2"
      >
        <div className="flex items-center justify-between">
          <h2 className=" text-2xl"> CONTACT US</h2>
          <div className="flex gap-2">
            <FaSquareTwitter className="h-6 w-6" />
            <FaInstagram className="h-6 w-6" />{" "}
            <FaSquareFacebook className="h-6 w-6" />{" "}
          </div>
        </div>
        <label htmlFor="email" className="mb-0">
          Name
        </label>
        <input id="name" type="Name" name="name" className="p-2 rounded" />
        <ValidationError prefix="Name" field="name" errors={state.errors} />

        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" name="email" className="p-2 rounded" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <label htmlFor="message" className="mt-4">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          className="p-2 rounded text-gray-700"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <button
          type="submit"
          disabled={state.submitting}
          className="button text-white w-full py-3"
        >
          Submit
        </button>
        <ValidationError errors={state.errors} />
      </form>
    </div>
  );
}

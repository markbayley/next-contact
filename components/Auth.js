import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useForm, ValidationError } from "@formspree/react";

export default function Auth() {
  const { data: session } = useSession();

  const [showProfile, setShowProfile] = useState(false);
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM);

  if (session) {
    return (
      <div className="flex items-center">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="rounded-full  active:scale-95 transition duration-150 font-semibold "
        >
          <div>
            <HiOutlineUserCircle className="h-7 w-7 text-gray-600" />
          </div>
        </button>

        {showProfile && (
          <div className="absolute top-14 right-1 bg-gray-200 rounded-md w-80 shadow-lg p-3 border-2 border-gray-300">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3  text-gray-500 "
            >
              <div className="flex justify-between items-center">
                {" "}
                <h2 className=" text-2xl">Profile</h2>{" "}
                <button onClick={() => signOut()} className="button text-white">
                  Sign out
                </button>
              </div>
              <p className="hidden lg:flex text-xs">{session.user.email} </p>
              <label htmlFor="email" className="mb-0">
                Name
              </label>
              <input
                id="name"
                type="Name"
                name="name"
                className="p-2 rounded"
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />

              <label htmlFor="message" className="">
                Upload Photo
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
        )}
      </div>
    );
  }
  return (
    <>
      <button onClick={() => signIn()} className="button text-white px-4 3xl:text-xl 4xl:text-2xl 4xl:py-3">
        Login
      </button>
    </>
  );
}

import { useSession, signIn, signOut } from "next-auth/react";
import { HiOutlineUserCircle, HiUserCircle } from "react-icons/hi";

export default function Auth() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex items-center">
        {/* <button
          onClick={() => signOut()}
          className="rounded-full  active:scale-95 transition duration-150 font-semibold "
        >
             <div><HiOutlineUserCircle className="h-7 w-7 text-gray-600"/></div>
        </button> */}

        {/* <p className="hidden lg:flex text-xs">{session.user.email} </p> */}
      </div>
    );
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <button onClick={() => signIn()} className="button">
        Login
      </button>
    </>
  );
}

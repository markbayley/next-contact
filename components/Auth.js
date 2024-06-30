import { useSession, signIn, signOut } from "next-auth/react";
import { HiUserCircle } from "react-icons/hi";

export default function Auth() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex items-center">
     
        <button
          onClick={() => signOut()}
          className="rounded-full  hover:bg-red-500 active:scale-95 transition duration-150 font-semibold "
        >
             <div><HiUserCircle className="h-8 w-8"/></div>
        </button>
    
       {/* <p className="hidden lg:flex text-xs">{session.user.email} </p> */}
      </div>
    );
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <button
        onClick={() => signIn()}
        className="bg-blue-600 rounded py-2 px-4 hover:bg-blue-500 active:scale-95 transition duration-150 font-semibold "
      >
        Login
      </button>
    </>
  );
}

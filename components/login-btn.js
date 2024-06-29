import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
     
        <button
          onClick={() => signOut()}
          className="bg-red-600 rounded py-0 px-4 hover:bg-red-500 active:scale-95 transition duration-150 font-semibold "
        >
          Sign out
        </button>
    
       <p className="hidden lg:flex text-xs">{session.user.email} </p>
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

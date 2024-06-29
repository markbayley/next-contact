import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
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

"use client";

import { signIn } from "next-auth/react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function LoginForm() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-300 bg-white p-10">
        <h1 className="mb-6 text-center text-3xl font-semibold text-gray-800">
          Instafy
        </h1>

        <p className="mb-4 text-center text-gray-600">
          Please log in to continue.
        </p>

        <LoginButton />

        <div className="mt-6 text-center text-sm text-gray-500">
          Not affiliated with Instagram. For demo purposes only.
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="mt-4 w-full rounded-xl bg-blue-500 text-white hover:bg-blue-600"
      variant="default"
      aria-disabled={pending}
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      Log in with Google
    </Button>
  );
}

// "use client";

// // import { calSans } from "@/app/fonts";
// import { signIn } from "next-auth/react";
// import { useFormStatus } from "react-dom";
// import { Button } from "./ui/button";
// // import { calSans } from "@/app/fonts";

// export default function LoginForm() {
//   return (
//     <div className="space-y-3">
//       <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//         <h1 className={` mb-3 text-2xl dark:text-black`}>
//           Please log in to continue.
//         </h1>

//         <LoginButton />
//       </div>
//     </div>
//   );
// }

// function LoginButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button
//       className="mt-4 w-full"
//       variant={"secondary"}
//       aria-disabled={pending}
//       onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
//     >
//       Log in with Google
//     </Button>
//   );
// }
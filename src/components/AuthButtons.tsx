import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  useAuth,
} from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";

interface AuthButtonsProps {
  clerkKey: string;
}

const AuthButtons = ({ clerkKey }: AuthButtonsProps) => {
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <InnerAuthButtons />
    </ClerkProvider>
  );
};

const InnerAuthButtons = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <ClerkLoading>
        {/* Placeholder during loading to avoid flash – adjust styles to match button sizes */}
        <div className="flex space-x-3">
          <div className="h-10 w-[234.04px] animate-pulse rounded-full bg-secondary/50"></div>{" "}
          {/* Sign In placeholder */}
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        {isSignedIn ? (
          <a
            href="/schubfach/uebungen"
            className="group relative flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-md border border-secondary px-5 py-2 font-extrabold uppercase tracking-wider text-secondary transition-all duration-200 hover:border-transparent hover:bg-secondary focus:bg-gray-300"
          >
            <p className="text-md select-none transition-all duration-200 group-hover:text-white">
              Schubfach
              <ArrowRight
                className="mb-0.5 inline group-hover:-rotate-12"
                size={20}
              />
            </p>
          </a>
        ) : (
          <>
            <a
              href="/auth/signin"
              className="group relative mr-3 flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-md px-5 py-2 font-extrabold uppercase tracking-wider text-secondary transition-all duration-200 hover:bg-secondary focus:bg-gray-300"
            >
              <p className="text-md select-none transition-all duration-200 group-hover:text-white">
                Sign In
              </p>
            </a>
            <a
              href="/auth/signup"
              className="group relative flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-md border border-secondary px-5 py-2 font-extrabold uppercase tracking-wider text-secondary transition-all duration-200 hover:border-transparent hover:bg-secondary focus:bg-gray-300"
            >
              <p className="text-md select-none transition-all duration-200 group-hover:text-white">
                Sign Up
              </p>
            </a>
          </>
        )}
      </ClerkLoaded>
    </>
  );
};

export default AuthButtons;

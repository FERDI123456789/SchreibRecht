import { ClerkLoaded, ClerkLoading, ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ArrowRight } from 'lucide-react';

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
          <div className="w-[234.04px] h-10 bg-primary/50 rounded-full animate-pulse"></div> {/* Sign In placeholder */}
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        {isSignedIn ? (
          <a
            href="/schubfach/uebungen"
            className="relative rounded-md border font-extrabold uppercase border-primary hover:border-transparent text-primary hover:bg-primary focus:bg-gray-300 group select-none flex items-center justify-center cursor-pointer px-5 py-2 tracking-wider transition-all duration-200 overflow-hidden"
          >
            <p className=" text-md select-none group-hover:text-white duration-200 transition-all">
              Schubfach
              <ArrowRight
                className="group-hover:-rotate-12 inline mb-0.5"
                size={20}
              />
            </p>
          </a>
        ) : (
          <>
            <a
              href="/auth/signin"
              className="relative rounded-md text-primary font-extrabold uppercase group select-none flex items-center hover:bg-primary focus:bg-gray-300 justify-center cursor-pointer px-5 py-2 tracking-wider transition-all duration-200 overflow-hidden mr-3"
            >
              <p className=" text-md select-none group-hover:text-white duration-200 transition-all">
                Sign In
              </p>
            </a>
            <a
              href="/auth/signup"
              className="relative rounded-md border font-extrabold uppercase border-primary hover:border-transparent text-primary hover:bg-primary focus:bg-gray-300 group select-none flex items-center justify-center cursor-pointer px-5 py-2 tracking-wider transition-all duration-200 overflow-hidden"
            >
              <p className="text-md select-none group-hover:text-white duration-200 transition-all">
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
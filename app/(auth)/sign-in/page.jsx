import React from "react"
import Header from '@/components/ui/header'

const SignInPage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign In to Mediverse</h1>
            <p className="text-muted-foreground mt-2">Enter your credentials to access your account</p>
          </div>
          {/* Sign-in form will be implemented here */}
          <div className="mt-8 text-center text-sm">
            <p>Don't have an account? <a href="/sign-up" className="text-primary hover:underline">Sign up</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInPage
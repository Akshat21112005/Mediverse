import React from "react"
import Header from '@/components/ui/header'

const SignUpPage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create a Mediverse Account</h1>
            <p className="text-muted-foreground mt-2">Join the medical universe today</p>
          </div>
          {/* Sign-up form will be implemented here */}
          <div className="mt-8 text-center text-sm">
            <p>Already have an account? <a href="/sign-in" className="text-primary hover:underline">Sign in</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
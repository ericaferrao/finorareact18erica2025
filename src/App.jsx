import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/clerk-react"

function App() {



  return (<>
    <SignedOut>
      <SignIn></SignIn>
    </SignedOut>
    <SignedIn>
      <UserButton></UserButton>
    </SignedIn>

  </>)
}

export default App

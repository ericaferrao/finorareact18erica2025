import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/clerk-react"

import { getDailyPerformance } from "./services/alphaVantageService"

function App() {

  console.log(getDailyPerformance("AAPL"))

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

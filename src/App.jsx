import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react"

import { getDailyPerformance } from "./services/alphaVantageService"
import StockListing from "./components/StockListing.jsx"

import './App.css'

function App() {

  const { user } = useUser()

  console.log("user", user)

  console.log("performance", getDailyPerformance("AAPL"))

  return (<>
    <div className="app-container">
      <header>
        <h1>Finora.io</h1>
        <h3>Track your favorite stocks</h3>
      </header>

      <SignedOut>
        <div>
          <p>Login to Manage Stocks</p>
          <SignIn></SignIn>
        </div>
      </SignedOut>
      <SignedIn>
        {user ? (<>
          <div className="user-header">
            <UserButton></UserButton>
            <p>Hello, {user.firstName || user.username || "User"} 👋</p>

          </div>
          <StockListing userId={user.id}></StockListing>
        </>) : (<p>Loading User ...</p>)}

      </SignedIn>

    </div>

  </>)
}

export default App

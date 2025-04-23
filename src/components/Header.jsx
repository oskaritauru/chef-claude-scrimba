import chefClaudeLogo from "../images/icons8-chef.png"; // Importing the chef logo image from the specified path

// Defining a functional component named Header
export default function Header() {
  return (
    <header>
      <img src={chefClaudeLogo} alt="Chef Claude Logo" /> <h1>Chef Claude</h1>
    </header>
  );
}

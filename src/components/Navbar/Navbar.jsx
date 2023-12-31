import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='h-10 shadow-sm'>
      <nav className='flex items-center justify-around '>
        <Link to='/' className='font-krona md:text-2xl text-customGreen'>
          Quiz Man
        </Link>
        <div className='md:flex items-center justify-center space-x-5 hidden '>
          <ul className='flex items-center space-x-5'>
            <li>
              <Link to='/' className='font-base'>
                How it works
              </Link>
            </li>
            <li>
              <Link to='/' className='font-base'>
                Features
              </Link>
            </li>
            <li>
              <Link to='/' className='font-base'>
                About Us
              </Link>
            </li>
          </ul>
          <button className='font-medium border border-customGreen font-base py-1 px-3 rounded'>
            Login
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;

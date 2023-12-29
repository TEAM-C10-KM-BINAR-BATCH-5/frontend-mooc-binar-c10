import { ProfileMenu } from "../ProfileMenu";

const Navbar = () => {
  return (
    <nav className="bg-lightBlue shadow">
      <div className="flex md:flex-row flex-col justify-between md:items-center p-2 px-5 gap-2">
        <div className="font-bold text-sm sm:text-xl">Hi, Admin</div>
        <ProfileMenu />
      </div>
    </nav>
  );
};

export default Navbar;

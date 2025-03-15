import ChangeThemeButton from "../change-theme-button";
import SearchInput from "../inputs/SearchInput";
import Logo from "../Logo";
import UserInfo from "../profile/UserInfo";

export default function DashboardNavbar() {
  return (
    <div className="h-20 bg-background/30  w-full py-3 flex items-center px-2 justify-between">
      {/* the logo image and title */}
      <div className="flex items-center gap-2 flex-row-reverse">
        <span className="font-bold text-xl text-white">البتاني</span>
        <Logo type="dash" />
      </div>

      {/* the search box */}
      <SearchInput />

      {/* toggle theme */}
      <ChangeThemeButton />


      {/* the profile trigger */}
      <UserInfo />
    </div>
  );
}

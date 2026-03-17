import UserData from "../garbadge/userData"
import HeaderDropDown from "./headerDropDown"

export function SiteHeader() {
  return (
    <header className="flex 2xl:py-3 py-1.5   shrink-0 items-center gap-2 bg-white border-b  bg-foreground rounded-tl-lg rounded-tr-lg transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">


        <h1 className="text-base text-black font-semibold xl:text-[26px] text-[20px]">AI Chatbot</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-[#0000000D] 2xl:w-9 w-7 2xl:h-9 h-7 flex items-center justify-center rounded-full">
              <img src="/notification.svg" alt=""  />
            </div>
            <div>
              <HeaderDropDown/>
            </div>
            {
              UserData.map((user, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img src={user.image} alt=""  className="2xl:w-9 w-7"/>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[black] font-semibold 2xl:text-[14px] text-[12px]">{user.user}</p>
                      <img src="/Profile-Dropdown.svg" alt="" />
                    </div>
                    <p className="text-[black] xl:text-[12px] text-[10px] opacity-50">{user.email}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </header>
  )
}

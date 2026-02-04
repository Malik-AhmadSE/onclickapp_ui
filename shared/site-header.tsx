import UserData from "../data/userData"

export function SiteHeader() {
  return (
    <header className="flex h-[64px] shrink-0 items-center gap-2 bg-white border-b border-[#E2E8F0] bg-foreground rounded-tl-lg rounded-tr-lg transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">


        <h1 className="text-base text-black font-semibold text-[26px]">AI Chatbot</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-[#0000000D] w-[36px] h-[36px] flex items-center justify-center rounded-full">
              <img src="/notification.svg" alt="" />
            </div>
            {
              UserData.map((user, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img src={user.image} alt="" />
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[black] text-[14px]">{user.user}</p>
                      <img src="/Profile-Dropdown.svg" alt="" />
                    </div>
                    <p className="text-[black] text-[12px] opacity-50">{user.email}</p>
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



export default function ImportHeader (){
    return(
       
  <div className="flex md:flex-row flex-col gap-8 mx-auto w-full">
    
   
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 h-auto w-[70%]">
      
      <h2 className="2xl:text-2xl text-xl font-semibold text-gray-800 mb-4">
        Upload Files
      </h2>

      <div className="border-2 border-dashed border-[#AEE485] bg-[#AEE48529] rounded-xl p-5 flex flex-col items-center justify-center text-center">
        
       
        <div className="w-14 h-14 bg-[#AEE485] rounded-full flex items-center justify-center ">
         <img src="document-upload.svg" alt="" />
        </div>

        <p className="text-lg font-medium text-gray-800">
          Drag and drop files
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Supported Formats: pdf, csv, xlsx, jpeg, png
        </p>
      </div>
    </div>

  
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 w-[100%]">
      
     
      <div className="flex items-center justify-between mb-4">
        <h2 className="2xl:text-2xl text-xl font-semibold text-gray-800">
          Accounting Software Integrations
        </h2>

        <button className="px-4 py-2 xl:text-sm text-[12px] border  border-gray-300 rounded-lg hover:bg-gray-100 transition">
          See All Integration
        </button>
      </div>

    
      <div className="space-y-4">
        
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12  rounded-full flex items-center justify-center">
             <img src="quickbook.svg" alt="A" />
            </div>

            <div>
              <p className="font-semibold text-gray-800">QuickBooks</p>
              <p className="text-sm text-gray-500">
                Get Drafts from Quickbooks
              </p>
            </div>
          </div>

          <button className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition">
            Connected →
          </button>
        </div>

        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <img src="xero.svg" alt="" />
            </div>

            <div>
              <p className="font-semibold text-gray-800">Xero</p>
              <p className="text-sm text-gray-500">
                Get Drafts from Xero
              </p>
            </div>
          </div>

          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition flex items-center gap-1">
            Connect →
          </button>
        </div>

      </div>
    </div>

  </div>


    )
}
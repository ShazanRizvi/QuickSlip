import React,{useState} from 'react'
import InvoiceEditor from './InvoiceEditor'
import InvoicePreview from './InvoicePreview'

const ProtectedInvoiceEditor = () => {
     const [previewData, setPreviewData] = useState(null);
     const handleUpdate = (data,errors) => {
       console.log("errrors",errors)
   
       setPreviewData(data);
       console.log("preview data", data);
     };
     return (
       <div className="flex gap-4 justify-center mx-6">
       <div className="w-1/2 overflow-y-auto h-screen">
           <InvoiceEditor onUpdate={handleUpdate} />
         </div>
         <div className="w-1/2 overflow-y-auto h-screen">
           {!previewData ? (
             <div className="flex h-screen items-center justify-center">
               <h1 className="text-md font-semibold text-slate-500">
                 Fill in details to live preview your invoice here!
               </h1>
             </div>
           ) : (
             <InvoicePreview previewData = {previewData}/>
           )}
         </div>
         
       </div>
     );
}

export default ProtectedInvoiceEditor

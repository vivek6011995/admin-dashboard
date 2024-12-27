import React from "react";

interface Step3Props {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileError: string;
  formData: { singleFile: File | null };
}

const Step3: React.FC<Step3Props> = ({ handleFileUpload, fileError, formData }) => (
  <div>
     <h3 className="text-xl md:text-2xl text-[#175ee3] font-bold mb-4">File Upload</h3>
      
    <input
      type="file"
      onChange={handleFileUpload}
      accept=".png,.pdf"
      className="block w-full p-2 border rounded mb-4"
    />
    {formData.singleFile && <p className="text-green-500">File selected: {formData.singleFile.name}</p>}
    {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
  </div>
);

export default Step3;

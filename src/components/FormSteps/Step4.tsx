import React from "react";

interface Step4Props {
  handleMultiFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  geolocation: string | null;
  fetchGeolocation: () => void;
  errors: { [key: string]: string };
}

const Step4: React.FC<Step4Props> = ({
  handleMultiFileUpload,
  geolocation,
  fetchGeolocation,
  errors,
}) => (
  <div>
     <h3 className="text-xl md:text-2xl text-[#175ee3] font-bold mb-4">Multi File Upload</h3>
      
    <input
      type="file"
      onChange={handleMultiFileUpload}
      accept=".png,.pdf"
      multiple
      className="block w-full p-2 border rounded mb-4"
    />
    {errors.multiFiles && <p className="text-red-500">{errors.multiFiles}</p>}
    
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded"
      onClick={fetchGeolocation}
    >
      Get Geolocation
    </button>
    {geolocation && <p className="mt-4">Location: {geolocation}</p>}
    {errors.geolocation && <p className="text-red-500">{errors.geolocation}</p>}
  </div>
);

export default Step4;
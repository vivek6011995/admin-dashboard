import React from "react";

interface Step2Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange, errors }) => {
  return (
    <div>
      <h3 className="text-xl md:text-2xl text-[#175ee3] font-bold mb-4">Address</h3>
      <div className="mt-5">
       
      <input
        type="text"
        name="addressLine1"
        placeholder="Address Line 1"
        value={formData.addressLine1}
        onChange={handleChange}
       className="text-base h-[40px] border-[#D9D9D9] rounded-md border  px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
</div>
<div className="mt-5">
        
      <input
        type="text"
        name="addressLine2"
        placeholder="Address Line 2"
        value={formData.addressLine2}
        onChange={handleChange}
       className="text-base h-[40px] border-[#D9D9D9] rounded-md border  px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
 {errors.addressLine2 && <p className="text-red-500 text-sm">{errors.addressLine2}</p>}
 </div>
 <div className="mt-5">
      
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
       className="text-base h-[40px] border-[#D9D9D9] rounded-md border  px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
</div>
<div className="mt-5">
       
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
       className="text-base h-[40px] border-[#D9D9D9] rounded-md border  px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
</div>
<div className="mt-5">
   
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
       className="text-base h-[40px] border-[#D9D9D9] rounded-md border  px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
</div>
<div className="mt-5">
       
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
       className="text-base h-[40px] border-[#D9D9D9] rounded-md border  px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
    </div>
    </div>
  );
};

export default Step2;

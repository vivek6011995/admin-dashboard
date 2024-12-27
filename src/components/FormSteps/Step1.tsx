import React from "react";
interface Step1Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
}

const Step1: React.FC<Step1Props> = ({ formData,handleChange,errors }) => {
  return (
    <div>
      <h3 className="text-xl md:text-2xl text-[#175ee3] font-bold mb-4">Basic Details</h3>
      <div className="mt-5">
      
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="text-base h-[40px] border-[#D9D9D9] rounded-md border  px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mt-5">
       
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="text-base h-[40px] border-[#D9D9D9] rounded-md border  px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mt-5">
       
        <input
      type="tel"
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={handleChange}
     className="text-base h-[40px] border-[#D9D9D9] rounded-md border  px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
       {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
    </div>
  );
};

export default Step1;

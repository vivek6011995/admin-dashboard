import React from "react";

interface Step5Props {
  success: boolean;
  errors: { [key: string]: string };
}

const Step5: React.FC<Step5Props> = ({ success, errors }) => (
  <div>
  <h3 className="text-xl md:text-2xl text-[#175ee3] font-bold mb-4">Status</h3>
  <div className="text-center space-y-4">
     
  <div className="mt-4">
  {errors.submit && <p className="text-green-600 text-center">{errors.submit}</p>}
  {success && <p className="text-green-600 text-center">Form submitted successfully! Thank you.</p>}
</div> 
 
  </div>
  </div>
);

export default Step5;

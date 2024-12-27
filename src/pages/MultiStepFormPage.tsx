import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ProgressBar from "../components/FormSteps/ProgressBar";
import Step1 from "../components/FormSteps/Step1";
import Step2 from "../components/FormSteps/Step2";
import Step3 from "../components/FormSteps/Step3";
import Step4 from "../components/FormSteps/Step4";
import Step5 from "../components/FormSteps/Step5";
import cover from "../assets/images/form.jpg";

const MultiStepFormPage: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    singleFile: File | null;
    multiFiles: File[];
    geolocation: string | null;
  }>({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    singleFile: null,
    multiFiles: [],
    geolocation: null,
  });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fileError, setFileError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileError(""); // Reset file error

    if (file) {
      // Validate file type
      const validTypes = [".png", ".pdf"];
      const fileType = file.name.split(".").pop()?.toLowerCase();
      if (validTypes.includes(`.${fileType}`)) {
        setFormData({ ...formData, singleFile: file });
      } else {
        setFileError("Invalid file type. Please upload a .png or .pdf file.");
      }
    }
  };

  const validateStep = () => {
    const currentStepErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.name) currentStepErrors.name = "Name is required.";
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) currentStepErrors.email = "Enter a valid email address.";
      if (!formData.phone) currentStepErrors.phone = "Phone number is required.";
    }

    if (step === 2) {
      if (!formData.addressLine1) currentStepErrors.addressLine1 = "Address Line 1 is required.";
      if (!formData.addressLine2) currentStepErrors.addressLine2 = "Address Line 2 is required.";
      if (!formData.city) currentStepErrors.city = "City is required.";
      if (!formData.state) currentStepErrors.state = "State is required.";
      if (!formData.pincode) currentStepErrors.pincode = "Pincode is required.";
      if (!formData.country) currentStepErrors.country = "Country is required.";
    }

    if (step === 3) {
      if (!formData.singleFile) currentStepErrors.singleFile = "Please upload a file.";
      if (fileError) currentStepErrors.singleFile = fileError; // Add file error if any
    }
    if (step === 4) {
      if (formData.multiFiles.length === 0) currentStepErrors.multiFiles = "Please upload at least one file.";
      if (!formData.geolocation) currentStepErrors.geolocation = "Geolocation is required. Click the button to fetch.";
    }
    if (step === 5) {
      // Perform any final validation for submission if required
      if (!success) {
        currentStepErrors.submit = "An issue occurred while submitting the form. Please try again.";
      }
    }
    setErrors(currentStepErrors);

    // Return whether there are errors for the current step
    return Object.keys(currentStepErrors).length === 0;
  };
  const handleMultiFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData({ ...formData, multiFiles: files });
  };

  const fetchGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData({ ...formData, geolocation: `${latitude}, ${longitude}` });
      },
      () => {
        setErrors({ ...errors, geolocation: "Failed to fetch geolocation." });
      }
    );
  };
  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("addressLine1", formData.addressLine1);
      form.append("addressLine2", formData.addressLine2);
      form.append("city", formData.city);
      form.append("state", formData.state);
      form.append("pincode", formData.pincode);
      form.append("country", formData.country);
      if (formData.singleFile) {
        form.append("singleFile", formData.singleFile);
      }
      formData.multiFiles.forEach((file, index) => {
        form.append(`multiFiles[${index}]`, file);
      });
      form.append("geolocation", formData.geolocation || "");
  
      const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:HdrEIUdm/auth/form", {
        method: "POST",
        body: form,
      });
  
      const data = await response.json();
      setSuccess(response.ok);
  
      if (!response.ok) {
        setErrors({ submit: data.message || "Failed to submit the form. Please try again." });
      } else {
        // Optionally reset form data after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          singleFile: null,
          multiFiles: [],
          geolocation: null,
        });
      }
    } catch (error) {
      setSuccess(false);
      setErrors({ submit: "An unexpected error occurred. Please try again later." });
    }
  };
  if (!isAuthenticated) {
    return <p>Please log in to access this form.</p>;
  }

  return (
    <section className="bg-[#f2f5f7]">
      <div className="flex flex-col lg:flex-row h-full justify-between">
        <div className="w-full relative md:w-1/2 h-dvh hidden md:block">
          <img src={cover} alt="" className="w-full absolute top-0 left-0 w-full h-full object-cover" />
        </div>
        <div className="w-full h-dvh  md:w-2/4 flex flex-col justify-center items-center p-[15px] sm:p-0">
          <div className="w-full p-8 md:w-3/5 bg-white rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.2)] ">
          <form onSubmit={handleSubmit}>
            <ProgressBar currentStep={step} totalSteps={5} />
            {step === 1 && <Step1 formData={formData} handleChange={handleChange} errors={errors} />}
            {step === 2 && <Step2 formData={formData} handleChange={handleChange} errors={errors} />}
            {step === 3 && <Step3 handleFileUpload={handleFileUpload} fileError={errors.singleFile} formData={formData} />}
            {step === 4 && (<Step4 handleMultiFileUpload={handleMultiFileUpload} geolocation={formData.geolocation} fetchGeolocation={fetchGeolocation} errors={errors} />)}
            {step === 5 && <Step5 success={success} errors={errors} />}
            <div className="flex justify-between mt-7">
    {step > 1 && (
      <button
        type="button"
        className="bg-gray-500 group inline-flex items-center text-base md:text-lg px-6 py-2 text-white font-semibold rounded shadow-lg"
        onClick={() => setStep(step - 1)}
      >
        Previous
      </button>
    )}
    {step < 5 ? (
      <button
        type="button"
        className="bg-[#175ee3] group inline-flex items-center text-base md:text-lg px-6 py-2 text-white font-semibold rounded shadow-lg"
        onClick={handleNext}
      >
        Next
      </button>
    ) : (
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    )}
  </div>
</form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiStepFormPage;

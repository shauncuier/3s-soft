import PageTitle from "../../Components/PageTitle";

const PrivacyPolicy = () => {
  return (
    <div className='max-w-370 min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 xl:pt-44 px-4'>
      <PageTitle
        title="Privacy Policy | 3s-Soft Data Protection"
        content="Read the 3s-Soft privacy policy to understand how we collect, use, and protect your personal data and digital privacy."
      />
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <div className="text-gray-300">
        <p>Your privacy is important to us. This policy outlines our commitment to protecting your personal information.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
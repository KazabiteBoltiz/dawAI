import Image from "next/image";

const logo = () => {
  return (
    <div className = 'mb-2'>
      <Image
        src="/logo.png" // Path relative to the public folder
        alt="Description of image"
        width={60}        // Set width
        height={30}       // Set height
      />
    </div>
  );
};

export default logo;